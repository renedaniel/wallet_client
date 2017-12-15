import AbstractRequestTask from "./abstract_request_task";

class MetadataTask extends AbstractRequestTask {
    getUrl() {
        return `${this.end_point}/${this.api_version}/metadata`;
    }
}

export default MetadataTask;
