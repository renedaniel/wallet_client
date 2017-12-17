import Request from './../requests/request_manager';
import Encryptor from 'jsencrypt';
import config from './../config/app_config';
import Notification from 'izitoast';
import React from 'react';
import Translator from './translator';

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

    static renderInput(key, value, error = false, onChange = () => { }, type = 'text', mb = 5, size = '12') {
        return (
            <div className={`col-md-${size} mb-${mb}`}>
                <label htmlFor={`${key}`}>{Translator.get(`label_${key}`)}</label>
                <input
                    type={type}
                    id={`${key}`}
                    onChange={onChange}
                    value={value}
                    className={`form-control ${error ? 'is-invalid' : ''}`}
                />
                {error &&
                    <div className="invalid-feedback">
                        {Translator.get(error)}
                    </div>
                }
            </div>
        );
    }

    static sendError(options = {}) {
        const config = Object.assign({
            title: 'Error',
            message: 'Intenta de nuevo',
            position: 'topCenter',
            backgroundColor: '',
            theme: 'light',
            color: 'red',
        }, options);
        Notification.show(config);
    }

    static sendInfo(options = {}) {
        const config = Object.assign({
            title: 'Éxito',
            message: 'Lo has logrado',
            position: 'topCenter',
            backgroundColor: '',
            theme: 'light',
            color: '',
        }, options);
        Notification.show(config);
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