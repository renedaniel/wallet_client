class Translator {
    constructor(data = {}) {
        this.setData(data);
    }

    setData(data) {
        this.data = Object.assign({}, data);
    }

    get(key, defaultText = null) {
        return this.data[key] ? this.data[key] : defaultText ? defaultText : key;
    }
}

export default new Translator();
