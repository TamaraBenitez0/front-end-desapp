import {httpClient} from './httpClient';

class APITransaction {


    httpClient;
    

    constructor(){ 
        this.httpClient = httpClient 
       
    }

    startTransaction(actId,idToNegociate) {

        const ret = this.httpClient.post(`/api/transaction/start/${idToNegociate}/activity/${actId}`);

        return ret;
    }


    checkInitTransaction() {

        const ret = this.httpClient.get(`/api/transaction/confirm/start`);

        return ret;
    }

    checkTransactionInProgress(idUser) {
        return this.httpClient.get(`/api/transaction/progress/${idUser}`)
    }

    cancelTransaction() {

        const ret = this.httpClient.put(`/api/transaction/cancel`);

        return ret;
    }

    sendAmount() {

        const ret = this.httpClient.put(`/api/transaction/confirm`);

        return ret;
    }

    finishTransaction(actId,idToNegociate) {
        return this.httpClient.post(`/api/transaction/confirm/activity/${actId}/finish/${idToNegociate}`)
    }

    checkCompleteSend(idToNegociate){
        return this.httpClient.get(`/api/transaction/send/${idToNegociate}`)
    }
}

const API_Transaction = new APITransaction();

export {API_Transaction}