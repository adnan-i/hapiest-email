'use strict';

const Should = require('should');
const Promise = require('bluebird');
const Sinon = require('sinon');

const EmailServiceFactory = require('../../lib/emailServiceFactory');

const LoggerConfigFactory = require('hapiest-logger/lib/loggerConfigFactory');
const LoggerFactory = require('hapiest-logger/lib/loggerFactory');
const loggerConfig = LoggerConfigFactory.createFromJsObj({enabled: false});
const logger = LoggerFactory.createLogger(loggerConfig);

describe('EmailService', function() {

    describe('sendEmailToList', function() {

        it('Should send an email to the appropriate list', function() {

            const emailService = EmailServiceFactory.create({
                enabled: true,
                mailgunApiKey: 'someapikey',
                mailgunFromDomain: 'mg.somedomain.com',
                fromEmailAddress: 'dev@somedomain.com',
                emailLists: {
                    myList: ['john.doe@somedomain.com','jane.doe@somedomain.com'],
                    anotherList: ['david@foundrydc.com', 'nick@foundrydc.com']
                }
            }, logger);

            const sendEmailStub = Sinon.stub(emailService, 'sendEmail', (recipients, subject, body) => {
                return Promise.resolve();
            });

            return Promise.resolve()
            .then(() => emailService.sendEmailToList('anotherList', 'Hello, world!', 'It is go time!'))
            .then(() => {
                sendEmailStub.calledOnce.should.be.True();
                sendEmailStub.calledWith(['david@foundrydc.com','nick@foundrydc.com'], 'Hello, world!', 'It is go time!');
            })
        });

        it('Should fail due to invalid Mailgun credentials', function() {

            const emailService = EmailServiceFactory.create({
                enabled: true,
                mailgunApiKey: 'someapikey',
                mailgunFromDomain: 'mg.somedomain.com',
                fromEmailAddress: 'dev@somedomain.com',
                emailLists: {
                    myList: ['john.doe@somedomain.com','jane.doe@somedomain.com'],
                    anotherList: ['david@foundrydc.com', 'nick@foundrydc.com']
                }
            }, logger);

            let err;
            return Promise.resolve()
                .then(() => emailService.sendEmailToList('anotherList', 'Hello, world!', 'It is go time!'))
                .catch(e => err = e)
                .then(() => {
                    Should.exist(err);
                    err.message.should.eql('401');
                })
        });

        it('Should succeed even with invalid credentials because its disabled', function() {

            const emailService = EmailServiceFactory.create({
                enabled: false,
                mailgunApiKey: 'someapikey',
                mailgunFromDomain: 'mg.somedomain.com',
                fromEmailAddress: 'dev@somedomain.com',
                emailLists: {
                    myList: ['john.doe@somedomain.com','jane.doe@somedomain.com'],
                    anotherList: ['david@foundrydc.com', 'nick@foundrydc.com']
                }
            }, logger);

            const sendTextSpy = Sinon.spy(emailService._mailgun, 'sendText');

            let err;
            return Promise.resolve()
                .then(() => emailService.sendEmailToList('anotherList', 'Hello, world!', 'It is go time!'))
                .catch(e => err = e)
                .then(() => {
                    Should.not.exist(err);
                    sendTextSpy.notCalled.should.be.True();
                })
        });

    });

});