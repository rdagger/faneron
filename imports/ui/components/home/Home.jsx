import { Meteor } from 'meteor/meteor';
import React from 'react';
import Avatar from 'material-ui/Avatar';
import Card from 'material-ui/Card';
import CardHeader from 'material-ui/Card/CardHeader';
import CardText from 'material-ui/Card/CardText';
import Divider from 'material-ui/Divider';
import ActionCode from 'material-ui/svg-icons/action/code';
import SocialPeopleOutline from 'material-ui/svg-icons/social/people-outline';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble-outline';
import myTheme from '../../themes/myTheme';

export const Home = () => {
  let loginJoin = null;
  if (!Meteor.user()) {
    loginJoin = (
      <div style={styles.loginJoin}>
        <a href="/login">Login</a>&nbsp;/&nbsp;
        <a href="/join">Join</a>
      </div>
    );
  }

  return (
    <div style={styles.homeWrapper}>
      <div style={styles.title}>Online community space for independent developers</div>
      <div style={styles.subTitle}>Creation meets feedback</div>

      {loginJoin}

      <Divider style={styles.divider} />

      <div style={styles.columnsWrapper}>
        <div style={styles.subColumn}>
          <div style={styles.subHeading}>Practice</div>
          <div style={styles.subText}>
            Deliberately focus on improving your skills.<br />
            Gain a deep understanding of the fundamentals of your craft.<br />
          Experiment in a relaxed place where bugs don't inconvenience anyone.
          </div>
        </div>
        <div style={styles.subColumn}>
          <div style={styles.subHeading}>Mentorship</div>
          <div style={styles.subText}>
            Practice providing useful critique<br />
            Discuss code in both subjective and objective terms.<br />
            Strengthen your problem-solving skills by guiding others through the process.
          </div>
        </div>
      </div>

      <Card style={styles.card}>
        <CardHeader
          title="Create"
          titleColor={myTheme.palette.primary2Color}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText
          expandable={true}
        >
          Hone your projects.<br />
          Experiment in a place where playing with ideas is encouraged.<br />
          Gain support and influence for your games during development.
        </CardText>
      </Card>

      <Card style={styles.card}>
        <CardHeader
          title="Collaborate"
          titleColor={myTheme.palette.primary2Color}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText
          expandable={true}
        >
          Provide useful critique.<br />
          Discuss games in both subjective and objective terms.<br />
          Strengthen your createivity by joining others in the process.
        </CardText>
      </Card>

      <div style={styles.columnsWrapper}>
        <div style={styles.centeredColumn}>
          <Avatar
            backgroundColor={myTheme.palette.accent1Color}
          >
            <ActionCode />
          </Avatar>
          <div style={styles.subHeading}>Practice</div>
          <div style={styles.centeredSubtext}>Focus on expressive, readable code.</div>
          <div style={styles.subText}>
            Work in your local development environment using your usual tools in
            multiple languages.
            We give you a test suite and you make the tests pass...
            but that's just the first step.
          </div>
        </div>
        <div style={styles.centeredColumn}>
          <Avatar
            backgroundColor={myTheme.palette.accent1Color}
          >
            <SocialPeopleOutline />
          </Avatar>
          <div style={styles.subHeading}>Communicate</div>
          <div style={styles.centeredSubtext}>The code is a conversation starter.</div>
          <div style={styles.subText}>
            Have a thoughtful discussion with your peers about the choices that you made.
            Take this opportunity to explore idioms, style and trade-offs.
            There's no right answer and many good questions.
          </div>
        </div>
        <div style={styles.centeredColumn}>
          <Avatar
            backgroundColor={myTheme.palette.accent1Color}
          >
            <CommunicationChatBubble />
          </Avatar>
          <div style={styles.subHeading}>Pay it Forward</div>
          <div style={styles.centeredSubtext}>Explore other people's solutions.</div>
          <div style={styles.subText}>
            Articulate what you like and dislike in other people's code.
            Have a thoughtful, nuanced discussion,
            deepening your own understnading of the design choices that you make every day.
          </div>
        </div>
      </div>

      <Card style={styles.card}>
        <CardHeader
          title="Post"
          titleColor={myTheme.palette.primary2Color}
          subtitle="Conceptualize your next game."
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText
          expandable={true}
        >
          Post a project.  Any idea, inspiration, or muse is fair game.
          Your job is to create &mdash; we're here to organize.
        </CardText>
      </Card>

      <Card style={styles.card}>
        <CardHeader
          title="Communicate"
          titleColor={myTheme.palette.primary2Color}
          subtitle="Talk about your ideas."
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText
          expandable={true}
        >
          Host discussions with your peers and explore outside perspectives.
          Pick brains and make friends in a chaotic and open-sourced environment
          centered on your project.
        </CardText>
      </Card>

      <Card style={styles.card}>
        <CardHeader
          title="Develop"
          titleColor={myTheme.palette.primary2Color}
          subtitle="Explore other people's solutions."
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText
          expandable={true}
        >
          Get to work with a deeper understanding of your project.
          Independence doesn't mean isolation.
          Keep your peers updated and involved during the process.
        </CardText>
      </Card>

    </div>
  );
}; // End Home

Home.contextTypes = {
  currentUser: React.PropTypes.object,
};

const styles = {
  homeWrapper: {
    fontFamily: 'Roboto,sans-serif',
  },
  title: {
    marginTop: '20px',
    fontSize: '1.25em',
    textAlign: 'center',
  },
  subTitle: {
    color: myTheme.palette.primary1Color,
    fontSize: '0.9em',
    marginTop: '4px',
    textAlign: 'center',
  },
  loginJoin: {
    marginTop: '20px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  divider: {
    marginTop: '20px',
    marginBottom: '20px',
  },
  columnsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: '20px',
    marginBottom: '20px',
  },
  subHeading: {
    color: myTheme.palette.primary1Color,
    fontSize: '1.0em',
    fontWeight: '500',
    marginBottom: '5px',
  },
  subColumn: {
    marginLeft: '20px',
    marginRight: '20px',
    width: '310px',
  },
  subText: {
    fontSize: '0.7em',
    marginBottom: '10px',
  },
  centeredColumn: {
    marginLeft: '20px',
    marginRight: '20px',
    textAlign: 'center',
    width: '220px',
  },
  centeredSubtext: {
    backgroundColor: myTheme.palette.accent2Color,
    fontSize: '0.7em',
    marginBottom: '5px',
  },
  card: {
    marginBottom: '10px',
    marginLeft: '20px',
    marginRight: '20px',
  },
};
