import React, { useContext, useState } from 'react';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { GlobalContext } from '../../context/Provider';
import { actions as commentActions } from '../../context/reducers/comments';

export const CommentCreate = ({ postsId }) => {
  const { commentState, commentDispatch } = useContext(GlobalContext);
  const [comment, setComment] = useState('');

  const sendRequest = () => {
    if (comment) {
      console.log(commentState.comments['6564cb9b']);
      commentActions.createComment({ postsId: postsId, content: comment })(
        commentDispatch
      );
      setComment('');
      return;
    }
    alert('Comment text required...');
  };

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          sendRequest();
        }}
      >
        <Input
          onChangeText={(value) => setComment(value)}
          inputValue={comment}
        />
        <Button
          buttonTitle="Submit Comment"
          style={{
            width: 120,
            height: 25,
            fontSize: 13,
            fontWeight: 'normal',
          }}
        />
      </form>
    </div>
  );
};
