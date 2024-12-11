class QuizzesAPI {
    static createQuiz(userId, title, timeLimit, questionIds) {
        return fetch(
            `http://localhost:8000/create-quiz`, 
            {
                method: "POST",
                mode: "cors",
                headers: { 
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    quiz: {
                        user_id: userId,
                        title: title,
                        time_limit: timeLimit,
                        question_ids: questionIds
                    } 
                })
            }
        )
    }

    static addQuestionToQuiz(quizId, questionId) {
        return fetch(
            `http://localhost:8000/add-question-to-quiz`, 
            {
                method: "POST",
                mode: "cors",
                headers: { 
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    quiz_id: quizId,
                    question_id: questionId
                })
            }
        )
    }

    static deleteQuestionFromQuiz(quizId, questionId) {
        return fetch(
            `http://localhost:8000/delete-question-from-quiz`, 
            {
                method: "POST",
                mode: "cors",
                headers: { 
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    quiz_id: quizId,
                    question_id: questionId
                })
            }
        )
    }

    static editQuiz(quizId, title, timeLimit) {
        return fetch(
            `http://localhost:8000/edit-quiz`, 
            {
                method: "POST",
                mode: "cors",
                headers: { 
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    quiz: {
                        quiz_id: quizId,
                        title: title,
                        time_limit: timeLimit
                    }
                })
            }
        )
    }

    static deleteQuiz(quizId) {
        return fetch(
            `http://localhost:8000/delete-quiz`, 
            {
                method: "POST",
                mode: "cors",
                headers: { 
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    quiz_id: quizId
                })
            }
        )
    }

    static getAllQuiz(userId) {
        return fetch(
            `http://localhost:8000/get-all-quiz?user_id=${userId}`, 
            {
                method: "GET",
                mode: "cors"
            }
        )
    }

    static getAttendedQuiz(userId) {
        return fetch(
            `http://localhost:8000/get-attended-quiz?user_id=${userId}`, 
            {
                method: "GET",
                mode: "cors"
            }
        )
    }

    static getUnattendedQuiz(userId) {
        return fetch(
            `http://localhost:8000/get-unattended-quiz?user_id=${userId}`, 
            {
                method: "GET",
                mode: "cors"
            }
        )
    }

    static getDetailedQuiz(quizId) {
        return fetch(
            `http://localhost:8000/get-detailed-quiz?quiz_id=${quizId}`, 
            {
                method: "GET",
                mode: "cors"
            }
        )
    }
}

export default QuizzesAPI