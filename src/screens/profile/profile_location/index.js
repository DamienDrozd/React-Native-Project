

import React, {  useEffect, useState  } from "react";
import { View, Dimensions,  Platform, PermissionsAndroid  } from "react-native";

// import google from "google-maps"
import Geolocation from 'react-native-geolocation-service';
import  MapView, {Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import Update_Button from "../../../components/Update_User"; 
import { useTranslation } from "react-i18next";
import {Slider} from '@miblanchard/react-native-slider';
// import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';



import { getStorage } from "../../../functions/storage"; 

import { ViewCustom, Title, MainText, SliderCustom, InputView, ConditionText } from "../styles";



const Location = ({ route, navigation }) => {
  const { t } = useTranslation();
  const [user, setUser] = useState({ position : {longitude: 0,latitude: 0}, preferences: {searchRange: 100}});
  const [navButton, setNavButton] = useState(null);   

 
  useEffect(() => {
    getStorage('user').then(fetchedUser => {
      if ( fetchedUser.position?.longitude == undefined || fetchedUser.position?.longitude == "" || fetchedUser.position?.longitude == null){
        fetchedUser.position.longitude = 0;
      }
      if ( fetchedUser.position?.latitude == undefined || fetchedUser.position?.latitude == "" || fetchedUser.position?.latitude == null){
        fetchedUser.position.latitude = 0;
      }
      if ( fetchedUser.preferences?.searchRange == undefined || fetchedUser.preferences?.searchRange == "" || fetchedUser.preferences?.searchRange == null){
        fetchedUser.preferences.searchRange = 100;
      }
      setUser(fetchedUser);
    });
    getOneTimeLocation();
  }, []); 


  useEffect(() => {
    if (user.position?.longitude != undefined && user.position?.longitude != 0 && user.position?.latitude != undefined && user.position?.latitude != 0 && user.preferences?.searchRange != undefined && user.preferences?.searchRange != 0 ){ 
        setNavButton(
            <>
                <Update_Button user={user} prevPage="Profile5" nextPage="Profile7"  navigation={navigation} />
            </>
        ) 
    } else {
        setNavButton(
            <> 
                <ConditionText>{t("profile.fill")}</ConditionText>
                <Update_Button user={user} prevPage="Profile5" nextPage=""  navigation={navigation} />
            </>
        )
    }
  }, [user]);

  const getOneTimeLocation = async () => {
    console.log("getOneTimeLocation", Platform.OS);
    if(Platform.OS === 'ios'){
      check(PERMISSIONS.IOS.LocationWhenInUse)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available (on this device / in this context)');
            break;
          case RESULTS.DENIED:
            console.log('The permission has not been requested / is denied but requestable');
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
    } else if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
    Geolocation.getCurrentPosition(
        (position) => {
          console.log("position : ", position);
          let newUser = user;
          newUser.position.longitude = position.coords.longitude;
          newUser.position.latitude = position.coords.latitude; 
          setUser(newUser);
        },
        (error) => {
          // See error code charts below.
          console.log("error : ", error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

    
return (
  <ViewCustom>
    <Title>{t("profile.search_zone")}</Title>
      <InputView>
        <MainText> {user.preferences?.searchRange} km</MainText>
        <SliderCustom>
          <Slider
            value={user.preferences?.searchRange}
            minimumValue={5}
            maximumValue={1000}
            step={5}
            onValueChange={value => {
                let newUser = {...user};
                newUser.preferences.searchRange = value;
                setUser(newUser)
            }}
          />
        </SliderCustom>
        </InputView>
    <MapView
      provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : MapView.PROVIDER_GOOGLE}
      style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height-300}}
      region={{
        latitude: user.position?.latitude,
        longitude: user.position?.longitude,
        latitudeDelta: user.preferences?.searchRange / 30,
        longitudeDelta: user.preferences?.searchRange / 30,
      }}
      pitchEnabled={false}
      rotateEnabled={false}
      scrollEnabled={false}
      zoomEnabled={false}
    >
      <Circle
        key = { (user.position?.longitude + user.position?.latitude).toString() }
        center = {{
            latitude: user.position?.latitude,
            longitude: user.position?.longitude
          }}
        radius = { user.preferences?.searchRange * 1000 }
        strokeWidth = { 1 }
        strokeColor = { '#1a66ff' }
        fillColor = { 'rgba(230,238,255,0.5)' }
      />
    </MapView>

    {navButton}
  </ViewCustom>
  );
} 



export default Location;