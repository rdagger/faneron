// Register methods and publications
// Methods are registered so the server side runs when called from client
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

import '../../api/comments/methods';
import '../../api/comments/server/publications';
import '../../api/news/methods';
import '../../api/news/server/publications';
import '../../api/projects/methods';
import '../../api/projects/server/publications';
import '../../api/stars/methods';
import '../../api/stars/server/publications';
import '../../api/watches/methods';
import '../../api/watches/server/publications';
import '../../api/users/methods';

// Limit method calls per second for better security
const THROTTLE_METHODS = _.chain(Meteor.server.method_handlers)
  .keys()
  .filter(k => k.includes('.methods.'))
  .value();
DDPRateLimiter.addRule({
  name(name) {
    return _.contains(THROTTLE_METHODS, name);
  },
  // Rate limit per connection ID
  connectionId() { return true; },
}, 5, 1000);
