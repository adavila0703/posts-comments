import requests from '../../requests/request';

const GET_POSTS_SUCCESS = 'posts/GET_POSTS_SUCCESS',
  GET_POSTS_LOADING = 'posts/GET_POSTS_LOADING',
  GET_POSTS_ERROR = 'posts/GET_POSTS_ERROR',
  CREATE_POSTS_SUCCESS = 'posts/CREATE_POSTS_SUCCESS',
  CREATE_POSTS_LOADING = 'posts/CREATE_POSTS_LOADING',
  CREATE_POSTS_ERROR = 'posts/CREATE_POSTS_ERROR';

export const postInitialState = { posts: {}, loading: true, error: null };

const createPost = (payload) => async (dispatch) => {
  dispatch({ type: CREATE_POSTS_LOADING });
  try {
    const post = await requests.createPost(payload);
    dispatch({
      type: CREATE_POSTS_SUCCESS,
      payload: post,
    });
  } catch (error) {
    dispatch({ type: GET_POSTS_ERROR, payload: error });
  }
};

const getPostData = () => async (dispatch) => {
  dispatch({ type: GET_POSTS_LOADING });
  try {
    dispatch({
      type: GET_POSTS_SUCCESS,
      payload: await requests.getPostData(),
    });
  } catch (error) {
    dispatch({ type: GET_POSTS_ERROR, payload: error });
  }
};

export const actions = {
  createPost,
  getPostData,
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS_SUCCESS:
      console.log('checking postssss');
      return {
        ...state,
        loading: false,
        posts: payload,
      };
    case GET_POSTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_POSTS_ERROR:
      return {
        ...state,
        error: payload,
      };
    case CREATE_POSTS_SUCCESS:
      // { id: 12312, title: "title" }
      return {
        ...state,
        loading: false,
        posts: { ...state.posts, [payload.id]: payload },
      };
    case CREATE_POSTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CREATE_POSTS_ERROR:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
};

export default reducer;
