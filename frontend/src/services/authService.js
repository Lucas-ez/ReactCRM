import jwt_decode from "jwt-decode";
import { apiUrl } from  './../config.json'
import httpService from "./httpService";

const jwtKey = "token"

export const login = async (username, password) => {
  // Validacion
  const response = await httpService.post(`${apiUrl}/api/auth/login`, {
    'username' : username,
    'password': password
  }).then(res => {
      sessionStorage.setItem(jwtKey, res.data)
      return { isOk: true }
    })
    .catch(err => ({
      isOk: false,
      error: err.response.data
    }))

  return response
}

export const logout = async () => {
  sessionStorage.removeItem(jwtKey)
}

export const getCurrentUser = () => {
  try {
    const jwt = sessionStorage.getItem(jwtKey);
    return jwt_decode(jwt)
  } catch (ex) {
    return null;
  }
}

export default { getCurrentUser, login, logout }