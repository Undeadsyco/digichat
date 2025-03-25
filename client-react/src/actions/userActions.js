import authAxios from "./authAxios";

const userBaseUrl = "/api/users";
const friendsBaseUrl = `${userBaseUrl}/friends`;
const requestsBaseUrl = `${userBaseUrl}/requests`;
const blockBaseUrl = `${userBaseUrl}/block`;

/**
 * @typedef {Object} actionoObj
 * @property {string} key
 * @property {function} action
 *
 * @typedef {Object.<string, actionoObj>} userActions
 *
 * @type {userActions}
 */
const userActions = {
  /**
   * 
   * @returns
   */
  getUsers: async () => {
    const req = await authAxios.get(`${userBaseUrl}`);
    const res = await req.data;
    return { type: 'GET_USERS_SUCCESS', payload: res.users };
  },
  // TODO: implement get user profile
  getUser: async (userId) => {
    const req = await authAxios.get(`${userBaseUrl}/${userId}`);
    const res = await req.data;
    return res.user;
  },
  /**
   * 
   * @returns 
   */
  getRelationships: async () => {
    const req = await authAxios.get(`${friendsBaseUrl}`);
    const res = await req.data;
    return res.relationships;
  },
  /**
   * 
   * @returns 
   */
  getIncoming: async () => {
    const req = await authAxios.get(`${requestsBaseUrl}/incoming`);
    const res = await req.data;
    return res.incoming;
  },
  /**
   * 
   * @returns 
   */
  getOutgoing: async () => {
    const req = await authAxios.get(`${requestsBaseUrl}/outgoing`);
    const res = await req.data;
    return res.outgoing;
  },
  // TODO: implement send friend request
  /**
   * 
   * @param {Object} data
   * @param {string} data.type
   * @param {(number|string)} data.id 
   * @returns 
   */
  sendRequest: async ({ type, id }) => {
    if ((await authAxios.get(`api/${type}/requests/send/${id}`)).status !== 200) {
      setTimeout(() => { alert('Failed to add friend') }, 100);
      return;
    }
    return { type: 'SEND_REQUEST_SUCCESS', payload: id };
  },
  // TODO: implement accept friend request
  /**
   * 
   * @param {(number|string)} addresseeId 
   * @returns 
   */
  acceptRequest: async (addresseeId) => {
    if ((await authAxios.get(`${requestsBaseUrl}/accept/${addresseeId}`)).status !== 200) {
      setTimeout(() => { alert('Failed to accept friend') }, 100);
      return;
    }
    return { type: 'ACCEPT_REQUEST_SUCCESS', payload: addresseeId };
  },
  // TODO: implement reject friend request
  /**
   * 
   * @param {(number|string)} addresseeId 
   * @returns 
   */
  rejectRequest: async (addresseeId) => {
    if ((await authAxios.get(`${requestsBaseUrl}/reject/${addresseeId}`)).status !== 200) {
      setTimeout(() => { alert('Failed to reject friend') }, 100);
      return;
    }
    return { type: 'REJECT_REQUEST_SUCCESS', payload: addresseeId };
  },
  // TODO: implement confirm friend request
  /**
   * 
   * @param {(number|string)} addresseeId 
   * @returns 
   */
  confirmRequest: async (addresseeId) => {
    const req = await authAxios.get(`${requestsBaseUrl}/confirm/${addresseeId}`);
    const res = await req.data;
    if (!res.status) {
      setTimeout(() => { alert('Failed to confirm notice') }, 100);
      return;
    }
    return { type: 'CONFIRM_REQUEST_SUCCESS', payload: { userId: addresseeId, status: res.status } };
  },
  // TODO: implement delete request
  /**
   * 
   * @param {(number|string)} addresseeId 
   * @returns 
   */
  deleteRequest: async (addresseeId) => {
    if ((await authAxios.delete(`${requestsBaseUrl}/delete/${addresseeId}`)).status !== 200) {
      setTimeout(() => { alert('Failed to delete request') }, 100);
      return;
    }
    return { type: 'DELETE_REQUEST_SUCCESS', payload: addresseeId };
  },
  // TODO: implement delete friend
  /**
   * 
   * @param {(number|string)} addresseeId 
   * @returns 
   */
  deleteFriend: async (addresseeId) => {
    if ((await authAxios.get(`${friendsBaseUrl}/delete/${addresseeId}`)).status !== 200) {
      setTimeout(() => { alert('Failed to delete friend') }, 100);
      return;
    }
    return { type: 'DELETE_FRIEND_SUCCESS', payload: addresseeId };
  },
  // TODO: implement block user
  /**
   * 
   * @param {(number|string)} addresseeId 
   * @returns 
   */
  blockUser: async (addresseeId) => {
    if ((await authAxios.get(`${blockBaseUrl}/create/${addresseeId}`)).status !== 200) {
      setTimeout(() => { alert('Failed to block user') }, 100);
      return;
    }
    return { type: 'BLOCK_USER_SUCCESS', payload: addresseeId };
  },
  // TODO: implement unblock user
  /**
   * 
   * @param {(number|string)} addresseeId 
   * @returns 
   */
  unblockUser: async (addresseeId) => {
    if ((await authAxios.get(`${blockBaseUrl}/delete/${addresseeId}`)).status !== 200) {
      setTimeout(() => { alert('Failed to unblock user') }, 100);
      return;
    }
    return { type: 'UNBLOCK_USER_SUCCESS', payload: addresseeId };
  }
}

export default userActions;