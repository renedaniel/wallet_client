import AbstractRequestTask from "./abstract_request_task";

class AddCardTask extends AbstractRequestTask {

    constructor(params) {
        super(params);
        this.jwt = localStorage.getItem('jwt');
        this.custom_params = { jwt: this.jwt, ...params };
    }

    getUrl() {
        return `${this.end_point}/${this.api_version}/cards`;
    }

    getMethod() {
        return 'POST';
    }

    getParams() {
        const params = super.getParams();
        return Object.assign({}, params, this.custom_params);
    }

    getHeaders() {
        return {
            Authorization: `Bearer ${this.jwt}`
        }
    }

}

export default AddCardTask;
