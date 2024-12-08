import { drawScene, setRotationSpeeds, setPosition } from "./draw-scene";
import { initBuffers } from "./init-buffers";

export { setRotationSpeeds, setPosition };

let cubeRotation = 0.0;
let deltaTime = 0;

let vertexShader: WebGLShader | null = null;
let fragmentShader: WebGLShader | null = null;

const vertexShaderSource = `
    attribute vec4 aVertexPosition;
    attribute vec3 aVertexNormal;
    attribute vec4 aVertexColor;

    uniform mat4 uNormalMatrix;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying lowp vec4 vColor;
    varying highp vec3 vLighting;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vColor = aVertexColor;

      // Apply lighting effect

      highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
      highp vec3 directionalLightColor = vec3(1, 1, 1);
      highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));

      highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

      highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
      vLighting = ambientLight + (directionalLightColor * directional);
    }
  `;

const fragmentShaderSource = `
    varying lowp vec4 vColor;
    varying highp vec3 vLighting;

    void main(void) {
      gl_FragColor = vec4(vColor.rgb * vLighting, vColor.a);
    }
  `;

//
const main = () => {
  const canvas = document.querySelector("#gl-canvas") as HTMLCanvasElement;
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  // Initialize the GL context
  const gl = canvas.getContext("webgl");

  // Only continue if WebGL is available and working
  if (gl === null) {
    alert(
      "Unable to initialize WebGL. Your browser or machine may not support it."
    );
    return;
  }

  const shaderProgram = initShaderProgram(gl);

  if (!shaderProgram) {
    return;
  }

  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
      vertexColor: gl.getAttribLocation(shaderProgram, "aVertexColor"),
      vertexNormal: gl.getAttribLocation(shaderProgram, "aVertexNormal"),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(
        shaderProgram,
        "uProjectionMatrix"
      ),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
      normalMatrix: gl.getUniformLocation(shaderProgram, "uNormalMatrix"),
    },
  };

  // Here's where we call the routine that builds all the
  // objects we'll be drawing.
  const buffers = initBuffers(gl);

  let then = 0;

  // Draw the scene repeatedly
  const render = (now: number) => {
    now *= 0.001; // convert to seconds
    // console.log({ testLightPosX });
    deltaTime = now - then;
    then = now;
    if (!gl) {
      return;
    }

    drawScene(gl, programInfo, buffers, cubeRotation);
    cubeRotation += deltaTime;

    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
};

const initShaderProgram = (gl: WebGLRenderingContext) => {
  vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

  // Create the shader program
  const shaderProgram = gl.createProgram();
  if (!shaderProgram || !vertexShader || !fragmentShader) {
    return null;
  }
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert(
      `Unable to initialize the shader program: ${gl.getProgramInfoLog(
        shaderProgram
      )}`
    );
    return null;
  }

  return shaderProgram;
};

const loadShader = (
  gl: WebGLRenderingContext,
  type: GLenum,
  source: string
) => {
  const shader = gl.createShader(type);

  if (!shader) {
    return null;
  }

  // Send the source to the shader object
  gl.shaderSource(shader, source);

  // Compile the shader program
  gl.compileShader(shader);

  // See if it compiled successfully
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(
      `An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`
    );
    gl.deleteShader(shader);
    return null;
  }

  return shader;
};

const delayedStart = async () => {
  await new Promise((_) => setTimeout(_, 100));
  main();
};

delayedStart();
