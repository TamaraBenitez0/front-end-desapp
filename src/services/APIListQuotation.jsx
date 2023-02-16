import {httpClient} from './httpClient';

class APIListQuotation {


    httpClient;
    

    constructor(){ 
        this.httpClient = httpClient 
       
    }

    getQuotations() {

        const ret = this.httpClient.get('/api/cotization')

        return ret;
    }

    getQuotationBySymbol(symbol){
        return this.httpClient.get(`/api/cotization/${symbol+"USDT"}`)
    }
}

const API_Quotations = new APIListQuotation();

export {API_Quotations}