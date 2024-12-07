import { useState } from "react";
import styles from "./app.module.css";
import WebGLElement from "./WebGLElement";

const App = () => {
  const [isLightOn, setIsLightOn] = useState(false);
  return (
    <>
      <div className={styles.title}>WebGL Demo</div>
      <div className={styles.controls}>
        <button
          className={`${isLightOn ? styles.selected : undefined}`}
          onClick={() => setIsLightOn(!isLightOn)}
        >
          Light Switch
        </button>
      </div>
      <WebGLElement />
    </>
  );
};

export default App;
