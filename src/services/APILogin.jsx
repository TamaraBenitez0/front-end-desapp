import {httpClient} from './httpClient';

class APILogin {

    httpClient;
    

    constructor(){ 
        this.httpClient = httpClient 
       
    }

    postLogin(data) {

        const ret = this.httpClient.post('/api/auth/login', data)
        return ret;
    }


}

const API_Login = new APILogin();

export {API_Login}

