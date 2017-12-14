import Request from './../requests/request_manager';

class Util {
    static async performSimpleRequest(Task, params = {}) {
        try {
            const task = new Task(params);
            const response = await Request.addRequest(task);
            return new Promise((resolve, reject) => {
                resolve(response);
            });
        } catch (error) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }
}

export default Util;