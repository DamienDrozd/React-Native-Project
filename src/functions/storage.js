import AsyncStorage from '@react-native-async-storage/async-storage';



export const  Logout = async ()  =>{
  AsyncStorage.getAllKeys().then((keys) => {
      AsyncStorage.multiRemove(keys).then(() => {
          console.log("Logout success");
      }).catch((error) => {
          showMessage({
            message: "storage error : ", error,
            type: "info",
          });
          console.log("storage error : ", error);
      });
  }).catch((error) => {
    showMessage({
      message: "storage error : ", error,
      type: "info",
    });
    console.log("storage error : ", error);
  });
}

export const  getStorage = async (value) =>{
    return AsyncStorage.getItem(value).then((getItem) => {
        console.log("get from storage : ", value, getItem);
        return JSON.parse(getItem)
    }).catch(error => {
        console.log("storage error : ", error);
    })
}

export const  addStorage = async (name, value) =>{
    console.log("add to storage : ", name, value)
    return AsyncStorage.setItem(name, JSON.stringify(value)).then(() => {
        console.log(name, "added to storage");
        return (true);
    }).catch((error) => {
        console.log("storage error : ", error);
        return (false);
    });
}