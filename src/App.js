import React from 'react'
import Quiz from './components/Quiz'
import Home from './components/Home'
import he from 'he'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Background from './components/Background'

export default function App() {

  // Definition of states

  const [questionsAndAnswers, setQuestionsAndAnswers] = React.useState({
    questions: null,
    answers: null
  })

  const [isLoading, setIsLoading] = React.useState(false)

  // Definition of the function to fetch data from the server and start the quiz

  const startQuiz = async () => {
    const response = await fetch('https://opentdb.com/api.php?amount=5')
    const data = await response.json()
    
    if (data.response_code !== 0) {
      setIsLoading(true)
      startQuiz()
    } else {
      setIsLoading(false)
      const answerArraySet = data.results.map(question => {
        const answers = [...question.incorrect_answers]
        const randomNumber = Math.trunc(Math.random() * (answers.length + 1))
        answers.splice(randomNumber, 0, question.correct_answer)                
        return answers
      })
      setQuestionsAndAnswers({
        questions: data.results,
        answers: answerArraySet
      })
    }
  }

  // Return of the component App

  return (
    <Router>
      <div className='main--container'>
        <Routes> 
          <Route path='/' element={<Home startQuiz={startQuiz} />} />
          <Route path='/quizzes' element={isLoading ?             
            <Background>
              <div className='loading'>Loading...</div>
            </Background>
             : 
            <Quiz questionsAndAnswers={questionsAndAnswers} startQuiz={startQuiz} />} />
        </Routes>
      </div>
    </Router> 
  )
}


