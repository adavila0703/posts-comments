import React, { useContext, useState } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { GlobalContext } from '../../context/Provider';
import './PostCreate.css';
import { actions as postActions } from '../../context/reducers/posts';

export const PostCreate = () => {
  const {
    postState: { posts, loading, error },
    postDispatch,
  } = useContext(GlobalContext);
  const [postText, setPostText] = useState('');

  const sendRequest = async () => {
    if (postText) {
      console.log(process.env.POST_ENDPOINT)
      postActions.createPost(postText)(postDispatch);
      setPostText('');
      return;
    }
    alert('Post title required...');
  };

  return (
    <div className="title">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          sendRequest();
        }}
      >
        <h2>Create Post</h2>
        <Input
          onChangeText={(value) => setPostText(value)}
          inputValue={postText}
        />
        <Button buttonTitle="Submit" />
      </form>
    </div>
  );
};
