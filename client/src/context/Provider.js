import React, { createContext, useReducer } from 'react';
import postsReducer, { postInitialState } from './reducers/posts';
import commentsReducer, { commentsInitialState } from './reducers/comments';

const GlobalProvider = ({ children }) => {
  const [postState, postDispatch] = useReducer(postsReducer, postInitialState);
  const [commentState, commentDispatch] = useReducer(
    commentsReducer,
    commentsInitialState
  );

  return (
    <GlobalContext.Provider
      value={{
        postState,
        postDispatch,
        commentState,
        commentDispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const GlobalContext = createContext(postInitialState);
export default GlobalProvider;
