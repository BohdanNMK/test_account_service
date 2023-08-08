const express = require('express');
const app = express();
const statusCodes = require('http2').constants
const { COUNTRIES, GENDER, VALUE, PORT, HTTP_MESSAGES } = require('./variable')
const { v4: uuidv4 } = require('uuid')
const { USER_NAME_REG_EXP, FULL_NAME_REG_EXP, COUNTRY_REG_EXP, GENDER_REG_EXP,
    DESCRIRTION_REG_EXP, PASSWORD_REG_EXP, UUID_REG_EXP } = require('./regularExpression')

app.use(express.json());
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(statusCodes.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ error: HTTP_MESSAGES.INTERNAL_SERVER_ERROR });
});
app.use((req, res, next) => {
    const contentType = req.header('content-type');
    const contentLength = req.header('content-length');
  
    console.log('content-type:', contentType);
    console.log('content-length:', contentLength);
  
    next();
  });

  app.use('/v1/signup', (req, res, next) => {
     if (req.method !== 'POST'){
        
        next();
    }
    const { username, fullname, country, description } = req.body;
    let { gender, approvedTermsAndConditions } = req.body;

    if (!username && !fullname && !country || (!username || !fullname || !country)) {
        return res.status(statusCodes.HTTP_STATUS_BAD_REQUEST).json({ error: HTTP_MESSAGES.ERR400.BAD_REQUEST });
    }
    if (!USER_NAME_REG_EXP.test(username)) {
        
        return res.status(statusCodes.HTTP_STATUS_UNPROCESSABLE_ENTITY).json({ error: HTTP_MESSAGES.UNPROCESSABLE_ENTITY });
    }
    if (!FULL_NAME_REG_EXP.test(fullname)) {
       
        return res.status(statusCodes.HTTP_STATUS_UNPROCESSABLE_ENTITY).json({ error: HTTP_MESSAGES.UNPROCESSABLE_ENTITY });
    }
    if (!COUNTRY_REG_EXP.test(country) || !COUNTRIES.includes(country.toUpperCase())) {
       
        return res.status(statusCodes.HTTP_STATUS_UNPROCESSABLE_ENTITY).json({ error: HTTP_MESSAGES.UNPROCESSABLE_ENTITY });
    }
    if (!GENDER_REG_EXP.test(gender) || !GENDER.includes(gender.toLowerCase())) {
        gender = 'other';
    }
    if (description && !DESCRIRTION_REG_EXP.test(description)) {
       
        return res.status(statusCodes.HTTP_STATUS_UNPROCESSABLE_ENTITY).json({ error: HTTP_MESSAGES.UNPROCESSABLE_ENTITY });
    }
    if (typeof approvedTermsAndConditions !== "boolean") {
        approvedTermsAndConditions = false;
    }

    return res.status(statusCodes.HTTP_STATUS_CREATED).json({ id: uuidv4() });

});



app.post('/v1/signin/:username', (req, res) => {
    const { username } = req.params;
    const { password } = req.body;
    let { sendNotification } = req.body;

    if (!username) {
        return res.status(statusCodes.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ error: HTTP_MESSAGES.INTERNAL_SERVER_ERROR });
    }
    if (!password) {
        return res.status(statusCodes.HTTP_STATUS_BAD_REQUEST).json({ error: HTTP_MESSAGES.ERR400.BAD_REQUEST });
    }
    if (!USER_NAME_REG_EXP.test(username)) {
        return res.status(statusCodes.HTTP_STATUS_UNPROCESSABLE_ENTITY).json({ error: HTTP_MESSAGES.UNPROCESSABLE_ENTITY });
    }
    if (!PASSWORD_REG_EXP.test(password)) {
        return res.status(statusCodes.HTTP_STATUS_UNPROCESSABLE_ENTITY).json({ error: HTTP_MESSAGES.UNPROCESSABLE_ENTITY });
    }
    if (typeof sendNotification !== "boolean") {
        sendNotification = false;
    }
    return res.status(statusCodes.HTTP_STATUS_OK).json({ id: uuidv4() });
});


app.put('/v1/user/:id', (req, res) => {
    const { id } = req.params;
    const { fullname, gender } = req.body;

    if (!id) {
        return res.status(statusCodes.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ error: HTTP_MESSAGES.INTERNAL_SERVER_ERROR });
    }
    if (!UUID_REG_EXP.test(id)) {
        return res.status(statusCodes.HTTP_STATUS_UNPROCESSABLE_ENTITY).json({ error: HTTP_MESSAGES.UNPROCESSABLE_ENTITY });
    }
    if (!fullname && !gender) {
        return res.sendStatus(statusCodes.HTTP_STATUS_NO_CONTENT)
    }
    if (!FULL_NAME_REG_EXP.test(fullname)) {
        return res.status(statusCodes.HTTP_STATUS_UNPROCESSABLE_ENTITY).json({ error: HTTP_MESSAGES.UNPROCESSABLE_ENTITY });
    }
    if (fullname === VALUE.FULLNAME_VALUE) {
        return res.status(statusCodes.HTTP_STATUS_OK).json({ fullname });
    }

    return res.sendStatus(statusCodes.HTTP_STATUS_NO_CONTENT)
});


app.get('/v1/user', (req, res) => {
    const { username, fullname, country, gender } = req.query;
    if (!country) {
        return res.status(statusCodes.HTTP_STATUS_BAD_REQUEST).json({ error: HTTP_MESSAGES.ERR400.BAD_REQUEST });
    }
    if (!COUNTRY_REG_EXP.test(country) && !COUNTRIES.includes(country.toUpperCase())) {
        return res.status(statusCodes.HTTP_STATUS_UNPROCESSABLE_ENTITY).json({ error: HTTP_MESSAGES.UNPROCESSABLE_ENTITY });
    }
    if (!FULL_NAME_REG_EXP.test(fullname)) {
        return res.status(statusCodes.HTTP_STATUS_UNPROCESSABLE_ENTITY).json({ error: HTTP_MESSAGES.UNPROCESSABLE_ENTITY });
    }
    if (country.toLocaleUpperCase() === VALUE.COUNTRY_VALUE && fullname === VALUE.FULLNAME_VALUE) {
        return res.status(statusCodes.HTTP_STATUS_OK).json({ id: uuidv4(), fullname: VALUE.FULLNAME_VALUE });
    }

    return res.sendStatus(statusCodes.HTTP_STATUS_NO_CONTENT)
});


app.listen(PORT, () => {
    console.log(`server runs on the port ${PORT}`)
})
