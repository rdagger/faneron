# faneron ![logo](https://s3-us-west-2.amazonaws.com/faneron/images/logo.png "logo")

Online community space for independent game developers using React, Meteor and Material UI.

React implementation includes:
* Meteor Accounts without Blaze
* Markdown editor with preview
* User profile avatar uploading and cropping
* Database searching, filtering and pagination
* AWS image storage

_Status:_  Back-end mostly functional, front-end awaiting design clean up.

_Notes:_ A settings.json file is required in the root of the project to store sensitive information such as API keys.  For security reasons it is very important to exclude this file from GitHub. 
 My settings.json file includes keys for Amazon and Sendgrid:
* AWSAccessKeyId 
* AWSSecretAccessKey
* region
* SendGridApiKey

Settings.json also has a public section where I store my domain and S3 link.
SlingShot is used to handle file uploads to Amazon AWS S3.  Your bucket will need a CORS configuration.  Please check out the [Meteor Slingshot project](https://github.com/CulturalMe/meteor-slingshot) for detailed setup info.
