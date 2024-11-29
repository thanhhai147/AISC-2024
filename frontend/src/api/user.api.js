class UserAPI {
    static login(emalPhoneNumber, password) {
        return fetch(
            `http://localhost:8000/login`, 
            {
                method: "POST",
                mode: "cors",
                headers: { 
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    email_phone_number: emalPhoneNumber || "",
                    password: password || ""  
                })
            }
        )
    }

    static signup(username, emailPhoneNumber, password, role='Basic User') {
        return fetch(
            `http://localhost:8000/signup`, 
            {
                method: "POST",
                mode: "cors",
                headers: { 
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    user: {
                        user_name: username,
                        email_phone_number: emailPhoneNumber,
                        password: password,
                        role: role
                    }
                })
            }
        )
    }

    static logout(userId) {
        return fetch(
            `http://localhost:8000/logout`, 
            {
                method: "POST",
                mode: "cors",
                headers: { 
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({
                    user_id: userId
                })
            }
        )
    }

    static update(userId, username, emailPhoneNumber, password, role, avatar) {
        const formData = new FormData()
        const jsonData = {
            user: {
                user_id: userId,
                username: username,
                email_phone_number: emailPhoneNumber,
                role: role,
                password: password
            }
        }
        formData.append("json", JSON.stringify(jsonData));
        formData.append("avatar", avatar);
        return fetch(
            `http://localhost:8000/update`, 
            {
                method: "POST",
                mode: "cors",
                body: formData
            }
        )
    }

    static getAvatar(avatar) {
        return fetch(
            `http://localhost:8000/get-avatar?avatar=${avatar}`, 
            {
                method: "GET",
                mode: "cors"
            }
        )
    }

    static getUser(userId) {
        return fetch(
            `http://localhost:8000/get-user?user_id=${userId}`, 
            {
                method: "GET",
                mode: "cors"
            }
        )
    }
}

export default UserAPI