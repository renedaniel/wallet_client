
function getAppConfig() {
    const tmp = "https://stormy-earth-34581.herokuapp.com/api";
    const end_point = process.env.NODE_ENV !== 'production' ? tmp : tmp;

    return {
        end_point,
        api_version: "v1"
    };
}

export default getAppConfig();
