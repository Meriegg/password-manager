import React from "react";

// Styles
import styles from "../../styles/components/Passwords/Passwords.module.scss";

// Ts
import * as ts from "../../types/index";

interface Props {
  passwords: Array<ts.UserPassword>;
  resetState: Function;
}

// Components
import Password from "./Password";

const Passwords: React.FC<Props> = ({ passwords, resetState }) => {
  return (
    <div className={styles.passwords}>
      <div className={styles.passwords_fields}>
        <p>website</p>
        <p>username</p>
        <p>password</p>
      </div>
      <div className={styles.passwords_content}>
        {!passwords?.length ? (
          <p>You have no passwords yet!</p>
        ) : (
          <>
            {passwords.map((password) => {
              return (
                <Password
                  key={password.idx}
                  resetState={resetState}
                  password={password}
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Passwords;
