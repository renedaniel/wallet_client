import SecureRequestTask from "./secure_request_task";

class DeleteCardTask extends SecureRequestTask {

    constructor(params) {
        super(params);
        this.custom_params = params;
    }

    getUrl() {
        return `${this.end_point}/${this.api_version}/cards/${this.custom_params.card_id}`;
    }

    getParams() {
        const params = super.getParams();
        return Object.assign({}, params, this.custom_params);
    }

    getMethod() {
        return 'DELETE';
    }

}

export default DeleteCardTask;
