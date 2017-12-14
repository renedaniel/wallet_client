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
            const response = await promise;
            console.log('[RESPONSE]', response);
            const data = response.data;
            if (request.isValid(data)) {
                return new Promise((resolve, reject) => {
                    resolve(data.response);
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
