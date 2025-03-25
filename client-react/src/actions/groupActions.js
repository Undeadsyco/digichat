import authAxios from "./authAxios";

const baseGroupUrl = "/api/groups", baseMembershipUrl = `${baseGroupUrl}/membership`;

/**
 * @typedef {Object} actionoObj
 * @property {string} key
 * @property {function} action
 *
 * @typedef {Object.<string, actionoObj>} groupActions
 *
 * @type {groupActions}
 */
const groupActions = {
  createGroup: async (group) => {
    const req = await authAxios.post(`${baseGroupUrl}`, group);
    const res = await req.data;
    return res.group;
  },
  getGroups: async () => {
    const req = await authAxios.get(`${baseGroupUrl}`);
    const res = await req.data;
    return res.groups.reverse();
  },
  // TODO: implement get group profile
  getGroup: async (groupId) => {
    const req = await authAxios.get(`${baseGroupUrl}/${groupId}`);
    const res = await req.data;
    return res.group;
  },
  // TODO: implement edit group desctiprion
  editGroup: async ({ groupId, description }) => {
    if ((await authAxios.put(`${baseGroupUrl}/${groupId}`, { description })).status !== 200) {
      setTimeout(() => alert('was unable to edit group'), 100);
      return;
    }
    return { groupId, description };
  },
  // TODO: implement delete group
  deleteGroup: async (groupId) => {
    if ((await authAxios.delete(`${baseGroupUrl}/${groupId}`)).status !== 200) {
      setTimeout(() => alert('was unable to delete group'), 100);
      return;
    }
    return groupId;
  },
  // TODO: implement send group request
  // TODO: implement cancel group request
  // TODO: implement accept group request
  // TODO: implement reject group request
  joinGroup: async (groupId) => {
    if ((await authAxios.post(`${baseMembershipUrl}/join/${groupId}`)).status !== 201) {
      setTimeout(() => alert('was unable to join group'), 100);
      return;
    }
    return groupId;
  },
  // TODO: implement remove user
  removeUser: async ({ groupId, userId }) => {
    if ((await authAxios.delete(`${baseMembershipUrl}/remove/${groupId}/${userId}`)).status !== 200) {
      setTimeout(() => alert('was unable to remove user'), 100);
      return;
    }
    return userId;
  },
  // TODO: implement promote user
  promoteUser: async ({ groupId, userId }) => {
    if ((await authAxios.put(`${baseMembershipUrl}/promote/${groupId}/${userId}`, { role: 'admin' })).status !== 200) {
      setTimeout(() => alert('was unable to promote user'), 100);
      return;
    }
    return userId;
  },
  // TODO: implement demote user
  demoteUser: async ({ groupId, userId }) => {
    if ((await authAxios.put(`${baseMembershipUrl}/demote/${groupId}/${userId}`, { role: 'member' })).status !== 200) {
      setTimeout(() => alert('was unable to demote user'), 100);
      return;
    }
    return userId;
  },
  // TODO: implement transfer ownership
  transferOwnership: async ({ groupId, userId }) => {
    if ((await authAxios.put(`${baseMembershipUrl}/transfer/${groupId}/${userId}`)).status !== 200) {
      setTimeout(() => alert('was unable to transfer ownership'), 100);
      return;
    }
    return userId;
  },
}


export default groupActions;