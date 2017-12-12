import AbstractRequestTask from "./abstract_request_task";

class CustomerTask extends AbstractRequestTask {

    constructor(parameters) {
        super(parameters);
        this.customParameters = parameters;
    }

    getParams() {
        const params = super.getParams();
        return Object.assign({}, params, this.customParameters);
    }

    getUrl() {
        return `https://young-cliffs-38701.herokuapp.com/api/v1/customers`;
    }

}

export default CustomerTask;
