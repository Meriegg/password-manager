import React from "react";
import Head from "next/head";

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Password Manager | Store Your Passwords</title>
      </Head>
      <>{children}</>
    </div>
  );
};

export default Layout;
