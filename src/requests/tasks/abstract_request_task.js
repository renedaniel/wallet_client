import config from "./../../config/app_config";

class AbstractRequestTask {

    constructor(params) {
        this.end_point = config.end_point;
        this.api_version = config.api_version;
    }

    isValid(response) {
        return response.status === 200
    }

    parseErrors(response) {
        return response && response.data && response.data.errors || {}
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
