import {httpClient} from './httpClient';


class APIRegister {

    httpClient;
    

    constructor(){ 
        this.httpClient = httpClient 
       
    }


    postRegister(data) {

        const ret = this.httpClient.post('/api/auth/register',data)

        return ret;
    }
}

const API_Register = new APIRegister();

export {API_Register}