import React, { useState } from "react";

// Types
import { NextPage } from "next";

// Forms
import { useForm } from "react-hook-form";

// Components
import Input from "../../components/Input";
import Button from "../../components/Button";

// Styles
import styles from "../../styles/Settings/ChangePassword.module.scss";

// Api
import * as AuthApi from "../../api/auth";

// Routing
import { useRouter } from "next/router";
import Link from "next/link";

// Icons
import { ChevronLeftIcon } from "@heroicons/react/solid";

const ChangePassword: NextPage = () => {
  const [showError, setShowError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  return (
    <div className={styles.mainContainer}>
      <Link href={"/settings"}>
        <a className={styles.mainContainer_link}>
          <ChevronLeftIcon fill={"#000"} width={25} height={25} />
          Inapoi la setari
        </a>
      </Link>
      <h1>Schimba Parola!</h1>
      <form
        className={styles.mainContainer_form}
        onSubmit={handleSubmit((data) => {
          const changePass = async () => {
            const apiData = await AuthApi.changePassword(data);

            if (apiData?.status !== 200) {
              setShowError(true);
              setErrorText(apiData?.message);
              setTimeout(() => {
                setShowError(false);
                setErrorText("");
              }, 3000);

              return;
            }

            reset();
            router.push("/");
          };

          changePass();
        })}
      >
        {showError ? (
          <div className={styles.errorBox}>
            <p>{errorText}</p>
          </div>
        ) : null}
        {/* prettier-ignore */}
        <Input type="password" placeholder="Parola Veche" errors={errors} register={register} name="oldPassword" />
        {/* prettier-ignore */}
        <Input type="password" placeholder="Parola Noua" errors={errors} register={register} name="newPassword" />

        <Button type="submit">Continua!</Button>
      </form>
    </div>
  );
};

export default ChangePassword;
