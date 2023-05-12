# wordOfTheDay

With this repo and some slack configurations you can get a nice Slack bot. 
You call it in a slack channel by typing `/NameOfYourSlackApp`.
The bot will help you to build a nice post to define a Word Of The Day.

![image](https://github.com/AlexStotch/wordOfTheDay/assets/32511699/0622081d-e460-4007-ae8b-20d7ac16fe2f)


### 1- Create your Slack app and set up the App manifest
You can check this documentation to configure slack app: https://api.slack.com/authentication/basics 
You will need create a set the App manifest and to configure it this way:

```
display_information:
  name: WordOfTheDay
  description: Send a message with a random word and a gif
  background_color: "#da3a79"
  long_description: ""
features:
  bot_user:
    display_name: WordOfTheDay
    always_online: true
  slash_commands:
    - command: /wordoftheday
      description: Create a new wordOftheDay post
      should_escape: false
oauth_config:
  redirect_urls:
    - https://example.com/slack/auth
  scopes:
    bot:
      - commands
      - channels:read
      - channels:history
      - chat:write
      - chat:write.public
      - groups:read
      - groups:history
      - app_mentions:read
      - mpim:read
      - im:read
settings:
  event_subscriptions:
    bot_events:
      - app_mention
  interactivity:
    is_enabled: true
  org_deploy_enabled: false
  socket_mode_enabled: true
  token_rotation_enabled: false
```

### 2- Generate and provide Slack's tokens

There some tokens that you need to provide in order to make the app works. 
You can find these token in the general settings of you slack application.
- signingSecret: App-Level Tokens
- appToken: Signing Secret
- token: Bot User OAuth Token

### 3 - Generate and provide Giphy's token

Finaly. You will need to get a Giphy API key, and add it to the API call.
In `getGif.js` change by you Giphy api key.

### Start 
In the server foler you can run `docker-compose up`
And run the command `/NameOfYourSlackApp` in a slack channel
