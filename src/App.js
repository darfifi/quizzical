import React from 'react'
import Quiz from './components/Quiz'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

export default function App() {

  const [questions, setQuestions] = React.useState([])
 
  return (
    <Router>
      <div className='main--container'>
        <Routes> 
          <Route path='/' element={<Home setQuestions={setQuestions} />} />
          <Route path='/quizzes' element={<Quiz questions={questions} />} />
        </Routes>
      </div>
    </Router>
    
  );
}


