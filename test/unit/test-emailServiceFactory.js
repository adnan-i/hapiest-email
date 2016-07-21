'use strict';

const Should = require('should');
const Path = require('path');
const NodeConfig = require('config-uncached');
const EmailServiceFactory = require('../../lib/emailServiceFactory');
const EmailService = require('../../lib/emailService');

const LoggerConfigFactory = require('hapiest-logger/lib/loggerConfigFactory');
const LoggerFactory = require('hapiest-logger/lib/loggerFactory');
const loggerConfig = LoggerConfigFactory.createFromJsObj({enabled: false});
const logger = LoggerFactory.createLogger(loggerConfig);

describe('EmailServiceFactory', function() {

    describe('create', function() {

        it('Should create an instance of EmailService', function() {
            const emailService = EmailServiceFactory.create({
                enabled: true,
                mailgunApiKey: 'someapikey',
                mailgunFromDomain: 'mg.somedomain.com',
                fromEmailAddress: 'dev@somedomain.com',
                emailLists: {
                    myList: ['john.doe@somedomain.com','jane.doe@somedomain.com']
                }
            }, logger);

            Should.exist(emailService);
            emailService.should.be.an.instanceOf(EmailService);
        });

        it('Should throw an error if enabled is not provided', function() {
            let err;
            try {
                const emailService = EmailServiceFactory.create({
                    mailgunApiKey: 'someapikey',
                    mailgunFromDomain: 'mg.somedomain.com',
                    fromEmailAddress: 'dev@somedomain.com',
                    emailLists: {
                        myList: ['john.doe@somedomain.com','jane.doe@somedomain.com']
                    }
                }, logger);
            } catch (e) { err = e; }

            Should.exist(err);
        });

        it('Should throw an error if mailgunApiKey is not provided', function() {
            let err;
            try {
                const emailService = EmailServiceFactory.create({
                    enabled: true,
                    mailgunFromDomain: 'mg.somedomain.com',
                    fromEmailAddress: 'dev@somedomain.com',
                    emailLists: {
                        myList: ['john.doe@somedomain.com','jane.doe@somedomain.com']
                    }
                }, logger);
            } catch (e) { err = e; }

            Should.exist(err);
        });

        it('Should throw an error if mailgunFromDomain is not provided', function() {
            let err;
            try {
                const emailService = EmailServiceFactory.create({
                    enabled: true,
                    mailgunApiKey: 'someapikey',
                    fromEmailAddress: 'dev@somedomain.com',
                    emailLists: {
                        myList: ['john.doe@somedomain.com','jane.doe@somedomain.com']
                    }
                }, logger);
            } catch (e) { err = e; }

            Should.exist(err);
        });

        it('Should throw an error if fromEmailAddress is not provided', function() {
            let err;
            try {
                const emailService = EmailServiceFactory.create({
                    enabled: true,
                    mailgunApiKey: 'someapikey',
                    mailgunFromDomain: 'mg.somedomain.com',
                    emailLists: {
                        myList: ['john.doe@somedomain.com','jane.doe@somedomain.com']
                    }
                }, logger);
            } catch (e) { err = e; }

            Should.exist(err);
        });

        it('Should throw an error if emailLists has a non-email address in one of its keys', function() {
            let err;
            try {
                const emailService = EmailServiceFactory.create({
                    enabled: true,
                    mailgunApiKey: 'someapikey',
                    mailgunFromDomain: 'mg.somedomain.com',
                    fromEmailAddress: 'dev@somedomain.com',
                    emailLists: {
                        myList: ['john.doe@somedomain.com','notanemail']
                    }
                }, logger);
            } catch (e) { err = e; }

            Should.exist(err);
        });

    });

    describe('createFromNodeConfig', function() {

        it('Should create an instance of EmailService', function() {
            const nodeConfig = getNodeConfig('config-1');
            const emailService = EmailServiceFactory.createFromNodeConfig(nodeConfig, 'mailgun', logger);
            Should.exist(emailService);
            emailService.should.be.an.instanceOf(EmailService);
        })

    });

});

function getNodeConfig(configFolder) {
    const configDir = Path.join(__dirname, '../unit-helper/emailServiceFactory', configFolder);
    process.env.NODE_CONFIG_DIR = configDir;
    return NodeConfig(true);
}