import AbstractRequestTask from "./abstract_request_task";

class LoginTask extends AbstractRequestTask {

    constructor(params) {
        super(params);
        this.custom_params = params;
    }

    getParams() {
        const params = super.getParams();
        return Object.assign({}, params, this.custom_params);
    }

    getUrl() {
        return `${this.end_point}/${this.api_version}/user_token`;
    }

    getMethod(){
        return 'POST';
    }

    isValid(response) {
        return response.status === 201
    }

    getResponse(response) {
        return response.data
    }

    parseErrors(response) {
        return {
            error: 'invalid_user_data'
        }
    }

}

export default LoginTask;
