import {httpClient} from './httpClient';

class APIActivities {


    httpClient;

    constructor(){ 
        this.httpClient = httpClient 
       
    }

    createActivity(responseBody){
        return this.httpClient.post('/api/activity/create',responseBody)
    }

    getActivitiesByCriptoandType(type,cripto){

        const ret = this.httpClient.get(`/api/activity/${type}/cripto/${cripto}`)
        return ret;

    }
}

const API_Activities= new APIActivities();

export {API_Activities}