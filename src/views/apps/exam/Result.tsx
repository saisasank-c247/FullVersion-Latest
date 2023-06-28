import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import 'font-awesome/css/font-awesome.min.css';
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

const apiData = [
    {
        "id": 1,
        "question": "What is Html? ",
        "options": [{ "id": 1, "label": "HighText Machine Language" },
        { "id": 2, "label": "HyperText and links Markup Language" },
        { "id": 3, "label": "HyperText Markup Language", "correct": true },
        { "id": 4, "label": "None of these" }],
        "selectedOption": 3
    },
    {
        "id": 2,
        "question": "What is CSS?",
        "options":
            [{ "id": 1, "label": "Cascade style sheets" },
            { "id": 2, "label": "Color and style sheets" },
            { "id": 3, "label": "Cascading style sheets", "correct": true },
            { "id": 4, "label": "None of these" }],
        "selectedOption": 1
    },
    {
        "id": 3,
        "question": "What is JavaScript?",
        "options":
            [{ "id": 1, "label": "JavaScript is a scripting language used to make the website interactive", "correct": true },
            { "id": 2, "label": "JavaScript is an assembly language used to make the website interactive" },
            { "id": 3, "label": "JavaScript is a compiled language used to make the website interactive" },
            { "id": 4, "label": "None of these" }],
        "selectedOption": 2
    }];
const Result = (props: any) => {
    const [questions, setQuestions]: any = React.useState([]);
    const [crctcount, setCrctcount] = React.useState([]);

    useEffect(() => {
        let updval: any = apiData.map((question: any) => {
            return {
                question: question.question,
                correct: question?.options?.find((x: any) => x.correct)['id'] == question.selectedOption
            }
        })
        console.log(updval)
        setQuestions(updval)
        let correctque = updval.filter((updval: any) => updval.correct == true);
        console.log(correctque)
        let correct_length = correctque.length
        setCrctcount(correct_length)
        console.log("length of correct questions:", correct_length)
        let totalques = updval.length;
        console.log("Length of total questions:", totalques)
        console.log(correct_length + "/" + totalques)
    }, []);
    return (
        <>
            <h1>RESULT</h1>
            <h3>{crctcount}/{questions.length}</h3>
            <p>{questions.map((questionId: any, questionIndex: number) => {
                return (
                    <div key={"q-" + questionIndex}>
                        <span>{"Q" + (questionIndex + 1) + ". "}</span>
                        <span>{questionId?.question}</span>
                        {questions[questionIndex]?.correct ? <FontAwesomeIcon icon={faCheck} style={{color: "#3c8316",marginLeft:"5px"}} />:
                             <FontAwesomeIcon icon={faXmark} style={{color: "#ff2b05",marginLeft:"5px"}} />}
                        {/* {
                            questionId.options.map((optionId, optionIndex) => {
                                return (
                                    <div key={"opt-"+questionIndex+"-"+optionIndex}>
                                        <input type="radio" id={optionId.id} name={optionId.name} onChange={() => handleChange(optionId.id, optionIndex, questionId.id)} />
                                        <label>{optionId.label}</label>
                                    </div>
                                )
                            })
                        } */}


                    </div>
                )

            })}
            </p>
            <button type="submit">Submit</button>
        </>
    )
}
export default Result;
