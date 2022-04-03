import React from "react";

// Styles
import styles from "../styles/components/Input.module.scss";

interface InputProps {
  rest: any;
  name: string;
  register: Function;
  errors: any;
}

const Input: React.FC<InputProps & any> = ({
  register,
  name,
  errors,
  ...props
}) => {
  return (
    <div className={styles.container}>
      <input
        {...register(name, { required: `Obligatoriu!` })}
        className={styles.input}
        {...props}
      />
      {errors[name] ? (
        <p className={styles.input_errorText}>{errors[name].message}</p>
      ) : null}
    </div>
  );
};

export default Input;
