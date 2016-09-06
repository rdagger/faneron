/* eslint-disable no-param-reassign */
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { _ } from 'meteor/underscore';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

Accounts.onCreateUser((options, user) => {
  options.profile = {};
  options.profile.location = '';
  options.profile.website = '';
  options.profile.sendNotifications = true;
  options.profile.avatarUploaded = new Date('1970-01-01T00:00:00.000Z');  // set time stamp to zero
  options.profile.watch = 0;
  user.profile = options.profile;
  return user;
});

// Don't let people write arbitrary data to their 'profile' field from the client
Meteor.users.deny({
  update() {
    return true;
  },
});

// Change reset passwork link
Accounts.urls.resetPassword = function(token) {
  return Meteor.absoluteUrl(`reset-password/${token}`);
};

// Set email templates
Accounts.emailTemplates.siteName = 'Faneron';
Accounts.emailTemplates.from = 'Faneron <noreply@faneron.com>';

// Set Meteor Mail SMTP to SendGrid
process.env.MAIL_URL = `smtp://apikey:${Meteor.settings.SendGridApiKey}@smtp.sendgrid.net:587`;

// console.log(Meteor.server.method_handlers);
// Get a list of all accounts methods by running `Meteor.server.method_handlers` in meteor shell
const AUTH_METHODS = [
  'login',
  'logout',
  'logoutOtherClients',
  'getNewToken',
  'removeOtherTokens',
  'configureLoginService',
  'changePassword',
  'forgotPassword',
  'resetPassword',
  'verifyEmail',
  'createUser',
  'ATRemoveService',
  'ATCreateUserServer',
  'ATResendVerificationEmail',
];


// Only allow 2 login attempts per connection per 5 seconds
DDPRateLimiter.addRule({
  name(name) {
    return _.contains(AUTH_METHODS, name);
  },

  // Rate limit per connection ID
  connectionId() { return true; },
}, 2, 5000);
