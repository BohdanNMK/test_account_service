const STATIC_DATA = {
  PORT: 33112,
  COUNTRIES: ['AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AW', 'AX', 'AZ', 'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS', 'BT', 'BV', 'BW', 'BY', 'BZ', 'CA', 'CC', 'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CN', 'CO', 'CR', 'CU', 'CV', 'CW', 'CX', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'EH', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FK', 'FM', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP', 'GQ', 'GR', 'GS', 'GT', 'GU', 'GW', 'GY', 'HK', 'HM', 'HN', 'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IR', 'IS', 'IT', 'JE', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KP', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MH', 'MK', 'ML', 'MM', 'MN', 'MO', 'MP', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NC', 'NE', 'NF', 'NG', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 'NZ', 'OM', 'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT', 'PW', 'PY', 'QA', 'RE', 'RO', 'RS', 'RU', 'RW', 'SA', 'SB', 'SC', 'SD', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS', 'ST', 'SV', 'SX', 'SY', 'SZ', 'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TR', 'TT', 'TV', 'TW', 'TZ', 'UA', 'UG', 'UM', 'US', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VI', 'VN', 'VU', 'WF', 'WS', 'YE', 'YT', 'ZA', 'ZM', 'ZW'],
  GENDER: ['male', 'female', 'other'],
  VALUE: {
    FULLNAME_VALUE: "Cartman",
    COUNTRY_VALUE: "US",
    OTHER_VALUE: 'other',
    BOOLEAN_VALUE: "boolean"

  },
  METHOD:{
    POST: 'POST'
  },
  HTTP_MESSAGES: {
    'ERR4XX': {
      'BAD_REQUEST': "Bad Request",
      'ERR_REQUIRED_FIELDS': "'name' and 'type' are required fields",
      'ERR_REQUIRED_FIELDS_NAME': "'name' are required fields",
      'MAX_LENGH': "'name' field must be a string with a maximum of 255 characters"
    },
    'ERR2XX':{
    'OK': "OK",
    'CREATED': "Created",
    'NO_CONTENT': "No Content",
  },
    
    'VARIABLE_UNDEFINED': 'variable is undefined',
    'MUST_BE_NUMBER': "Field 'type' must be a number",
    'NOT_FOUND': "Not Found",
    'UNPROCESSABLE_ENTITY': "Unprocessable Entity",
    'INTERNAL_SERVER_ERROR': "Internal Server Error"
  },
};
const REGEXP = {
  USER_NAME_REG_EXP: new RegExp ('^\\+?([0-9]){6,15}$'),
  FULL_NAME_REG_EXP: new RegExp(/^([a-zA-Z\s\'\-]){3,64}$/),
  COUNTRY_REG_EXP: new RegExp(STATIC_DATA.COUNTRIES.join('|'), 'i'),
  GENDER_REG_EXP: new RegExp(STATIC_DATA.GENDER.join('|'), 'i'),
  DESCRIRTION_REG_EXP: new RegExp(/^([a-zA-Z0-9\s\,\.\!\-\'\_]){1,2000}$/),
  PASSWORD_REG_EXP: new RegExp(/^([a-zA-Z0-9\+\-\_]){10,64}$/),
  UUID_REG_EXP: new RegExp(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/)
};

module.exports = {
  STATIC_DATA,
  REGEXP
};


