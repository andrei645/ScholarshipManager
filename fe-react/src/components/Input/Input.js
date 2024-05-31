import "./Input.scss";

export const Input = ({
    type = 'text',
    name,
    value,
    placeholder,
    label,
    onChange,
    onBlur,
    errorMessage,
    ...props
  }) => {
    return (
      <div className="input-group">
        {label && <label htmlFor={name}>{label}</label>}
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          {...props}
        />
        {errorMessage && <span className="error-message">{errorMessage}</span>}
      </div>
    );
  }