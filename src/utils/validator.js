class Validator {

    static isNotEmpty(string = '') {
        return string.length > 0;
    }

    static isValidEmail(email = '') {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    }

    static isValidAmount(quantity = '') {
        const amount = parseFloat(quantity);
        return !isNaN(amount);
    }

    static setError(key, data, validation, message, errors = {}) {
        if (!validation(data)) {
            errors[key] = message;
        }
        return errors;
    }

}

export default Validator;