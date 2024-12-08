import { useState } from "react";
import styles from "./app.module.css";

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
        <div className={styles.sliderGroup}>
          <label>Light X Position</label>
          <input
            type="range"
            name="lPosX"
            min="0"
            max="1"
            step="0.01"
            onChange={() => {}}
          />
        </div>
      </div>
      {/* <WebGLElement lightPosX={lightPosX} /> */}
    </>
  );
};

export default App;
