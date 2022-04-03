import React from "react";

// Styles
import styles from "../styles/components/Button.module.scss";

const Button: React.FC<any> = (props) => {
  return (
    <>
      <button className={styles.button} {...props}>
        {props.children}
      </button>
    </>
  );
};

export default Button;
