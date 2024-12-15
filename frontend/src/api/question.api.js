class QuestionAPI {
    static uploadImages(files) {
        const formData = new FormData();
    
        // Thêm các file vào FormData
        files.forEach((file) => {
            formData.append("files", file);
        });
    
        return fetch(`http://localhost:8000/upload-files`, {
            method: "POST",
            mode: "cors",
            headers: {
                // Không cần chỉ định `Content-Type`, trình duyệt tự động đặt khi sử dụng FormData
            },
            body: formData,
        });
    }

    static generateQuestions(files, isExternalSearch) {
        // Tạo đối tượng chứa dữ liệu mà bạn muốn gửi
        const requestBody = {
            isExternalSearch: isExternalSearch,
            files: files.map(file => ({
                file_name: file.file_name,      // Tên tệp
                file_size_mb: file.file_size_mb,       // Loại tệp
                file_content: file.file_content // Dữ liệu base64 của tệp
            }))
        };
    
        // Chuyển đối tượng thành JSON
        const jsonData = JSON.stringify(requestBody);
 
        // Gửi yêu cầu POST
        return fetch(`http://localhost:8000/generate-questions`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json", // Chỉ định Content-Type là JSON
            },
            body: jsonData, // Gửi dữ liệu JSON
        });
    }

    static addQuestion(question_bank_id, questions) {
        // Tạo đối tượng chứa dữ liệu mà bạn muốn gửi
        const requestBody = {
            question_bank_id: question_bank_id,
            questions: questions
        };
        // Chuyển đối tượng thành JSON
        const jsonData = JSON.stringify(requestBody);
      
        // Gửi yêu cầu POST
        return fetch(`http://localhost:8000/add-questions`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json", // Chỉ định Content-Type là JSON
            },
            body: jsonData, // Gửi dữ liệu JSON
        });
    }
    
    static modifyHandcraftedQuestion(question) {
        // Tạo đối tượng chứa dữ liệu mà bạn muốn gửi
        const requestBody = {
            question:question
        };
    
        // Chuyển đối tượng thành JSON
        const jsonData = JSON.stringify(requestBody);
 
        // Gửi yêu cầu POST
        return fetch(`http://localhost:8000/modify-question-handcrafted`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json", // Chỉ định Content-Type là JSON
            },
            body: jsonData, // Gửi dữ liệu JSON
        });
    }

    static modifyChatBotQuestion(question, context, edit_request) {
        // Tạo đối tượng chứa dữ liệu mà bạn muốn gửi
        const requestBody = {
            question:question,
            context:context,
            edit_request:edit_request
        };
    
        // Chuyển đối tượng thành JSON
        const jsonData = JSON.stringify(requestBody);
    
        // Gửi yêu cầu POST
        return fetch(`http://localhost:8000/modify-question-chatbot`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json", // Chỉ định Content-Type là JSON
            },
            body: jsonData, // Gửi dữ liệu JSON
        });
    }

    static createQuestionBank(user_id, title, context) {
        // Tạo đối tượng chứa dữ liệu mà bạn muốn gửi
        const requestBody = {
            user_id: user_id,
            title: title,
            context: context
        };
    
        // Chuyển đối tượng thành JSON
        const jsonData = JSON.stringify(requestBody);
        // Gửi yêu cầu POST
        return fetch(`http://localhost:8000/create-question-bank`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json", // Chỉ định Content-Type là JSON
            },
            body: jsonData, // Gửi dữ liệu JSON
        });
    }

    static getAllQuestionBank(user_id) {
        return fetch(
            `http://localhost:8000/get-question-banks?user_id=${user_id}`, 
            {
                method: "GET",
                mode: "cors"
            }
        )
    }
    
    static getDetailedQuestionBank(question_bank_id) {
        return fetch(
            `http://localhost:8000/get-detail-question-bank?question_bank_id=${question_bank_id}`, 
            {
                method: "GET",
                mode: "cors"    
            }
        )
    }
    
    static getDetailedQuestion(question_id) {
        return fetch(
            `http://localhost:8000/get-detail-question?question_id=${question_id}`, 
            {
                method: "GET",
                mode: "cors"    
            }
        )
    }

}

export default QuestionAPI