class QuizAPI {    
    static getDetailedQuiz(quiz_id) {
        return fetch(
            `http://localhost:8000/get-detailed-quiz?quiz_id=${quiz_id}`, 
            {
                method: "GET",
                mode: "cors"    
            }
        )
    }

}

export default QuizAPI