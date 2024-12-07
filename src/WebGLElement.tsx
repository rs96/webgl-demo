import { useEffect, useRef, useState } from "react";
import {
  drawScene,
  fsSource,
  getProgramInfo,
  getVSSource,
  initBuffers,
  initShaderProgram,
} from "./webGLUtils";
import { Buffers, ProgramInfo } from "./webGLTypes";

const WebGLElement = ({ lightPosX }: { lightPosX: number }) => {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const [gl, setGl] = useState<WebGLRenderingContext | null>(null);
  const [buffers, setBuffers] = useState<Buffers | null>(null);
  const [shaderProgram, setShaderProgram] = useState<WebGLProgram | null>(null);
  const [programInfo, setProgramInfo] = useState<ProgramInfo | null>(null);

  let cubeRotation = 0.0;
  let deltaTime = 0;
  let then = 0;

  // Draw the scene repeatedly
  const render = (now: number) => {
    now *= 0.0001; // convert to seconds
    deltaTime = now - then;
    then = now;

    drawScene(
      gl as WebGLRenderingContext,
      programInfo as ProgramInfo,
      buffers as Buffers,
      cubeRotation
    );
    cubeRotation += deltaTime;

    requestAnimationFrame(render);
  };

  useEffect(() => {
    if (ref.current) {
      setGl(ref.current.getContext("webgl"));
    }
  }, [ref]);

  useEffect(() => {
    if (gl) {
      init(gl);
    }
  }, [gl]);

  useEffect(() => {
    if (gl && shaderProgram) {
      setProgramInfo(getProgramInfo(gl, shaderProgram));
    }
  }, [gl, shaderProgram]);

  useEffect(() => {
    if (gl && programInfo && buffers) {
      requestAnimationFrame(render);
    }
  }, [gl, programInfo, buffers]);

  useEffect(() => {
    if (gl) {
      setShaderProgram(initShaderProgram(gl, getVSSource(lightPosX), fsSource));
    }
  }, [lightPosX]);

  const init = (gl: WebGLRenderingContext) => {
    // Set clear color to black, fully opaque
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Here's where we call the routine that builds all the
    // objects we'll be drawing.
    setBuffers(initBuffers(gl));
    setShaderProgram(initShaderProgram(gl, getVSSource(lightPosX), fsSource));
  };

  return (
    <canvas
      ref={ref}
      height={window.innerHeight}
      width={window.innerWidth}
      id="gl-canvas"
    ></canvas>
  );
};

export default WebGLElement;
