/* eslint-disable meteor/no-session */
import { Accounts } from 'meteor/accounts-base';
import { Session } from 'meteor/session';
import { FlowRouter } from 'meteor/kadira:flow-router';

// Redirect after logon
Accounts.onLogin(() => {
  const currentPath = FlowRouter.current().path;
  // redirect only if on login screen
  if (currentPath === '/login') {
  // check for specified redirect
    const redirect = Session.get('redirect');
    if (redirect) {
      Session.set('redirect', '');
      FlowRouter.go(redirect);
    } else {
      FlowRouter.go('/');
    }
  }
});
