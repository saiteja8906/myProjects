import { Html, useProgress } from "@react-three/drei";

function Loader() {
  const { progress } = useProgress();
  const containerStyles = {
    height: 30,
    width: "100%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: 50,
  };

  const fillerStyles = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: "#00695c",
    borderRadius: "inherit",
    textAlign: "right",
  };

  const labelStyles = {
    padding: 5,
    color: "white",
    fontWeight: "bold",
  };
  return (
    <>
      <Html center>
        <div style={containerStyles}>
          <div style={fillerStyles}>
            <div style={labelStyles}>{`${progress}%`}</div>
          </div>
        </div>
      </Html>
    </>
  );
}

export default Loader;
