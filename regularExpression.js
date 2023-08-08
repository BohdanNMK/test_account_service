const { COUNTRIES, GENDER } = require('./variable')
module.exports = {
    USER_NAME_REG_EXP: new RegExp ('^\\+?([1-9]){6,15}$'),
    FULL_NAME_REG_EXP: new RegExp(/^([a-zA-Z\s\'\-]){3,64}$/),
    COUNTRY_REG_EXP: new RegExp(COUNTRIES.join('|'), 'i'),
    GENDER_REG_EXP: new RegExp(GENDER.join('|'), 'i'),
    DESCRIRTION_REG_EXP: new RegExp(/^([a-zA-Z0-9\s\,\.\!\-\'\_]){1,2000}$/),
    PASSWORD_REG_EXP: new RegExp(/^([a-zA-Z0-9\+\-\_]){10,64}$/),
    UUID_REG_EXP: new RegExp(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/)
}