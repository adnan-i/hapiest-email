'use strict';

const Joi = require('joi');
const EmailService = require('./emailService');
const emailServiceConfigSchema = require('./emailServiceConfigSchema');

class EmailServiceFactory {

    /**
     * @param {Config} nodeConfig
     * @param {String} nodeConfigPath
     * @param {Logger} logger
     * @returns {EmailService}
     */
    static createFromNodeConfig(nodeConfig, nodeConfigPath, logger) {
        const config = nodeConfig.get(nodeConfigPath);
        return EmailServiceFactory.create(config, logger);
    }

    /**
     * @param {EmailServiceConfig} config
     * @param {Logger} logger
     * @returns {EmailService}
     */
    static create(config, logger) {
        const validationResult = Joi.validate(config, emailServiceConfigSchema);
        if (validationResult.error) {
            throw validationResult.error;
        }

        return new EmailService(config, logger);
    }

}

module.exports = EmailServiceFactory;
