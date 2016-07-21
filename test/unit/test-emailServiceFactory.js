'use strict';

const Should = require('should');
const Path = require('path');
const NodeConfig = require('config-uncached');
const EmailServiceFactory = require('../../lib/emailServiceFactory');
const EmailService = require('../../lib/emailService');

describe('EmailServiceFactory', function() {

    describe('create', function() {

        it('Should create an instance of EmailService', function() {
            const emailService = EmailServiceFactory.create({
                mailgunApiKey: 'someapikey',
                mailgunFromDomain: 'mg.somedomain.com',
                fromEmailAddress: 'dev@somedomain.com',
                emailLists: {
                    myList: ['john.doe@somedomain.com','jane.doe@somedomain.com']
                }
            });

            Should.exist(emailService);
            emailService.should.be.an.instanceOf(EmailService);
        })

        it('Should throw an error if mailgunApiKey is not provided', function() {
            let err;
            try {
                const emailService = EmailServiceFactory.create({
                    mailgunFromDomain: 'mg.somedomain.com',
                    fromEmailAddress: 'dev@somedomain.com',
                    emailLists: {
                        myList: ['john.doe@somedomain.com','jane.doe@somedomain.com']
                    }
                });
            } catch (e) { err = e; }

            Should.exist(err);
        });

        it('Should throw an error if mailgunFromDomain is not provided', function() {
            let err;
            try {
                const emailService = EmailServiceFactory.create({
                    mailgunApiKey: 'someapikey',
                    fromEmailAddress: 'dev@somedomain.com',
                    emailLists: {
                        myList: ['john.doe@somedomain.com','jane.doe@somedomain.com']
                    }
                });
            } catch (e) { err = e; }

            Should.exist(err);
        });

        it('Should throw an error if fromEmailAddress is not provided', function() {
            let err;
            try {
                const emailService = EmailServiceFactory.create({
                    mailgunApiKey: 'someapikey',
                    mailgunFromDomain: 'mg.somedomain.com',
                    emailLists: {
                        myList: ['john.doe@somedomain.com','jane.doe@somedomain.com']
                    }
                });
            } catch (e) { err = e; }

            Should.exist(err);
        });

        it('Should throw an error if emailLists has a non-email address in one of its keys', function() {
            let err;
            try {
                const emailService = EmailServiceFactory.create({
                    mailgunApiKey: 'someapikey',
                    mailgunFromDomain: 'mg.somedomain.com',
                    fromEmailAddress: 'dev@somedomain.com',
                    emailLists: {
                        myList: ['john.doe@somedomain.com','notanemail']
                    }
                });
            } catch (e) { err = e; }

            Should.exist(err);
        });

    });

    describe('createFromNodeConfig', function() {

        it('Should create an instance of EmailService', function() {
            const nodeConfig = getNodeConfig('config-1');
            const emailService = EmailServiceFactory.createFromNodeConfig(nodeConfig, 'mailgun');
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