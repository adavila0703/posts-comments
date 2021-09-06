import { CommentList } from '../comment/CommentList';
import { CommentCreate } from '../comment/CommentCreate';
import { useContext } from 'react';
import { GlobalContext } from '../../context/Provider';
import { actions as postActions } from '../../context/reducers/posts';
import { actions as commentActions } from '../../context/reducers/comments';
import { useEffect } from 'react';

export const PostList = () => {
  const {
    postState: { posts, loading, error },
    commentState: { comments },
    postDispatch,
    commentDispatch,
  } = useContext(GlobalContext);
  const postObjectToArray = (data) => Object.values(data).reverse();

  useEffect(() => {
    postActions.getPostData()(postDispatch);
    commentActions.getCommentData()(commentDispatch);
  }, [postDispatch, commentDispatch]);

  if (loading) {
    return <p>loading</p>;
  }
  return (
    <div>
      {postObjectToArray(posts).map((element, index) => {
        return (
          <div key={index}>
            {element.title || ''}
            <CommentList list={comments[element.id] || []} />
            <CommentCreate postsId={element.id} />
          </div>
        );
      })}
    </div>
  );
};
