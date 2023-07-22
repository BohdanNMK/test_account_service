const express = require('express');
const app = express();
const statusCodes = require('http2').constants
const { COUNTRYES, GENDER, VALUE_FULLNAME } = require('./variable')
const { v4: uuidv4 } = require('uuid')


app.use(express.json());
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(statusCodes.HTTP_STATUS_BAD_REQUEST).json({ error: HTTP_MESSAGES.BAD_REQUEST });
});

app.post('v1/signup', (req, res) => {

    const { username, fullname, country, gender, description, approvedTermsAndConditions } = req.body

    if (!username && !fullname && !country || (!username || !fullname || !country)) {
        res.status(statusCodes.HTTP_STATUS_BAD_REQUEST).json({ error: HTTP_MESSAGES.BAD_REQUEST });
    }
    if (!/^\+?(?:[0-9\-\(\)\/\.]\s?){6,15}[0-9]{1}$/.test(username)) {
        return res.status(statusCodes.HTTP_STATUS_UNPROCESSABLE_ENTITY).json({ error: HTTP_MESSAGES.UNPROCESSABLE_ENTITY });
    }
    if (!/^([a-zA-Z\s\'\-]){3,64}$/.test(fullname)) {
        return res.status(statusCodes.HTTP_STATUS_UNPROCESSABLE_ENTITY).json({ error: HTTP_MESSAGES.UNPROCESSABLE_ENTITY });
    }
    if (!/^([a-zA-Z]){2}$/.test(country) || !COUNTRYES.includes(country)) {
        return res.status(statusCodes.HTTP_STATUS_UNPROCESSABLE_ENTITY).json({ error: HTTP_MESSAGES.UNPROCESSABLE_ENTITY });
    }
    if (!/^([a-zA-Z]){4,6}$/.test(gender) || !GENDER.includes(gender)) {
        gender = 'other';
    }
    if (description && !/^([a-zA-Z0-9\s\,\.\!\-\'\_]){1,2000}$/.test(description)) {
        return res.status(statusCodes.HTTP_STATUS_UNPROCESSABLE_ENTITY).json({ error: HTTP_MESSAGES.UNPROCESSABLE_ENTITY });
    }
    if (typeof approvedTermsAndConditions !== "boolean") {
        approvedTermsAndConditions = false
    }
    return res.status(statusCodes.HTTP_STATUS_CREATED).json({ id: uuidv4() });
});


app.post('v1/signin/:username', (req, res) => {
    const { username, password, sendNotification } = req.params;
    if (!username) {
        return res.status(statusCodes.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ error: HTTP_HTTP_MESSAGES.INTERNAL_SERVER_ERROR });
    }
    if (!password){
        return res.status(statusCodes.HTTP_STATUS_BAD_REQUEST).json({ error: HTTP_MESSAGES.ERR400.BAD_REQUEST });
    }
    if (!/^\+?(?:[0-9\-\(\)\/\.]\s?){6,15}[0-9]{1}$/.test(username)){
        return res.status(statusCodes.HTTP_STATUS_UNPROCESSABLE_ENTITY).json({ error: HTTP_MESSAGES.UNPROCESSABLE_ENTITY }); 
    }
    if (!/^([a-zA-Z0-9\+\-\_]){10,64}/.test(password)) {
        return res.status(statusCodes.HTTP_STATUS_UNPROCESSABLE_ENTITY).json({ error: HTTP_MESSAGES.UNPROCESSABLE_ENTITY });
    }
    if (typeof sendNotification !== "boolean"){
        sendNotification = false;
    }
    return res.status(statusCodes.HTTP_STATUS_OK).json({ id:uuidv4() });
});
app.put('v1/user/:id', (req, res) => {
    const { id, fullname, gender } = req.params;

if (!id){
    return res.status(statusCodes.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ error: HTTP_HTTP_MESSAGES.INTERNAL_SERVER_ERROR });
}
if (!/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/.test(id))
    return res.status(statusCodes.HTTP_STATUS_UNPROCESSABLE_ENTITY).json({ error: HTTP_MESSAGES.UNPROCESSABLE_ENTITY });
if (!fullname && !gender){
    return res.sendStatus(statusCodes.HTTP_STATUS_NO_CONTENT)
}
if (!/^([a-zA-Z\s\'\-]){3,64}$/.test(fullname)){
    return res.status(statusCodes.HTTP_STATUS_UNPROCESSABLE_ENTITY).json({ error: HTTP_MESSAGES.UNPROCESSABLE_ENTITY });
}
if (fullname !== VALUE_FULLNAME){
    return res.sendStatus(statusCodes.HTTP_STATUS_NO_CONTENT)   
}
return res.status(statusCodes.HTTP_STATUS_OK).json({ fullname });
});
