import './rootProps.css';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount, withOptions } from 'react-mounter';
import { DocHead } from 'meteor/kadira:dochead';
import React from 'react';

import MainLayout from '../../ui/layouts/MainLayout';
import { Home } from '../../ui/components/home/Home';
import Explore from '../../ui/components/explore/Explore';
import ForgotPassword from '../../ui/components/accounts/ForgotPassword';
import Join from '../../ui/components/accounts/Join';
import Login from '../../ui/components/accounts/Login';
import Profile from '../../ui/components/profiles/Profile';
import { NotFound } from '../../ui/helpers/NotFound';
import ProjectContainer from '../../ui/components/projects/ProjectContainer';
import ProjectCreate from '../../ui/components/projects/Create';
import ResetPassword from '../../ui/components/accounts/ResetPassword';
import Edit from '../../ui/components/projects/Edit';

// Override mount with Options
const mountOpt = withOptions({
  rootId: 'the-root',
  rootProps: { className: 'root-props' },
}, mount);

FlowRouter.route('/', {
  name: 'home',
  action() {
    DocHead.setTitle('Faneron');
    mountOpt(MainLayout, {
      content: <Home />,
    });
  },
});

FlowRouter.route('/profile', {
  name: 'profile',
  action() {
    DocHead.setTitle('Profile');
    mountOpt(MainLayout, {
      content: <Profile />,
    });
  },
});

FlowRouter.route('/edit/:projectId', {
  name: 'projectEdit',
  action(params) {
    DocHead.setTitle('Edit Project');
    mountOpt(MainLayout, {
      content: <Edit {...params} />,
    });
  },
});

FlowRouter.route('/create', {
  name: 'create',
  action() {
    DocHead.setTitle('Create New Game');
    mountOpt(MainLayout, {
      content: <ProjectCreate />,
    });
  },
});

FlowRouter.route('/explore', {
  name: 'explore',
  action() {
    DocHead.setTitle('Explore Games');
    mountOpt(MainLayout, {
      content: <Explore />,
    });
  },
});

FlowRouter.route('/forgot-password', {
  name: 'forgotPassword',
  action() {
    DocHead.setTitle('Forgot Password');
    mountOpt(MainLayout, {
      content: <ForgotPassword />,
    });
  },
});

FlowRouter.route('/join', {
  name: 'join',
  action() {
    DocHead.setTitle('Join');
    mountOpt(MainLayout, {
      content: <Join />,
    });
  },
});

FlowRouter.route('/login', {
  name: 'login',
  action() {
    DocHead.setTitle('Login');
    mountOpt(MainLayout, {
      content: <Login />,
    });
  },
});

FlowRouter.route('/projects/:projectId', {
  name: 'projects',
  action(params) {
    DocHead.setTitle('Project');
    mountOpt(MainLayout, {
      content: <ProjectContainer {...params} />,
    });
  },
});

FlowRouter.route('/reset-password/:token', {
  name: 'resetPassword',
  action(params) {
    DocHead.setTitle('Reset Password');
    mountOpt(MainLayout, {
      content: <ResetPassword {...params} />,
    });
  },
});

FlowRouter.notFound = {
  action() {
    DocHead.setTitle('Not Found');
    mountOpt(MainLayout, {
      content: <NotFound />,
    });
  },
};
