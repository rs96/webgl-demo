import { useState } from "react";
import styles from "./app.module.css";
import { setPosition, setRotationSpeeds } from "../webgl-demo";

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
        <div className={styles.sliderGroup}>
          <label>X Position</label>
          <input
            type="range"
            min="-3"
            max="3"
            step="0.02"
            onChange={(event) => setPosition(Number(event.target.value), "x")}
          />
          <label>Y Position</label>
          <input
            type="range"
            min="-3"
            max="3"
            step="0.02"
            onChange={(event) => setPosition(Number(event.target.value), "y")}
          />
          <label>Z Position</label>
          <input
            type="range"
            min="-11"
            max="-4"
            step="0.02"
            onChange={(event) => setPosition(Number(event.target.value), "z")}
          />
        </div>
      </div>
      {/* <WebGLElement lightPosX={lightPosX} /> */}
    </>
  );
};

export default App;
