import React, { useState } from "react";

// Components
import Input from "../../components/Input";
import Button from "../../components/Button";

// Forms
import { useForm } from "react-hook-form";

// Types
import * as ts from "../../types/index";

// Styles
import styles from "../../styles/Auth.module.scss";

// Routing
import Link from "next/link";
import { useRouter } from "next/router";

// Api
import * as AuthApi from "../../api/auth";

const Login: React.FC = () => {
  const [showError, setShowError] = React.useState<boolean>(false);
  const [errorText, setErrorText] = React.useState<string>("");
  const router = useRouter();

  // Initial values for form
  const defaultFormValues = {
    username: "",
    password: "",
    email: "",
  };

  // prettier-ignore
  const { register, formState, handleSubmit } = useForm({ defaultValues: defaultFormValues });
  const { errors, isSubmitting } = formState;

  const logInUser = async (formData: ts.AuthFormData) => {
    const data = await AuthApi.login(formData);

    if (data?.status === 200) {
      router.push("/");
      return;
    }

    setShowError(true);
    setErrorText(data?.message);
    setTimeout(() => {
      setShowError(false);
      setErrorText("");
    }, 5000);
  };

  return (
    <div className={styles.main}>
      <p className={styles.main_header}>Log in</p>
      {!showError ? null : (
        <div className={styles.errorBox}>
          <p>{errorText}</p>
        </div>
      )}
      <form
        onSubmit={handleSubmit((data: ts.AuthFormData) => {
          logInUser(data);
        })}
        className={styles.main_form}
      >
        {/* prettier-ignore */}
        <Input type="text" placeholder="Username" errors={errors} register={register} name="username" />

        {/* prettier-ignore */}
        <Input type="email" placeholder="Email" errors={errors} register={register} name="email" />

        {/* prettier-ignore */}
        <Input type="password" placeholder="Parola" errors={errors} register={register} name="password" />

        <Button style={{ width: "100%" }} type="submit">
          {isSubmitting ? "Loading..." : "Continue!"}
        </Button>
      </form>

      <Link href="/auth/register">
        <a className={styles.main_link}>
          Dont have an account? Create one here!
        </a>
      </Link>
    </div>
  );
};

export default Login;
