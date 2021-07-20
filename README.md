# letme ask
Developed during the 6th **Next Level Week**, an event promoted by **Rocketseat** between July 20th and 27th. An application exploring the use of **ReactJS** to create a dynamic application aimed at an interaction between users and administrator during a live event through questions.

## Technologies
The project was entirely structured via Typescript, with SASS styling. The authentication of administrators and users took place via Google Firebase.

### Main/Login Screen
<img src="https://github.com/bernard-rodrigues/NLW6-ReactJS/blob/main/screenshots/loginScreen.png" alt="Login Screen"/>

### Admin View

<img src="https://github.com/bernard-rodrigues/NLW6-ReactJS/blob/main/screenshots/adminView.png" alt="Admin View"/>

### User View
<img src="https://github.com/bernard-rodrigues/NLW6-ReactJS/blob/main/screenshots/userView.png" alt="User View"/>

### Authentication Rules (using Realtime Database, by Google Firebase)
The Realtime Database was responsible for managing the rooms and active users, listing the closed rooms, in addition to maintaining the questions and number of likes, from the users' perspective; and highlights, mark as read and delete, from the administrator's perspective.
<img src="https://github.com/bernard-rodrigues/NLW6-ReactJS/blob/main/screenshots/firebaseRules.png" alt="Authentication Rules"/>

### Hook de autenticação de usuários
A shared authentication hook was created through the various screens whose user can or needs to be logged in.
<img src="https://github.com/bernard-rodrigues/NLW6-ReactJS/blob/main/screenshots/authLogin.png" alt="Authentication Hook"/>

**Visite a aplicação:** https://letmeask-1d3e8.web.app/
