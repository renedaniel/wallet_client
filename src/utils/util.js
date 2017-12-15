import Request from './../requests/request_manager';
import Encryptor from 'jsencrypt';
import config from './../config/app_config';

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

    static encrypt(secret = '') {
        const public_key = config.public_key;
        const encryptor = new Encryptor.JSEncrypt();
        encryptor.setKey(atob(public_key));
        return encryptor.encrypt(secret);
    }

    static encryptObject(object = {}) {
        return Object.keys(object).reduce((encrypted, key) => {
            if (object[key] !== null && object[key] !== '') {
                encrypted[key] = Util.encrypt(object[key]);
            } else {
                encrypted[key] = ''
            }
            return encrypted;
        }, {})
    }
}

export default Util;