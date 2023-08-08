const express = require('express');
const app = express();
const {HTTP_STATUS_BAD_REQUEST,HTTP_STATUS_INTERNAL_SERVER_ERROR,HTTP_STATUS_UNPROCESSABLE_ENTITY,
       HTTP_STATUS_CREATED,HTTP_STATUS_OK,HTTP_STATUS_NO_CONTENT} = require('http2').constants
const {STATIC_DATA:{METHOD:{POST}, VALUE:{FULLNAME_VALUE,COUNTRY_VALUE, OTHER_VALUE,BOOLEAN_VALUE},
       PORT, COUNTRIES, GENDER,  HTTP_MESSAGES:{ERR4XX:{BAD_REQUEST},UNPROCESSABLE_ENTITY,INTERNAL_SERVER_ERROR}}, 
       REGEXP: { USER_NAME_REG_EXP, FULL_NAME_REG_EXP, COUNTRY_REG_EXP, GENDER_REG_EXP,
       DESCRIRTION_REG_EXP, PASSWORD_REG_EXP, UUID_REG_EXP } } = require('./variable')
const { v4: uuidv4 } = require('uuid');


app.use(express.json());
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ error: INTERNAL_SERVER_ERROR });
});


app.use((req, res, next) => {
    const contentType = req.header('content-type');
    const contentLength = req.header('content-length');
  
    console.log('content-type:', contentType);
    console.log('content-length:', contentLength);
  
    next();
  });

  app.use('/v1/signup', (req, res, next) => {
     if (req.method !== POST){
        
        next();
    }
    const { username, fullname, country, description } = req.body;
    let { gender, approvedTermsAndConditions } = req.body;

    if (!username && !fullname && !country || (!username || !fullname || !country)) {
        return res.status(HTTP_STATUS_BAD_REQUEST).json({ error: BAD_REQUEST });
    }
    if (!USER_NAME_REG_EXP.test(username)) {
        
        return res.status(HTTP_STATUS_UNPROCESSABLE_ENTITY).json({ error: UNPROCESSABLE_ENTITY });
    }
    if (!FULL_NAME_REG_EXP.test(fullname)) {
       
        return res.status(HTTP_STATUS_UNPROCESSABLE_ENTITY).json({ error: UNPROCESSABLE_ENTITY });
    }
    if (!COUNTRY_REG_EXP.test(country) || !COUNTRIES.includes(country.toUpperCase())) {
       
        return res.status(HTTP_STATUS_UNPROCESSABLE_ENTITY).json({ error: UNPROCESSABLE_ENTITY });
    }
    if (!GENDER_REG_EXP.test(gender) || !GENDER.includes(gender.toLowerCase())) {
        gender = OTHER_VALUE;
    }
    if (description && !DESCRIRTION_REG_EXP.test(description)) {
       
        return res.status(HTTP_STATUS_UNPROCESSABLE_ENTITY).json({ error: UNPROCESSABLE_ENTITY });
    }
    if (typeof approvedTermsAndConditions !== BOOLEAN_VALUE) {

        approvedTermsAndConditions = false;
    }

    return res.status(HTTP_STATUS_CREATED).json({ id: uuidv4() });

});


app.post('/v1/signin/:username', (req, res) => {
    const { username } = req.params;
    const { password } = req.body;
    let { sendNotification } = req.body;

    if (!username) {
        return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ error: INTERNAL_SERVER_ERROR });
    }
    if (!password) {
        return res.status(HTTP_STATUS_BAD_REQUEST).json({ error: BAD_REQUEST });
    }
    if (!USER_NAME_REG_EXP.test(username)) {
        return res.status(HTTP_STATUS_UNPROCESSABLE_ENTITY).json({ error: UNPROCESSABLE_ENTITY });
    }
    if (!PASSWORD_REG_EXP.test(password)) {
        return res.status(HTTP_STATUS_UNPROCESSABLE_ENTITY).json({ error: UNPROCESSABLE_ENTITY });
    }
    if (typeof sendNotification !== BOOLEAN_VALUE) {
        sendNotification = false;
    }
    return res.status(HTTP_STATUS_OK).json({ id: uuidv4() });
});


app.put('/v1/user/:id', (req, res) => {
    const { id } = req.params;
    const { fullname, gender } = req.body;

    if (!id) {
        return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ error: INTERNAL_SERVER_ERROR });
    }
    if (!UUID_REG_EXP.test(id)) {
        return res.status(HTTP_STATUS_UNPROCESSABLE_ENTITY).json({ error: UNPROCESSABLE_ENTITY });
    }
    if (!fullname && !gender) {
        return res.sendStatus(HTTP_STATUS_NO_CONTENT)
    }
    if (!FULL_NAME_REG_EXP.test(fullname)) {
        return res.status(HTTP_STATUS_UNPROCESSABLE_ENTITY).json({ error: UNPROCESSABLE_ENTITY });
    }
    if (fullname === FULLNAME_VALUE) {
        return res.status(HTTP_STATUS_OK).json({ fullname });
    }

    return res.sendStatus(HTTP_STATUS_NO_CONTENT)
});


app.get('/v1/user', (req, res) => {
    const { username, fullname, country, gender } = req.query;
    if (!country) {
        return res.status(HTTP_STATUS_BAD_REQUEST).json({ error: BAD_REQUEST });
    }
    if (!COUNTRY_REG_EXP.test(country) && !COUNTRIES.includes(country.toUpperCase())) {
        return res.status(HTTP_STATUS_UNPROCESSABLE_ENTITY).json({ error: UNPROCESSABLE_ENTITY });
    }
    if (!FULL_NAME_REG_EXP.test(fullname)) {
        return res.status(HTTP_STATUS_UNPROCESSABLE_ENTITY).json({ error: UNPROCESSABLE_ENTITY });
    }
    if (country.toLocaleUpperCase() === COUNTRY_VALUE && fullname === FULLNAME_VALUE) {
        return res.status(HTTP_STATUS_OK).json({ id: uuidv4(), fullname: FULLNAME_VALUE });
    }

    return res.sendStatus(HTTP_STATUS_NO_CONTENT)
});

app.use((err, req, res, next) => {
  
    console.error(error.stack);
    res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ error: INTERNAL_SERVER_ERROR });
});

app.listen(PORT, () => {
    console.log(`server runs on the port ${PORT}`)
})
