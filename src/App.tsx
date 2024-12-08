import { useState } from "react";
import styles from "./app.module.css";
import { setRotationSpeeds } from "../webgl-demo";

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
          <label>X Rotation Speed</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.02"
            onChange={(event) =>
              setRotationSpeeds({ x: Number(event?.target.value) })
            }
          />
          <label>Y Rotation Speed</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.02"
            onChange={(event) =>
              setRotationSpeeds({ y: Number(event?.target.value) })
            }
          />
          <label>Z Rotation Speed</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.02"
            onChange={(event) =>
              setRotationSpeeds({ z: Number(event?.target.value) })
            }
          />
        </div>
      </div>
      {/* <WebGLElement lightPosX={lightPosX} /> */}
    </>
  );
};

export default App;
