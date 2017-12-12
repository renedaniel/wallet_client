
class AbstractRequestTask {

    isValid(response) {
        return true;
    }

    parseErrors(data) {
        return data;
    }

    getParams() {
        return {

        };
    }

    getMethod() {
        return 'GET';
    }

    getUrl() {
        return this.url;
    }

    getHeaders() {
        return {
            'Access-Control-Allow-Origin': '*'
        };
    }
}

export default AbstractRequestTask;
