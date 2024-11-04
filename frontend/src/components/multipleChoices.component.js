import React, { useState, useEffect } from "react";
import TextInput from "./textInput.component";
import '../assets/css/multipleChoices.css'

const basicChoice = (label, context) => (
    <div className="choice font-family-regular">
        <div className="choice-label mr-2">{label}.</div>
        <div>{context}</div>
    </div>
);

const examChoice = (label, context, status, setSelected) => (
    <div 
        className="choice font-family-regular exam-margin-bottom"
        onClick={() => setSelected(label)} 
    >
        <div 
            className={`
                choice-label choice-label-exam
                ${
                    status === 'selected' ? 
                    'choice-exam-selected' :
                    status === 'right' ? 
                    'choice-exam-right' :
                    status === 'wrong' ? 
                    'choice-exam-wrong' : '' 
                }
            `}
        >
            {label}
        </div>
        <div className="choice-exam">{context}</div>
    </div>
);

const editChoice = (label, context) => (
    <div className="edit-margin-top">
        <TextInput 
            uneditable={label + ". "}
            defaultValue={context}
        /> 
    </div> 
);

export default function MultipleChoices({type, A, B, C, D, rightAnswer, wrongAnswer}) {
    const [selected, setSelected] = useState(null);
    const [choiceStatus, setChoiceStatus] = useState(() => {
        if (type === 'exam') return {
            'A': 'none',
            'B': 'none',
            'C': 'none',
            'D': 'none'
        };

        if (type === 'review') return {
            'A': rightAnswer === 'A' ? 'right' : wrongAnswer === 'A' ? 'wrong' : 'none',
            'B': rightAnswer === 'B' ? 'right' : wrongAnswer === 'B' ? 'wrong' : 'none',
            'C': rightAnswer === 'C' ? 'right' : wrongAnswer === 'C' ? 'wrong' : 'none',
            'D': rightAnswer === 'D' ? 'right' : wrongAnswer === 'D' ? 'wrong' : 'none',
        };
    });

    useEffect(() => {
        if (type === 'exam') {
            setChoiceStatus({
                'A': selected === 'A' ? 'selected' : 'none',
                'B': selected === 'B' ? 'selected' : 'none',
                'C': selected === 'C' ? 'selected' : 'none',
                'D': selected === 'D' ? 'selected' : 'none'
            });
        }
    }, [selected]);
 
    return (
        <div className="multiple-choices">
            {type === 'exam' || type === 'review' ? 
                examChoice('A', A, choiceStatus['A'], setSelected) :
                type === 'edit' ?
                editChoice('A', A) :
                basicChoice('A', A)
            }
            {type === 'exam' || type === 'review' ? 
                examChoice('B', B, choiceStatus['B'], setSelected) :
                type === 'edit' ?
                editChoice('B', B) :
                basicChoice('B', B)
            }
            {type === 'exam' || type === 'review' ? 
                examChoice('C', C, choiceStatus['C'], setSelected) :
                type === 'edit' ?
                editChoice('C', C) :
                basicChoice('C', C)
            }
            {type === 'exam' || type === 'review' ? 
                examChoice('D', D, choiceStatus['D'], setSelected) :
                type === 'edit' ?
                editChoice('D', D) :
                basicChoice('D', D)
            }
        </div>
    );
}
