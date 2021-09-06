import './CommentList.css';

export const CommentList = ({ list }) => {
  const commentList = Object.values(list);
  return (
    <div className="commentList">
      {commentList.map((element, index) => {
        return (
          <ul className="list" key={index}>
            <li>{element.content}</li>
          </ul>
        );
      })}
    </div>
  );
};
