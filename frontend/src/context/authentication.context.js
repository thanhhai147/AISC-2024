import { createContext, useContext, useState, useEffect } from 'react';
import { setCookie, getCookie, deleteCookie } from "../utils/cookies.util"
import UserAPI from '../api/user.api';

const AuthContext = createContext(null);

const handleGetUser = async (userId) => {
  if (userId) {
    try {
      const response = await UserAPI.getUser(userId)
      const data = await response.json()
      if (!data.success) return null
      else return ({
        "username": data?.data?.user_name,
        "emailPhoneNumber": data?.data?.email_phone_number,
        "password": data?.data?.password,
        "role": data?.data?.role,
        "avatar": data?.data?.avatar
      })
    } catch (err) {
      throw err
    }
  }
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (getCookie("user_id")) return true
    return false
  });
  const [userId, setUserId] = useState(() => getCookie("user_id"))
  const [user, setUser] = useState(null)
  const [questions, setQuestions] = useState([]);  // Thêm state để lưu câu hỏi

  const [context, setContext] = useState('')
  useEffect(() => {

    if (!userId) {
      setUser(null)
      return
    }

    UserAPI.getUser(userId)
    .then(response => response.json())
    .then(data => {
      if(!data.message) setUser(null)
      else setUser({
        "username": data?.data?.user_name,
        "emailPhoneNumber": data?.data?.email_phone_number,
        "password": data?.data?.password,
        "role": data?.data?.role,
        "avatar": data?.data?.avatar === "None" ? null : data?.data?.avatar
      })
    })
    .catch(error => {
      throw error
    })
  }, [userId])

  // Cập nhật câu hỏi trong context
  const setGeneratedQuestions = (newQuestions) => {
    setQuestions(newQuestions);
  };

  const setGeneratedContext = (context) =>{
    setContext(context);
  }

  // Xóa câu hỏi trong context
  const clearQuestions = () => {
    setQuestions([]);
  };

  const login = (userId) => {
    setCookie('user_id', userId, 3)
    setUserId(userId)
    
    setIsAuthenticated(true)
  };
  const logout = () => {
    deleteCookie('user_id')
    setUserId(null)

    setIsAuthenticated(false);
    clearQuestions(); 
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, user, login, logout, setUserId, setUser, questions, setGeneratedQuestions, clearQuestions, context, setGeneratedContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
