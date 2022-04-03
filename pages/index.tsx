import React, { useEffect, useState } from "react";

// Types
import type { NextPage } from "next";
import * as ts from "../types/index";

// Components
import Passwords from "../components/Passwords/Passwords";
import BottomNav from "../components/Home/BottomNav";
import Loader from "../components/Loader";

// Api
import * as UserApi from "../api/user";

// Styles
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  const [passwords, setPasswords] = useState<ts.UserPassword[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const getPasswords = async () => {
    const data = await UserApi.getPasswords();

    setPasswords(data.passwords);
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await getPasswords();
      setIsLoading(false);
    })();
  }, []);

  // Used for further down components to reset the state of the passwords
  const resetState = () => {
    getPasswords();
  };

  if (isLoading) return <Loader />;

  return (
    <div className={styles.main}>
      <BottomNav />
      <h1 className={styles.main_header}>My Passwords</h1>
      <Passwords resetState={resetState} passwords={passwords} />
    </div>
  );
};

export default Home;
