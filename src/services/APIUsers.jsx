import {httpClient} from './httpClient';

class APIUsers {


    httpClient;
    

    constructor(){ 
        this.httpClient = httpClient 
       
    }

    getUsers() {

        const ret = this.httpClient.get('/api/users')
        return ret;
    }
}

const API_Users = new APIUsers();

export {API_Users}