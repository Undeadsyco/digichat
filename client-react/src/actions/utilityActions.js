import axios from "axios";
import authAxios from "./authAxios";

const baseUrl = '/api';

/**
 * @typedef {Object} actionoObj
 * @property {string} key
 * @property {function} action
 *
 * @typedef {Object.<string, actionoObj>} utilActions
 *
 * @type {utilActions}
 */
const utilActions = {
  verifyLogin: async () => {
    try {
      const req = await authAxios.get(`${baseUrl}/verify`, { signal: new AbortController().signal });
      const res = await req.data;
      if (!req.status || req.status !== 200) {
        setTimeout(() => { alert('Must Login Again') }, 100);
        localStorage.removeItem('user');
        return;
      }
      return res.user;
    } catch (error) {

    }
  },
  login: async (user) => {
    const req = await axios.post(`${baseUrl}/login`, { user }, { signal: new AbortController().signal });
    const res = await req.data;
    if (!req.status || req.status !== 200) {
      setTimeout(() => { alert('Login Failed') }, 100);
      return;
    }
    return res.user;
  },
  signup: async (user) => {
    const req = await axios.post(`${baseUrl}/signup`, { user }, { signal: new AbortController().signal });
    const res = await req.data;
    if (!req.status || req.status !== 200) {
      setTimeout(() => { alert('Signup Failed') }, 100);
      return;
    }
    return res.user;
  },
  logout: async () => {
    try {
      if ((await authAxios.get(`${baseUrl}/logout`)).status !== 200) {
        setTimeout(() => { alert('Logout Failed') }, 100);
        return;
      }
      localStorage.removeItem('user');
      return;
    } catch (error) {

    }
  }
}

export default utilActions;