import axios from 'axios';
import https from 'https';


const httpClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL ,
    httpsAgent: new https.Agent({keepAlive:true})
  });

    

    httpClient.interceptors.request.use((config)=> {
        const token = localStorage.getItem('token');
        config.headers.Authorization =  token ? `${token}` : '';
        return config;
      });

      httpClient.interceptors.response.use(
        (response) => {
          return response;
        },
        async(error) =>{
          const originalRequest = error.config;
              
          if (error.response !==undefined && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            localStorage.removeItem("token") 
            window.location.reload();    
           return httpClient(originalRequest);
          }
      
          return Promise.reject(error);
        }
      );
      
      
export {httpClient};