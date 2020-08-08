import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const qs = require('qs');
const _ = require('lodash');

axios.interceptors.request.use((request) => {
    if(request.method === "put" || request.method === "get" || request.method === "post" || request.method === "delete") {
        request.data = qs.stringify(request.data);
    }
    return request;
});


toast.configure();


const ErrorHandler = (error) => {
    let message = 'Invalid action !';

    if(error.response) {
        message = _.get(error,'response.data.message') || 'Invalid action !';
    }
    console.log('error',error.response,'message:',message);
    toast.success(message,{
        position:toast.POSITION.TOP_CENTER,
        closeOnClick:true,
        closeButton: true,
    });
    return Promise.reject({...error});
  }
  const responseHandler = (response) => {
    return response;
  }

  axios.interceptors.response.use(responseHandler,ErrorHandler);



