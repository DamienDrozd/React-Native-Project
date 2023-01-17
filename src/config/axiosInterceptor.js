import axios from 'axios';
import { showMessage } from "react-native-flash-message";

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // ajouter le token dans le header
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.status === 200) {
      showMessage({
            message: "api call successful",
            type: "info",
        });
    }

    return response;
  },
  async function (error) {
    showMessage({
        message: "error : " + error,
        type: "info",
    });
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("error with status code :");
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        showMessage({
            message: "error with status code : " + error.response,
            type: "info",
        });
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log("no response received :");
        console.log(error.request);
        showMessage({
            message: "no response received : " + error.request,
            type: "info",
        });
    } else {
    // Something happened in setting up the request that triggered an Error
        console.log('Error in setting up the request : ');
        console.log( error.message);
        showMessage({
            message: "Error in setting up the request : " + error.message,
            type: "info",
        });
    }
    console.log(error.config);
});