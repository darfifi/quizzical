GENERAL DESCRIPTION AND INFORMATION

This project consists in a web app that wants to simulate a quiz game. 
Every card has 5 quizzes with multiple possible answers. 
Data is retrived from an external server (Open Trivia Database). The following path is for the access to the database

https://opentdb.com/api_config.php

The UI has been taken from figma.com 

For this project the library React.js was used with the following main features:

- useState
- he package
- BrowserRouter
- useNavigate

This App is the result of an intermediate level of knowledge of React.js

STRUCTURE OF THE PROJECT

The App consists of two pages:

- a first page (when the app is run) where we can find the title of the app, a brief description and a button that can start the fetching process to retrieve the first set of questions from the database. The amount of questions is fixed at 5.

<img src="/src/readme-images/Readme-first%20page.png" width='500'>


- After the pressing of the Start Button, and after the background process of fetching questions from the server the App lands on the secon page, the main component Quiz.js, that will be rendered with the five questions retrieved from the server and relative answers.

<img src="/src/readme-images/Readme%20-%20second%20page.png" width='500'>

The player has now the possibility of selecting the answer he prefers for each question and then he can start the verification process clicking on the Check Answers Button. At the click on the Check Answers Button a function will be launched to verify all the answers selected by the player with the correct answers retrieved from the server.

<img src="/src/readme-images/Readme-second%20page%20results.png" width='500'>

 Every correct answer selected by the player will increment the score of 20 points for a maximum score of 100 points for all 5 questions guessed. 