import { useState } from "react";
import styles from "./app.module.css";
import {
  posX,
  posY,
  posZ,
  rotX,
  rotY,
  rotZ,
  setPosition,
  setRotation,
} from "../webgl-demo";

const App = () => {
  // const [isLightOn, setIsLightOn] = useState(false);
  const [localPosX, setPosX] = useState(posX);
  const [localPosY, setPosY] = useState(posY);
  const [localPosZ, setPosZ] = useState(posZ);
  const [localRotX, setRotX] = useState(rotX);
  const [localRotY, setRotY] = useState(rotY);
  const [localRotZ, setRotZ] = useState(rotZ);
  return (
    <>
      <div className={styles.title}>WebGL Demo</div>
      <div className={styles.controls}>
        {/* <button
          className={`${isLightOn ? styles.selected : undefined}`}
          onClick={() => setIsLightOn(!isLightOn)}
        >
          Light Switch
        </button> */}
        <div className={styles.sliderGroup}>
          <label>X Rotation Speed</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.02"
            value={localRotX}
            onChange={(event) => {
              setRotation(Number(event.target.value), "x");
              setRotX(Number(event.target.value));
            }}
          />
          <label>Y Rotation Speed</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.02"
            value={localRotY}
            onChange={(event) => {
              setRotation(Number(event.target.value), "y");
              setRotY(Number(event.target.value));
            }}
          />
          <label>Z Rotation Speed</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.02"
            value={localRotZ}
            onChange={(event) => {
              setRotation(Number(event.target.value), "z");
              setRotZ(Number(event.target.value));
            }}
          />
        </div>
        <div className={styles.sliderGroup}>
          <label>X Position</label>
          <input
            type="range"
            value={localPosX}
            min="-3"
            max="3"
            step="0.02"
            onChange={(event) => {
              setPosition(Number(event.target.value), "x");
              setPosX(Number(event.target.value));
            }}
          />
          <label>Y Position</label>
          <input
            type="range"
            value={localPosY}
            min="-3"
            max="3"
            step="0.02"
            onChange={(event) => {
              setPosition(Number(event.target.value), "y");
              setPosY(Number(event.target.value));
            }}
          />
          <label>Z Position</label>
          <input
            type="range"
            value={localPosZ}
            min="-12"
            max="-6"
            step="0.02"
            onChange={(event) => {
              setPosition(Number(event.target.value), "z");
              setPosZ(Number(event.target.value));
            }}
          />
        </div>
      </div>
    </>
  );
};

export default App;
