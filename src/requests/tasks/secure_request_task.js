import AbstractRequestTask from "./abstract_request_task";

class SecureRequestTask extends AbstractRequestTask {

    constructor(params) {
        super(params);
        this.jwt = localStorage.getItem('jwt');
    }

    getMethod() {
        return 'POST';
    }

    getParams() {
        const params = super.getParams();
        return Object.assign({ jwt: this.jwt }, params);
    }

    getHeaders() {
        return {
            Authorization: `Bearer ${this.jwt}`
        }
    }

}

export default SecureRequestTask;
