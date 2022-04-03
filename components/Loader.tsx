const Loader: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#fff",
      }}
    >
      <div className={"lds-roller"}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
