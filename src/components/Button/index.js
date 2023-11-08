import "./styles.css";

const Button = ({ label, onClick }) => {
  return (
    <div className="container">
      <button onClick={onClick} type="button">
        {label}
      </button>
    </div>
  );
};
export { Button };
