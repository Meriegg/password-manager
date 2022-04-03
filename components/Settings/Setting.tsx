import React from "react";

// Styles
import styles from "../../styles/Settings/Main.module.scss";

// Ts
interface Props {
  text: string;
  Icon: any;
}

const SettingsItem: React.FC<Props & any> = ({ text, Icon, ...props }) => {
  return (
    <div className={styles.mainContainer_item} {...props}>
      <Icon outline={"#fff"} width={25} height={25} />
      <p>{text}</p>
    </div>
  );
};

export default SettingsItem;
