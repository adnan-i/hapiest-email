'use strict';

const Joi = require('joi');
const EmailService = require('./emailService');
const emailServiceConfigSchema = require('./emailServiceConfigSchema');

class EmailServiceFactory {

    /**
     * @param {Config} nodeConfig
     * @param {String} nodeConfigPath
     * @returns {EmailService}
     */
    static createFromNodeConfig(nodeConfig, nodeConfigPath) {
        const config = nodeConfig.get(nodeConfigPath);
        return EmailServiceFactory.create(config);
    }

    /**
     * @param {EmailServiceConfig} config
     * @returns {EmailService}
     */
    static create(config) {
        const validationResult = Joi.validate(config, emailServiceConfigSchema);
        if (validationResult.error) {
            throw validationResult.error;
        }

        return new EmailService(config);
    }

}

module.exports = EmailServiceFactory;
