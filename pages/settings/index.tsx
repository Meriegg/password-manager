import React from "react";

// Styles
import styles from "../../styles/Settings/Main.module.scss";

// Link
import Link from "next/link";

// Icons
import { ChevronLeftIcon } from "@heroicons/react/solid";
import { LogoutIcon, LockClosedIcon } from "@heroicons/react/outline";

// Components
import SettingsItem from "../../components/Settings/Setting";

// Api
import * as AuthApi from "../../api/auth";

// Routing
import { useRouter } from "next/router";

const Settings: React.FC = () => {
  const router = useRouter();

  const doLogout = async () => {
    const data = await AuthApi.logout();

    if (data?.status === 200) {
      router.push("/auth/register");
    }
  };

  return (
    <div className={styles.mainContainer}>
      <Link href={"/"}>
        <a className={styles.mainContainer_link}>
          <ChevronLeftIcon fill={"#000"} width={25} height={25} />
          Inapoi Acasa
        </a>
      </Link>

      <h1>Settings</h1>

      <div className={styles.mainContainer_settings}>
        <Link href="/settings/changePassword">
          <SettingsItem
            text={"Change password"}
            Icon={LockClosedIcon}
          ></SettingsItem>
        </Link>
        <SettingsItem
          onClick={() => doLogout()}
          text={"Logout"}
          Icon={LogoutIcon}
        ></SettingsItem>
      </div>
    </div>
  );
};

export default Settings;
