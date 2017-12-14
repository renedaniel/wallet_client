import AbstractRequestTask from "./abstract_request_task";

class RegisterTask extends AbstractRequestTask {

    constructor(params) {
        super(params);
        this.custom_params = params;
    }

    getParams() {
        const params = super.getParams();
        return Object.assign({}, params, this.custom_params);
    }

    getUrl() {
        return `${this.end_point}/${this.api_version}/users`;
    }

    getMethod(){
        return 'POST';
    }

}

export default RegisterTask;
