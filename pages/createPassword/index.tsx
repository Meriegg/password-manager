import React from "react";

// Types
import { NextPage } from "next";
import * as ts from "../../types/index";

// Styles
import styles from "../../styles/CreatePassword.module.scss";

// Routing
import { useRouter } from "next/router";
import Link from "next/link";

// Icons
import { ChevronLeftIcon } from "@heroicons/react/solid";

// Forms
import { useForm } from "react-hook-form";

// Components
import Input from "../../components/Input";
import Button from "../../components/Button";

// Api
import * as UserApi from "../../api/user";

const CreatePassword: NextPage = () => {
  // prettier-ignore
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: {
    username: '',
    website: '',
    password: ''
  }});

  const router = useRouter();

  return (
    <div className={styles.mainContainer}>
      <Link href={"/"}>
        <a className={styles.mainContainer_link}>
          <ChevronLeftIcon fill={"#000"} width={25} height={25} />
          Inapoi Acasa
        </a>
      </Link>

      <h1>Adauga o parola!</h1>

      <form
        className={styles.mainContainer_form}
        onSubmit={handleSubmit((data: ts.UserFormData) => {
          const createPass = async () => {
            const apiData = await UserApi.createPassword(data);

            if (apiData.status === 200) {
              router.push("/");
            }
          };
          createPass();
        })}
      >
        {/* prettier-ignore */}
        <Input type="text" placeholder="Nume de utilizator" errors={errors} register={register} name="username" />
        {/* prettier-ignore */}
        <Input type="text" placeholder="Website ex: roblox.com" errors={errors} register={register} name="website" />
        {/* prettier-ignore */}
        <Input type="password" placeholder="Parola" errors={errors} register={register} name="password" />

        <Button type="submit">Adauga Parola!</Button>
      </form>
    </div>
  );
};

export default CreatePassword;
