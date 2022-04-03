import React, { useState } from "react";

// Components
import Button from "../Button";
import CopyToClipboard from "react-copy-to-clipboard";

// Styles
import styles from "../../styles/components/Passwords/Password.module.scss";

// Api
import * as UserApi from "../../api/user";

// Types
import * as ts from "../../types/index";

interface Props {
  password: ts.UserPassword;
  resetState: Function;
}

const Password: React.FC<Props> = ({ password, resetState }) => {
  // State
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [isCopied, setIsCopied] = React.useState<boolean>(false);
  // prettier-ignore
  const [revealedPassContent, setRevealedPassContent] = React.useState<string>("")

  const clearLink = (link: string) => link.replace(/https?:\/\/w*\.*/g, "");

  const deletePassword = async (idx: number) => {
    const data = await UserApi.deletePassword(idx);

    if (data?.status === 200) {
      resetState();
    }
  };

  const handleShowPassword = async (idx: number) => {
    if (showPassword) {
      setShowPassword(false);
      setRevealedPassContent("");
      return;
    }

    const data = await UserApi.showPassword(idx);

    if (data?.status !== 200) return;

    setShowPassword(true);
    setRevealedPassContent(data?.password);
  };

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2500);
  };

  return (
    <div className={styles.password}>
      <div className={styles.password_content}>
        <p>{clearLink(password.website)}</p>
        <p>{password.username}</p>
        <p>{!showPassword ? password.password : revealedPassContent}</p>
      </div>

      <div className={styles.password_controls}>
        <Button onClick={() => handleShowPassword(password.idx)}>
          {showPassword ? "Hide password" : "Show password"}
        </Button>
        <CopyToClipboard
          text={
            !revealedPassContent
              ? "You need to press `show password` first"
              : revealedPassContent
          }
          onCopy={() => handleCopy()}
        >
          <Button disabled={!revealedPassContent ? true : false}>
            {isCopied ? "Copied!" : "Copy"}
          </Button>
        </CopyToClipboard>
        <Button onClick={() => deletePassword(password.idx)}>Delete</Button>
      </div>
    </div>
  );
};

export default Password;
