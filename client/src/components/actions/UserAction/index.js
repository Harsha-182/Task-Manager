export const fetchUser = () => {
  return (dispatch) => {
    const userList = JSON.parse(localStorage.getItem('userInfo')) || [];

    dispatch({
      type: 'FETCH_USERS',
      payload: userList,
    });
  };
};