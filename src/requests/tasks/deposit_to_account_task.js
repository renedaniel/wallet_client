import SecureRequestTask from "./secure_request_task";

class DepositToAccount extends SecureRequestTask {

    constructor(params) {
        super(params);
        this.custom_params = params;
    }

    getUrl() {
        return `${this.end_point}/${this.api_version}/deposit_to_account`;
    }

    getParams() {
        const params = super.getParams();
        return Object.assign({}, params, this.custom_params);
    }

}

export default DepositToAccount;
