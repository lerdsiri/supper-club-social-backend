# Overview

Supper Club Social is a full stack project made as part of the assignment at the coding bootcamp, Integrify Academy, that combines my two passions - cooking and coding. This project envisions a community in which users may sign up to attend lunch or dinner parties organized by other users in the community at their homes. This helps showcase excellent home cooks and connect the community together. And what better way to get to know your neighbors than with food! 

This is a solo project - github automatically added the instructor as a co-contributor who set up the original private repository under Integrify Academy github account for ease of turning in the assignment. The codes were otherwise written independently.

## Links

This git repo contains the backend only.

You may view the frontend code at: https://github.com/lerdsiri/supper-club-social-front-end/tree/siri 
The frontend was launched on Netlify at: https://siri-supper-club-social.netlify.app/ 

The backend was launched on Heroku.

## Tech Stack

Frontend: React, Redux Toolkit, Typescript, CSS, HTML, JavaScript
Backend: Node.js, Express, MongoDB, Mongoose

## REST API

Hosted on Heroku at: https://supper-club-social-backend.herokuapp.com

There are three models - user, event, and conversation. 

Please note that certain routes are not currently being utilized. They may be used to support additional features in the future.

All routes are protected except those related to events. Logged-in user receives a token used to access protected routes. Routes related to events are not protected so that upcoming events can be shown to anyone for marketing purposes.

### user

POST
create user - https://supper-club-social-backend.herokuapp.com/api/v1/users
<br>
log in user - https://supper-club-social-backend.herokuapp.com/api/v1/users/login
<br>
upload profile image - https://supper-club-social-backend.herokuapp.com/api/v1/uploadprofileimg/:userId

GET
retrieve all users - https://supper-club-social-backend.herokuapp.com/api/v1/users
<br>
retrieve one user by Id - https://supper-club-social-backend.herokuapp.com/api/v1/users/:userId

PUT
update one user by Id - https://supper-club-social-backend.herokuapp.com/api/v1/users/:userId
<br>
update list of unread convos by removing read convo - https://supper-club-social-backend.herokuapp.com/api/v1/users/:userId/unreadConversations/:conversationId 
<br>
update user's cart by removing event - https://supper-club-social-backend.herokuapp.com/api/v1/users/:userId/cart/events/:eventId
<br>
update user's list of eventsAsOrganizer by removing event - https://supper-club-social-backend.herokuapp.com/api/v1/users/:userId/eventsAsOrganizer/events/:eventId
<br>
update user's list of eventsAsAttendee by removing event - https://supper-club-social-backend.herokuapp.com/api/v1/users/:userId/eventsAsAttendee/events/:eventId

DELETE
delete user by Id - https://supper-club-social-backend.herokuapp.com/api/v1/users/:userId

PATCH
add event to user's cart - https://supper-club-social-backend.herokuapp.com/api/v1/users/:userId/cart/events/:eventId
<br>
add event to user's list of eventsAsOrganizer - https://supper-club-social-backend.herokuapp.com/api/v1/users/:userId/eventsAsOrganizer/events/:eventId
<br>
add event to user's list of eventsAsAttendee - https://supper-club-social-backend.herokuapp.com/api/v1/users/:userId/eventsAsAttendee/events/:eventId

### event

POST
create an event - https://supper-club-social-backend.herokuapp.com/api/v1/events

GET
retrieve all events - https://supper-club-social-backend.herokuapp.com/api/v1/events
<br>
retrieve an event by Id - https://supper-club-social-backend.herokuapp.com/api/v1/events/:eventId
<br>
retrieve events by city - https://supper-club-social-backend.herokuapp.com/api/v1/events/city/:city
<br>
retrieve events by postal code - https://supper-club-social-backend.herokuapp.com/api/v1/events/postCode/:postCode

PUT
update event by Id - https://supper-club-social-backend.herokuapp.com/api/v1/events/:eventId

DELETE
delete event by Id - https://supper-club-social-backend.herokuapp.com/api/v1/events/:eventId

PATCH
add review to event - https://supper-club-social-backend.herokuapp.com/api/v1/events/:eventId/reviews

### conversation 
(messages grouped by event)

POST
create conversation - https://supper-club-social-backend.herokuapp.com/api/v1/conversations

GET
retrieve all conversations - https://supper-club-social-backend.herokuapp.com/api/v1/conversations
<br>
retrieve conversation by conversation id - https://supper-club-social-backend.herokuapp.com/api/v1/conversations/:conversationId
<br>
retrieve all conversations related an event Id - https://supper-club-social-backend.herokuapp.com/api/v1/conversations/events/:eventId

PUT
update conversation by editing an existing message - https://supper-club-social-backend.herokuapp.com/api/v1/conversations/:conversationId/messages/:messageId
<br>
update conversation by adding a new message - https://supper-club-social-backend.herokuapp.com/api/v1/conversations/:conversationId/users/:userId

DELETE
delete conversation by id - https://supper-club-social-backend.herokuapp.com/api/v1/conversations/:conversationId
