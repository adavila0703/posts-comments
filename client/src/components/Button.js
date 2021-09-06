import './Button.css';

export const Button = ({ buttonTitle, style }) => {
  return (
    <button style={style} type="submit" className="button">
      {buttonTitle}
    </button>
  );
};
