import SecureRequestTask from "./secure_request_task";

class TransactionHistoryTask extends SecureRequestTask {

    getUrl() {
        return `${this.end_point}/${this.api_version}/get_transactions`;
    }
    
}

export default TransactionHistoryTask;
