import React from 'react'
import Button from './Button'
import Background from './Background';
import { useNavigate } from 'react-router-dom'



export default function Home({ startQuiz }) {

    const navigate = useNavigate()

    
    const handleStartQuiz = async () => {
        await startQuiz();
        navigate('/quizzes')
    }


    /*
    function startQuiz() {
        fetch('https://opentdb.com/api.php?amount=5')
          .then(res => res.json())
          .then(data => {
            setQuestions(data.results);
            navigate('/quizzes')
        })
    }
    */
    
    return (
        <Background>
            <h2 className="main--page--title">Quizzical</h2>
            <p className="main--page--free--text">Your quizzes everytime and everywhere</p>
            <Button 
              text="Start quiz"
              style={{
                width: "193px",
                height: "52px",
                fontSize: "16px"
              }}
              onClick={handleStartQuiz}        
            />
        </Background>
    )
}