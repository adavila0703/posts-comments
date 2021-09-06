import React from 'react';
import './App.css';
import { PostCreate } from './container/post/PostCreate';
import { PostList } from './container/post/PostList.js';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <PostCreate />
        <hr className="divider" />
        <div className="post-list">
          <PostList />
        </div>
      </header>
    </div>
  );
};

export default App;
