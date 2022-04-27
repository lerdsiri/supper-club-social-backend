# Overview

Supper Club Social is a full stack project made as part of the assignment at the coding bootcamp, Integrify Academy, that combines my two passions - cooking and coding. This project envisions a community in which users may sign up to attend lunch or dinner parties organized by other users in the community at their homes. This helps showcase excellent home cooks and connect the community together. And what better way to get to know your neighbors than with food! 

This is a solo project - github automatically added the instructor as a co-contributor who set up the original private repository under Integrify Academy github account for ease of turning in the assignment. The codes were otherwise written independently.

## Links

This git repo contains the backend only.

You may view the frontend code at: https://github.com/lerdsiri/supper-club-social-front-end/tree/siri 
<br>
The frontend was launched on Netlify at: https://siri-supper-club-social.netlify.app/ 

The backend was launched on Heroku.

## Tech Stack

Frontend: React, Redux Toolkit, Typescript, CSS, HTML, JavaScript
<br>
Backend: Node.js, Express, MongoDB, Mongoose

## REST API

Hosted on Heroku at: https://supper-club-social-backend.herokuapp.com

There are three models - user, event, and conversation. 

Please note that certain routes are not currently being utilized. They may be used to support additional features in the future.

All routes are protected except those related to events. Logged-in user receives a token used to access protected routes. Routes related to events are not protected so that upcoming events can be shown to anyone for marketing purposes.
