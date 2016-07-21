'use strict';

const Should = require('should');
const Promise = require('bluebird');
const Sinon = require('sinon');

const EmailServiceFactory = require('../../lib/emailServiceFactory');

describe('EmailService', function() {

    describe('sendEmailToList', function() {

        it('Should send an email to the appropriate list', function() {

            const emailService = EmailServiceFactory.create({
                mailgunApiKey: 'someapikey',
                mailgunFromDomain: 'mg.somedomain.com',
                fromEmailAddress: 'dev@somedomain.com',
                emailLists: {
                    myList: ['john.doe@somedomain.com','jane.doe@somedomain.com'],
                    anotherList: ['david@foundrydc.com', 'nick@foundrydc.com']
                }
            });

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

    });

});