import "./styles.css";

const Input = ({ value, name, placeholder, onChange }) => {
  return (
    <input value={value} type="text" name={name} placeholder={placeholder} onChange={onChange}/>
  );
};

export { Input };
