import React from 'react'
import Button from './Button'
import he from 'he'
import Background from './Background'
import { useNavigate } from 'react-router-dom'

export default function Quiz({ questions }) {

    const navigate = useNavigate()
    const [selectedAnswers, setSelectedAnswers] = React.useState(Array(questions.length).fill({
        answerIndex: '',
        text: ''
    }))
    const [displayResults, setDisplayResults] = React.useState(false)
    const [totalPoints, setTotalPoints] = React.useState(0)
    
    function handleClick(questionIndex, answerIndex, answerArray) {
        setSelectedAnswers(prevSelectedAnswers => {
            const newSelectedAnmswers = [...prevSelectedAnswers]
            newSelectedAnmswers[questionIndex] = {
                answerIndex: answerIndex, 
                text: he.decode(answerArray[answerIndex])
            }
            return newSelectedAnmswers
        })
    }

    
    function verifyAnswers() {
        if (!displayResults) {
            for (let index = 0; index < questions.length; index++) {
                selectedAnswers[index].text === he.decode(questions[index].correct_answer) ? setTotalPoints(prevValue => prevValue + 20): setTotalPoints(prevValue => prevValue)       
            }
            setDisplayResults(true)
        } else {
          
            navigate('/')

        }
    }

    // style={{backgroundColor: isSelected ? 'rgba(214, 219, 245, 1)' : 'rgba(245, 247, 251, 1)'}}

    const myQuestions = questions.map((question, questionIndex) => {
        const answerArray = [...question.incorrect_answers, question.correct_answer]
        const myAnswers = answerArray.map((answer, answerIndex) => {
            const isSelected = selectedAnswers[questionIndex].answerIndex === answerIndex
            

            const styleMaster = () => {

                if (!displayResults) {
                    if (isSelected) {
                        return 'rgba(214, 219, 245, 1)'
                    }
                } else {
                    if (isSelected && selectedAnswers[questionIndex].text === he.decode(questions[questionIndex].correct_answer) || he.decode(answer) === he.decode(question.correct_answer)) {
                        return 'rgba(148, 215, 162, 1)'
                    } else if (isSelected && !(selectedAnswers[questionIndex].text === he.decode(questions[questionIndex].correct_answer))) {
                        return 'rgba(248, 188, 188, 1)'
                    }
                }
            } 
            
            // Return del map sulle answers



            return (
                <div 
                    className='answer'
                    onClick={() => handleClick(questionIndex, answerIndex, answerArray)} 
                    style={{backgroundColor: styleMaster()}}>
                        {he.decode(answer)}
                </div>
            )
        })

        // Return del map sulle questions

        return (
            <div className='question--container'>
                <p className='question'>{he.decode(question.question)}</p>
                <div className='answers--container'>
                    {myAnswers}
                </div>
            </div> 
        )
      })
    
    // Return del componente Quiz()

    return (
        <Background>
            {myQuestions}
            <div className="display--results">
                {displayResults ? <p className='result'>You scored {totalPoints} points!</p> : ''}
                <Button 
                    text={displayResults ? "Play again" : "Check answers"}
                    style={{
                        width: "120px",
                        height: "35px",
                        fontSize: "10px",
                        marginTop: displayResults ? '' : '60px'
                    }}
                    onClick={verifyAnswers}     
                />
            </div>
        </Background>    
    )
}
