import "./Button.scss";

export const Button = ({
  type = "button",
  onClick = () => {},
  role = "primary",
  children,
  className,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`default-button btn-${role} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
