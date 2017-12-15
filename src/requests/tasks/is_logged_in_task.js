import AbstractRequestTask from "./abstract_request_task";

class IsLoggedInTask extends AbstractRequestTask {

    constructor(params) {
        super(params);
        this.custom_params = params;
    }

    getUrl() {
        return `${this.end_point}/${this.api_version}/is_logged_in`;
    }

    getMethod() {
        return 'POST';
    }

    getParams() {
        const params = super.getParams();
        return Object.assign({}, params, this.custom_params);
    }

}

export default IsLoggedInTask;
