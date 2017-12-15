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
            if (request.isValid(response)) {
                return new Promise((resolve, reject) => {
                    resolve(request.getResponse(response));
                });
            }
            throw response;
        }
        catch (e) {
            console.error('[XHR ERROR]', e, request.parseErrors(e));
            return new Promise((resolve, reject) => {
                reject(request.parseErrors(e))
            })
        }
    }
}

export default RequestManager;
