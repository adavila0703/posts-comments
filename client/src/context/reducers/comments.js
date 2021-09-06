import requests from '../../requests/request';

const GET_COMMENT_SUCCESS = 'comments/GET_POSTS_SUCCESS',
  GET_COMMENT_LOADING = 'comments/GET_POSTS_LOADING',
  GET_COMMENT_ERROR = 'comments/GET_POSTS_ERROR',
  CREATE_COMMENT_SUCCESS = 'comments/CREATE_POSTS_SUCCESS',
  CREATE_COMMENT_LOADING = 'comments/CREATE_POSTS_LOADING',
  CREATE_COMMENT_ERROR = 'comments/CREATE_POSTS_ERROR';

export const commentsInitialState = {
  comments: {
    id: [{}],
  },
  loading: true,
  error: null,
};

const getCommentData = () => async (dispatch) => {
  dispatch({ type: GET_COMMENT_LOADING });
  try {
    dispatch({
      type: GET_COMMENT_SUCCESS,
      payload: await requests.getCommentData(),
    });
  } catch (error) {
    dispatch({ type: GET_COMMENT_ERROR, payload: error });
  }
};

const createComment = (payload) => async (dispatch) => {
  const { postsId, content } = payload;
  dispatch({ type: CREATE_COMMENT_LOADING });
  try {
    const comment = await requests.createComment(postsId, content);
    dispatch({
      type: CREATE_COMMENT_SUCCESS,
      payload: comment,
      postsId: postsId,
    });
  } catch (error) {
    dispatch({ type: CREATE_COMMENT_ERROR, payload: error });
  }
};

export const actions = {
  getCommentData,
  createComment,
};

const reducer = (state, action) => {
  const { type, payload, postsId } = action;
  switch (type) {
    case CREATE_COMMENT_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CREATE_COMMENT_SUCCESS:
      if (state.comments[postsId]) {
        return {
          ...state,
          comments: {
            ...state.comments,
            [postsId]: [...state.comments[postsId], payload],
          },
          loading: false,
        };
      }
      return {
        ...state,
        comments: { ...state.comments, [postsId]: [payload] },
        loading: false,
      };
    case CREATE_COMMENT_ERROR:
      return {
        ...state,
        error: payload,
      };
    case GET_COMMENT_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_COMMENT_SUCCESS:
      return {
        ...state,
        comments: payload,
        loading: false,
      };
    case GET_COMMENT_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

export default reducer;
