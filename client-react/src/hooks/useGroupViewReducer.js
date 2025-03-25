import { useReducer } from "react";
import { groupActions } from "../actions";

/**
 * @typedef {Object} state
 * @property {boolean} loading
 * @property {Array} groups
 */

/** @type {state} */
const initialState = {
  loading: true,
  groups: [],
}

/**
 * @param {state} state
 * @param {{ type: string, payload: any }} action
 * @returns {state}
 */
const reducer = (state, action) => {
  switch (action.type) {
    case "GET_GROUPS_SUCCESS": return {
      ...state,
      loading: false,
      groups: action.payload,
    };
    case "CREATE_GROUP_SUCCESS": return {
      ...state,
      loading: false,
      groups: [action.payload, ...state.groups],
    };

    default: return { ...state }
  }
}

const useGroupViewReducer = ({ onSetError, onCloseModal }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = {
    onCreateGroup: async (values, actions) => {
      actions.setSubmitting(true);
      try {
        groupActions.createGroup(values).then(group => {
          if (!group) throw new Error('Group creation failed');
          dispatch({ type: 'CREATE_GROUP_SUCCESS', payload: group });
          onCloseModal();
        }).catch(err => { throw err; });
      } catch (error) {
        onSetError(error);
      } finally {
        actions.resetForm();
        actions.setSubmitting(false);
      }
    },
    onGetGroups: async (callback) => {
      try {
        const groups = await callback()
        if (!groups) return onSetError('No groups found');
        dispatch({ type: 'GET_GROUPS_SUCCESS', payload: groups });
      } catch (err) {
        onSetError(err);
      }
    }
  }

  return { state, actions }
}

export default useGroupViewReducer;
