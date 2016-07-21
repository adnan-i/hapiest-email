'use strict';

const Joi = require('joi');

const schema = {
    mailgunApiKey: Joi.string().required(),
    mailgunFromDomain: Joi.string().required(),
    fromEmailAddress: Joi.string().email().required(),
    emailLists: Joi.object().pattern(/.*/,Joi.array().items(Joi.string().email())).optional()
};

module.exports = schema;