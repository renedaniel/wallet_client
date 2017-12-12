import axios from 'axios';

class RequestManager {

    static async addRequest(request) {

        const promise = axios({
            method: request.getMethod(),
            url: request.getUrl(),
            data: request.getParams()
        });

        console.log('[REQUEST]', request, promise);

        try {
            let response = await promise;
            console.log('[RESPONSE]', response);
            if (request.isValid(response.data)) {
                return new Promise((resolve, reject) => {
                    resolve(response.data);
                });
            }
            throw response;
        }
        catch (e) {
            console.log('[XHR ERROR]', e);
            return new Promise((resolve, reject) => {
                reject(request.parseErrors(e))
            })
        }
    }
}

export default RequestManager;
