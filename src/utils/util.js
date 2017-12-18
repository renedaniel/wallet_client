import Request from './../requests/request_manager';
import Encryptor from 'jsencrypt';
import config from './../config/app_config';
import Notification from 'izitoast';
import React from 'react';
import Translator from './translator';
import store from './../store';
import { showLoader, hideLoader } from './../actions/spinner_action';

class Util {
    static formatAmount(amount) {
        const float = parseFloat(amount);
        return `$${float.toFixed(2)}`;
    }

    static calcTax(amount) {
        amount = parseFloat(amount);
        let fixedRate = 0;
        let percent = 0;
        if (amount <= 1000) {
            fixedRate = 8;
            percent = amount * 0.03;
        } else if (amount > 1000 && amount <= 5000) {
            fixedRate = 6;
            percent = amount * 0.025;
        } else if (amount > 5000 && amount <= 10000) {
            fixedRate = 4;
            percent = amount * 0.02;
        } else if (amount > 10000) {
            fixedRate = 3;
            percent = amount * 0.01;
        }
        const total = amount + percent + fixedRate;
        return { amount, percent, fixedRate, total }
    }

    static async performSimpleRequest(Task, params = {}) {
        try {
            store.dispatch(showLoader());
            const task = new Task(params);
            const response = await Request.addRequest(task);
            store.dispatch(hideLoader());
            return new Promise((resolve, reject) => {
                resolve(response);
            });
        } catch (error) {
            store.dispatch(hideLoader());
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }

    static renderInput(key, value, error = false, onChange = () => { }, type = 'text', mb = 5, size = '12') {
        return (
            <div className={`col-md-${size} mb-${mb}`}>
                <label htmlFor={`${key}`}>{Translator.get(`label_form_${key}`)}</label>
                <input
                    type={type}
                    id={`${key}`}
                    onChange={onChange}
                    value={value}
                    className={`form-control ${error ? 'is-invalid' : ''}`}
                    placeholder={Translator.get(`ph_form_${key}`)}
                />
                {error &&
                    <div className="invalid-feedback">
                        {Array.isArray(error) ? Translator.get(error[0]) : Translator.get(error)}
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