const initialState = {
  loading: false,
  isAuthenticated: false,
  token: null,
  role: null,
  error: null,
};

export const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        token: action.payload.token,
        role: action.payload.role,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
