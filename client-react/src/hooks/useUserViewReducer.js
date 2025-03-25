import { useReducer } from 'react';

/**
 * @typedef {Object} State
 * 
 */
/** @type {State} */
const initialState = {
  // friends: [],
  // incoming: [],
  // outgoing: [],
}

/**
 * @params {State} state
 * @params {{ type: string, payload: any }} action
 * @returns {State}
 */
const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'GET_ALL': return {
      ...state,
      [payload.title]: payload.data
    };

    default:
      return state;
  }
}

/**
 * @returns {State}
 */
const useUserViewReducer = ({ onSetRedirect, onSetError }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = {
    getAll: async (title, callback) => {
      try {
        const data = await callback();
        if (!data) throw new Error(`was unable to get ${title}`);
        dispatch({ type: 'GET_ALL', payload: { title, data } })
      } catch (err) {
        onSetError(err);
      }
    },
  }

  return { state, actions };
}

export default useUserViewReducer;

// onGetUsers: () => {
//   try {
//     getUsers().then((res) => {
//       if (!res) throw new Error('No users found');
//       dispatch(res);
//     })
//   } catch (error) {
//     console.error(error);
//     dispatch({ type: 'ERROR', payload: { error: error.message, view: 'people' } })
//   }
// },
// onGetRelationships: () => {
//   try {
//     getRelationships().then((res) => {
//       if (!res) throw new Error('No relationships found');
//       dispatch(res);
//     })
//   } catch (error) {
//     console.error(error);
//     dispatch({ type: 'ERROR', payload: { error: error.message, view: 'people' } })
//   }
// },
// onGetRequests: () => {
//   try {
//     getRequests().then((res) => {
//       if (!res) throw new Error('No requests found');
//       dispatch(res);
//     })
//   } catch (error) {
//     console.error(error);
//     dispatch({ type: 'ERROR', payload: { error: error.message, view: 'people' } })
//   }
// },
// onSendRequest: (data) => {
//   try {
//     sendRequest(data).then((res) => {
//       if (!res) throw new Error('Failed to send request');
//       dispatch(res);
//     })
//   } catch (error) {
//     console.error(error);
//     dispatch({ type: 'ERROR', payload: { error: error.message, view: 'people' } })
//   }
// },
// onAcceptRequest: (addresseeId) => {
//   try {
//     acceptRequest(addresseeId).then((res) => {
//       if (!res) throw new Error('Failed to accept request');
//       dispatch(res);
//     })
//   } catch (error) {
//     console.error(error);
//     dispatch({ type: 'ERROR', payload: { error: error.message, view: 'people' } })
//   }
// },
// onRejectRequest: (addresseeId) => {
//   try {
//     rejectRequest(addresseeId).then((res) => {
//       if (!res) throw new Error('Failed to reject request');
//       dispatch();
//     })
//   } catch (error) {
//     console.error(error);
//     dispatch({ type: 'ERROR', payload: { error: error.message, view: 'people' } })
//   }
// },
// onConfirmRequest: (addresseeId) => {
//   try {
//     confirmRequest(addresseeId).then((res) => {
//       if (!res) throw new Error('Failed to confirm request');
//       dispatch(res);
//     })
//   } catch (error) {
//     console.error(error);
//     dispatch({ type: 'ERROR', payload: { error: error.message, view: 'people' } })
//   }
// },
// onDeleteRequest: (addresseeId) => {
//   try {
//     deleteRequest(addresseeId).then((res) => {
//       if (!res) throw new Error('Failed to delete request');
//       dispatch(res);
//     })
//   } catch (error) {
//     console.error(error);
//     dispatch({ type: 'ERROR', payload: { error: error.message, view: 'people' } })
//   }
// },
// onDeleteFrienship: (addresseeId) => {
//   try {
//     deleteFriend(addresseeId).then((res) => {
//       if (!res) throw new Error('Failed to delete friend');
//       dispatch(res);
//     })
//   } catch (error) {
//     console.error(error);
//     dispatch({ type: 'ERROR', payload: { error: error.message, view: 'people' } })
//   }
// },
// onBlockUser: (addresseeId) => {
//   try {
//     blockUser(addresseeId).then((res) => {
//       if (!res) throw new Error('Failed to block user');
//       dispatch(res);
//     })
//   } catch (error) {
//     console.error(error);
//     dispatch({ type: 'ERROR', payload: { error: error.message, view: 'people' } })
//   }
// },

// case 'GET_USERS_SUCCESS': return {
//   ...state,
//   peopleView: {
//     ...state.peopleView,
//     users: {
//       loading: false,
//       people: action.payload
//     }
//   }
// };
// case 'GET_FRIENDS_SUCCESS': return {
//   ...state,
//   peopleView: {
//     ...state.peopleView,
//     relationships: {
//       loading: false,
//       friends: action.payload
//     }
//   }
// };
// case 'GET_REQUESTS_SUCCESS': return {
//   ...state,
//   peopleView: {
//     ...state.peopleView,
//     requests: {
//       loading: false,
//       ...action.payload
//     }
//   }
// };
// case 'SEND_REQUEST_SUCCESS': return {
//   ...state,
//   peopleView: {
//     ...state.peopleView,
//     users: {
//       ...state.peopleView.users,
//       people: state.peopleView.users.people.filter(user => user.userId !== action.payload)
//     },
//     requests: {
//       ...state.peopleView.requests,
//       outgoing: [...state.peopleView.requests.outgoing, state.peopleView.users.people.find(user => user.userId === action.payload)]
//     }
//   }
// };
// case 'ACCEPT_REQUEST_SUCCESS': return {
//   ...state,
//   peopleView: {
//     ...state.peopleView,
//     relationships: {
//       ...state.peopleView.users,
//       friends: [
//         ...state.peopleView.relationships.friends,
//         (!state.peopleView.relationships.friends.find(user => user.userId === action.payload))
//         && state.peopleView.requests.incoming.find(user => user.userId === action.payload)
//       ]
//     },
//     requests: {
//       ...state.peopleView.requests,
//       incoming: state.peopleView.requests.incoming.filter(user => user.userId !== action.payload)
//     }
//   }
// };
// case 'REJECT_REQUEST_SUCCESS': return {
//   ...state,
//   peopleView: {
//     ...state.peopleView,
//     requests: {
//       ...state.peopleView.requests,
//       incoming: state.peopleView.requests.incoming.filter(user => user.userId !== action.payload)
//     }
//   }
// };
// case 'CONFIRM_REQUEST_SUCCESS': return {
//   ...state,
//   peopleView: {
//     ...state.peopleView,
//     relationships: {
//       ...state.peopleView.users,
//       friends: [
//         ...state.peopleView.users.people,
//         (action.payload.status === 'accepted' & !state.peopleView.relationships.friends.find(user => user.userId === action.payload))
//         && state.peopleView.requests.incoming.find(user => user.userId === action.payload.userId)
//       ]
//     },
//     requests: {
//       ...state.peopleView.requests,
//       incoming: state.peopleView.requests.incoming.filter(user => user.userId !== action.payload.userId)
//     }
//   }
// };
// case 'DELETE_REQUEST_SUCCESS': return {
//   ...state,
//   peopleView: {
//     ...state.peopleView,
//     people: {
//       ...state.peopleView.users,
//       people: [...state.peopleView.users.people, state.peopleView.requests.outgoing.find(user => user.userId === action.payload)]
//     },
//     requests: {
//       ...state.peopleView.requests,
//       outgoing: state.peopleView.requests.outgoing.filter(user => user.userId !== action.payload)
//     }
//   }
// };
// case 'DELETE_FRIEND_SUCCESS': return {
//   ...state,
//   peopleView: {
//     ...state.peopleView,
//     users: {
//       ...state.peopleView.users,
//       people: [...state.peopleView.users.people, state.peopleView.relationships.friends.find(user => user.userId === action.payload)]
//     },
//     relationships: {
//       ...state.peopleView.relationships,
//       friends: state.peopleView.relationships.friends.filter(user => user.userId !== action.payload)
//     }
//   }
// };
// case 'BLOCK_USER_SUCCESS': return {
//   ...state,
//   peopleView: {
//     ...state.peopleView,
//     users: {
//       ...state.peopleView.users,
//       people: state.peopleView.users.people.filter(user => user.userId !== action.payload)
//     },
//     relationships: {
//       ...state.peopleView.relationships,
//       friends: state.peopleView.relationships.friends.filter(user => user.userId !== action.payload)
//     },
//     requests: {
//       ...state.peopleView.requests,
//       incoming: state.peopleView.requests.incoming.filter(user => user.userId !== action.payload),
//       outgoing: state.peopleView.requests.outgoing.filter(user => user.userId !== action.payload)
//     }
//   }
// };