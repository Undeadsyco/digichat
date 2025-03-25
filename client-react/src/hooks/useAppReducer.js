import { useReducer } from "react";
import { utilActions } from "../actions";

/**
 * @typedef {Object} Redirect
 * @property {String} from
 * @property {String} to
 */

/**
 * @typedef {Object} Modal
 * @property {Boolean} display
 * @property {Boolean} loading
 * @property {React.Component} content
 */

/**
 * @typedef {Object} AppState
 * @property {Modal} modal
 * @property {Object} user
 * @property {String} error
 * @property {Redirect} redirect
 */
const initialState = {
  modal: {
    display: false,
    loading: true,
    content: null,
  },
  user: null,
  error: null,
  redirect: null,
  pages: {
    
    group: {
      view: 'feed',
      posts: [],
      users: {
        admins: [],
        members: [],
      },
    },
    profile: {
      view: 'feed',
      posts: [],
      users: {
        friends: [],
        incoming: [],
        outgoing: [],
      },
    }
  }
}

/**
 * 
 * @param {*} state 
 * @param {*} param1 
 * @returns 
 */
const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_LOADING': return {
      ...state,
      modal: {
        display: true,
        loading: true,
      },
    };
    case "CLEAR_LOADING": return {
      ...state,
      modal: {
        ...state.modal,
        loading: false,
        display: payload,
      },
    };

    case 'SET_USER': return {
      ...state,
      user: payload,
      redirect: true,
      path: '/feed',
    };
    case 'LOGOUT': return {
      ...state,
      user: null,
      redirect: true,
      path: '/login',
    };

    case 'REDIRECT': return {
      ...state,
      modal: {
        display: false,
        loading: false,
      },
      redirect: {
        to: payload,
      },
    };
    case 'CLEAR_REDIRECT': return {
      ...state,
      redirect: null,
    };

    case "OPEN_MODAL": return {
      ...state,
      modal: {
        display: true,
        loading: false,
        content: payload,
      },
    };
    case "CLOSE_MODAL": return {
      ...state,
      modal: {
        display: false,
        loading: false,
        content: null,
      },
    };

    case "SET_ERROR": return {
      ...state,
      modal: {
        display: false,
      },
      loading: false,
      error: payload,
    };
    case "CLEAR_ERROR": return {
      ...state,
      error: null,
    };

    // case ""
    default: return { ...state };
  }
}

const logReducerOutput = (state, action) => {
  const newState = reducer(state, action);
  if (false) {
    console.log('Incomung Action:', action);
    console.log('Incoming State:', state);
    console.log('New State:', newState);
  }
  return newState;
}

const useAppReducer = () => {
  const [state, dispatch] = useReducer(logReducerOutput, initialState);

  const actions = {
    onSignUp: async (values, actions) => {
      try {
        actions.setSubmitting(true);
        dispatch({ type: 'SET_LOADING' });

        const user = await utilActions.signup(values)
        
        if (!user) throw new Error('Sign Up Failed');
        dispatch({ type: 'SET_USER', payload: user });;
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error });
      } finally {
        actions.resetForm();
        actions.setSubmitting(false);
        
        dispatch({ type: 'CLEAR_LOADING' });
        dispatch({ type: "REDIRECT", payload: '/feed' });
      }
    },
    onVerifyToken: async () => {
      dispatch({ type: "SET_LOADING" })
      try {
        const user = await utilActions.verifyLogin()
        if (!user) return dispatch({ type: 'REDIRECT', payload: '/login' });
        dispatch({ type: 'SET_USER', payload: user });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error });
      } finally {
        dispatch({ type: 'CLEAR_LOADING' });
      }
    },
    onLogout: () => {
      try {
        utilActions.logout().then(() => {
          localStorage.clear();
          dispatch({ type: 'LOGOUT' });
        })
      } catch (error) {
        if (error instanceof Error) dispatch({ type: 'SET_ERROR', payload: error.message });
        dispatch({ type: 'SET_ERROR', payload: error });
      }
    },

    onSetRedirect: (path) => {
      console.log('Redirecting to:', path)
      dispatch({ type: 'REDIRECT', payload: path })
    },
    onClearRedirect: () => {
      dispatch({ type: 'CLEAR_REDIRECT' })
    },

    onSetLoading: (loading) => {
      dispatch({ type: 'LOADING', payload: loading })
    },
    onClearLoading: (shouldClose = true) => {
      dispatch({ type: 'CLEAR_LOADING', payload: shouldClose })
    },

    onSetError: (err) => {
      if (err instanceof Error) dispatch({ type: 'SET_ERROR', payload: err.message });
      dispatch({ type: 'SET_ERROR', payload: err });
    },
    onClearError: () => {
      dispatch({ type: 'CLEAR_ERROR' })
    },

    onOpenModal: (content) => {
      dispatch({ type: 'OPEN_MODAL', payload: content })
    },
    onCloseModal: () => {
      dispatch({ type: 'CLOSE_MODAL' })
    }
  }

  return { state, actions };
}

export default useAppReducer;
