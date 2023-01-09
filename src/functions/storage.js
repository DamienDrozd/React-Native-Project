import AsyncStorage from '@react-native-async-storage/async-storage';



export async function Logout() {
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

export async function getStorage(value){
    return AsyncStorage.getItem(value).then((getItem) => {
        return getItem
    }).catch(error => {
        console.log("storage error : ", error);
    })
}

export async function addStorage(name, value){
    console.log("add to storage : ", name, value)
    return AsyncStorage.setItem(name, JSON.stringify(value)).then(() => {
        console.log(name, "added to storage");
        return (true);
    }).catch((error) => {
        console.log("storage error : ", error);
        return (false);
    });
}