var host = 'https://www.sweetyhut.cn';

var config = {
    service: {
        host,
        loginUrl: `${host}/ezoa/user/login`,
        checkStatusUrl: `${host}/ezoa/user/checkstatus`,
        checkUrl: `${host}/ezoa/user/check`,
        getCheckLogUrl: `${host}/ezoa/user/getchecklog`
    }
};

module.exports = config;
