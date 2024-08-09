import React from 'react'
import Quiz from './components/Quiz'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

export default function App() {

  const [questions, setQuestions] = React.useState([])
  

  const startQuiz = async () => {
    const response = await fetch('https://opentdb.com/api.php?amount=5')
    const data = await response.json()
    setQuestions(data.results);
  }
  
 
  return (
    <Router>
      <div className='main--container'>
        <Routes> 
          <Route path='/' element={<Home startQuiz={startQuiz} />} />
          <Route path='/quizzes' element={<Quiz questions={questions} startQuiz={startQuiz}/>} />
        </Routes>
      </div>
    </Router> 
  )
}


