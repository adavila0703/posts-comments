import './Input.css';

export const Input = ({ onChangeText, inputValue, style }) => {
  return (
    <div>
      <input
        style={style}
        className="formInput"
        type="text"
        onChange={(event) => onChangeText(event.target.value)}
        value={inputValue}
      />
    </div>
  );
};
