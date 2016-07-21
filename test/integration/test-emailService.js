'use strict';

const Should = require('should');
const Promise = require('bluebird');
const NodeConfig = require('config');

const EmailServiceFactory = require('../../lib/emailServiceFactory');

describe('EmailService', function() {

    describe('sendEmailToList', function() {

        it('Should send an email to the appropriate list', function() {
            const emailService = EmailServiceFactory.createFromNodeConfig(NodeConfig, 'mailgun');
            return Promise.resolve()
            .then(() => emailService.sendEmailToList('testList', 'Testing hapiest-email', 'It works!'))
            .catch(err => {
                Should.not.exist(err); // Should succeed, not fail
            });
        });

    });

});