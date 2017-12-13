import AbstractRequestTask from "./abstract_request_task";
import config from "./../../config/app_config";

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
        return `${config.end_point}/${config.api_version}/users`;
    }

    getMethod(){
        return 'POST';
    }

}

export default RegisterTask;
