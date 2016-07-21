'use strict';

const Promise = require('bluebird');
const Mailgun = require('mailgun').Mailgun;

class EmailService {

    /**
     * @name EmailServiceConfig
     * @type {Object}
     * @property {string} mailgunApiKey
     * @property {string} mailgunFromDomain
     * @property {string} fromEmailAddress
     * @property {Object} emailLists - properties are list names and values are arrays of email addresses
     */

    /**
     * @param {EmailServiceConfig} config
     */
    constructor(config) {
        this._config = config;
        this._mailgun = new Mailgun(config.mailgunApiKey);
    }

    /**
     * @param {String} emailListName
     * @param {String} subject
     * @param {String} body
     * @returns {Promise}
     */
    sendEmailToList(emailListName, subject, body) {
        return Promise.resolve()
        .then(() => {
            const emailList = this._config.emailLists[emailListName];
            if (!emailList) {
                throw new Error(`Email list ${emailListName} not found`);
            }

            return this.sendEmail(emailList, subject, body);
        });
    }

    /**
     * @param {String[]} recipients
     * @param {String} subject
     * @param {String} body
     */
    sendEmail(recipients, subject, body) {
        return new Promise((resolve, reject) => {
            const sender = this._config.fromEmailAddress;
            const fromServer = this._config.mailgunFromDomain;
            this._mailgun.sendText(sender, recipients, subject, body, fromServer, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

}

module.exports = EmailService;
