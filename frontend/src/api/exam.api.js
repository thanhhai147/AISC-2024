class ExamAPI {
    static updateQuizAttempt(user_id, quiz_id, user_answers) {
        // Tạo đối tượng chứa dữ liệu mà bạn muốn gửi
        const requestBody = {
            user_id: user_id,
            quiz_id: quiz_id,
            user_answers: user_answers
        };
        // Chuyển đối tượng thành JSON
        const jsonData = JSON.stringify(requestBody);
        console.log(requestBody);
        // Gửi yêu cầu POST
        return fetch(`http://localhost:8000/update-quiz-attempt`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json", // Chỉ định Content-Type là JSON
            },
            body: jsonData, // Gửi dữ liệu JSON
        });
    }
    
    
    static getQuizAttempt(attempted_id) {
        return fetch(
            `http://localhost:8000/get-quiz-attempt?attempted_id=${attempted_id}`, 
            {
                method: "GET",
                mode: "cors"    
            }
        )
    }

}

export default ExamAPI