/** @format */

class Code {
    ERROR = -1;
    SUCCESS = 0;

    // Login
    INVALID_USER = 50001;

    INVALID_TOKEN = 50008;
    USER_LOGGED_IN = 50012;
    TOKEN_EXPIRED = 50014;

    IP_FORBIDDEN = 50020;
    PERMISSION_DENIED = 50021;

    RECAPTCHA_VERIFY_FAILED = 50022;

    // User
    USERNAME_TAKEN = 50101;
    WRONG_PASSWORD = 50102;
    INVALID_USER_INACTIVE = 50103;

    // Database
    DATABASE_ERROR = 50200;

    // Request Data
    INCOMPLETE_DATA_STRUCTURE = 50300;
}

module.exports = {
    success(param = None) {
        data = { StatusCode: Code.SUCCESS, StatusDescription: 'Success' };

        if (param) data = { ...data, ...param };

        return data;
    },

    failed(message = 'Unknown Error') {
        // current_app.logger.error('Failed');
        return {
            StatusCode: Code.ERROR,
            StatusDescription: `${message} (${(new Date()).toISOString()})`,
        };
    },
};
