import React from "react";

// Styles
import styles from "../../styles/Home.module.scss";

// Components
import Button from "../Button";

// Icons
import { CogIcon, PlusSmIcon } from "@heroicons/react/solid";

// Link
import Link from "next/link";

const BottomNav: React.FC = () => {
  return (
    <div className={styles.bottomNav}>
      <Link href={"/settings"}>
        <Button>
          <CogIcon fill={"#fff"} width={20} height={20} />
        </Button>
      </Link>
      <Link href={"/createPassword"}>
        <Button>
          <PlusSmIcon fill={"#fff"} width={20} height={20} />
        </Button>
      </Link>
    </div>
  );
};

export default BottomNav;
