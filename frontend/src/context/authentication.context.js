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

  const login = (userId) => {
    setCookie('user_id', userId, 3)
    setUserId(userId)
    
    setIsAuthenticated(true)
  };
  const logout = () => {
    deleteCookie('user_id')
    setUserId(null)

    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, user, login, logout, setUserId, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
