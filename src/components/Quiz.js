import React from 'react'
import Button from './Button'
import he from 'he'
import Background from './Background'


export default function Quiz({ questionsAndAnswers, startQuiz }) {
     
    const [selectedAnswers, setSelectedAnswers] = React.useState(Array(questionsAndAnswers.questions.length).fill({
        answerIndex: '',
        text: ''
    }))
    const [displayResults, setDisplayResults] = React.useState(false)
    const [totalPoints, setTotalPoints] = React.useState(0)
    






    function handleClick(questionIndex, answerIndex) {
        setSelectedAnswers(prevSelectedAnswers => {
            const newSelectedAnmswers = [...prevSelectedAnswers]
            newSelectedAnmswers[questionIndex] = {
                answerIndex: answerIndex, 
                text: questionsAndAnswers.answers[questionIndex][answerIndex]
            }
            return newSelectedAnmswers
        })
    }









    // Definition of the function to reset the previous quiz and to load another one

    const resetQuiz = async () => {
        await startQuiz()
        setDisplayResults(false)
        setTotalPoints(0)
        setSelectedAnswers(Array(questionsAndAnswers.questions.length).fill({
            answerIndex: '',
            text: ''
        }))  
    }

    // Function with double function according to the status of displayResults

    function verifyOrReset() {
        if (!displayResults) {
            let points = 0
            for (let index = 0; index < questionsAndAnswers.questions.length; index++) {
                if (selectedAnswers[index].text === he.decode(questionsAndAnswers.questions[index].correct_answer)) {
                    points += 20
                }       
            }
            setTotalPoints(points)
            setDisplayResults(true)
        } else {
            resetQuiz()
        }
    }

    const myQuestions = questionsAndAnswers.questions.map((question, questionIndex) => {
        const myAnswers = questionsAndAnswers.answers[questionIndex].map((answer, answerIndex) => {
            const isSelected = selectedAnswers[questionIndex].answerIndex === answerIndex
           
            const styleMaster = () => {
                if (!displayResults) {
                    if (isSelected) {
                        return 'rgba(214, 219, 245, 1)'
                    }
                } else {
                    if ((isSelected && selectedAnswers[questionIndex].text === questionsAndAnswers.questions[questionIndex].correct_answer) || answer === question.correct_answer) {
                        return 'rgba(148, 215, 162, 1)'
                    } else if (isSelected && !(selectedAnswers[questionIndex].text === questionsAndAnswers.questions[questionIndex].correct_answer)) {
                        return 'rgba(248, 188, 188, 1)'
                    }
                }
            } 
            
            // Return of map on the answers

            return (
                <div 
                    className='answer'
                    onClick={() => handleClick(questionIndex, answerIndex, questionsAndAnswers.answers[questionIndex])} 
                    style={{backgroundColor: styleMaster()}}>
                        {he.decode(answer)}
                </div>
            )
        })

        // Return of map on the questions

        return (
            <div className='question--container'>
                <p className='question'>{he.decode(question.question)}</p>
                <div className='answers--container'>
                    {myAnswers}
                </div>
            </div> 
        )
      })
    
    // Return of the Quiz() component

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
                        marginTop: displayResults ? '' : '10px'
                    }}
                    onClick={verifyOrReset}     
                />
            </div>
        </Background>    
    )
}
