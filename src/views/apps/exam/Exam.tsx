import { CardContent, Typography, Button, Card } from "@mui/material"
import React, { useEffect, useState } from "react"

const Exam = () => {
    const [click, SetClick] = useState(false)
    const [id, setId] = useState()
    const [value, setValue] = useState([])
    const [error, setError] = useState("")

    const [questions, setQuestions] = useState([
        {
            id: 1,
            question: "What is Html?",
            options: [
                {
                    id: 1,
                    label: "HighText Machine Language"
                },
                {
                    id: 2,
                    label: "HyperText and links Markup Language"
                },
                {
                    id: 3,
                    label: "HyperText Markup Language",
                    correct: true
                },
                {
                    id: 4,
                    label: "None of these"
                }

            ],
        }, {
            id: 2,
            question: "What is CSS?",
            options: [
                {
                    id: 1,
                    label: "Cascade style sheets"
                },
                {
                    id: 2,
                    label: "Color and style sheets"
                },
                {
                    id: 3,
                    label: "Cascading style sheets",
                    correct: true
                },
                {
                    id: 4,
                    label: "None of these",
                },

            ],
        }, {
            id: 3,
            question: "What is JavaScript?",
            options: [
                {
                    id: 1,
                    label: "JavaScript is a scripting language used to make the website interactive",
                    correct: true
                },
                {
                    id: 2,
                    label: "JavaScript is an assembly language used to make the website interactive",
                },
                {
                    id: 3,
                    label: "JavaScript is a compiled language used to make the website interactive",
                },
                {
                    id: 4,
                    label: "None of these"
                },

            ],

        }
    ])

    const handleClick = () => {
        let select = questions.find((question: any) => question.selectedOption == null)
        setError("")
        let b = true;
        if (select !== undefined) {
            b = false;
            console.log("please fill all questions")
            setError("please fill all the questions")
            return;
        }
        console.log(JSON.stringify(questions))
    }

    const handleChange = (optionIndex: any, questionIndex: any) => {
        let defval = questions.map((question: any, index) => {
            if (index == questionIndex)
                question.selectedOption = optionIndex
            return question
        })
        console.log(defval, "dfghjk")
    }
    return (
        <>
            <h2>Exam Form</h2>
            <Card style={{ border: "0px solid", backgroundColor: "white", borderRadius: "25px" }}>
                <CardContent style={{ border: "1px" }}>
                    {questions.map((questionItem, questionIndex) => {
                        return (
                            <div key={"q-" + questionIndex}>
                                <span><b>{"Q" + (questionIndex + 1) + ". "}</b></span>
                                <span><b>{questionItem.question}</b></span>
                                {
                                    questionItem.options.map((option: any, optionIndex) => {
                                        return (
                                            <div key={"opt-" + questionIndex + "-" + optionIndex}>
                                                <input type="radio" id={"" + option.id} name={option.name} onChange={() => handleChange(option.id, optionIndex)} />
                                                <label>{option.label}</label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })}
                    {error ? <div style={{ color: 'red', fontSize: '14px', margin: '5px' }}>{error}</div> : null}
                    <Button variant="contained" style={{ marginTop: "11px" }} size="small" onClick={handleClick}>Submit</Button>
                </CardContent>
            </Card>
        </>
    )
}

export default Exam;