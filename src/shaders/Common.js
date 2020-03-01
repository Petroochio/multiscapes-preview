import AFRAME from 'aframe';

export const simpleVert = `
  varying vec2 vUv;

  void main() {
    vUv = uv;

    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * modelViewPosition;
  }
`;

export const simpleFrag = `
  // Use medium precision.
  precision mediump float;

  // This receives the color value from the schema, which becomes a vec3 in the shader.
  uniform vec3 color;

  // This receives the opacity value from the schema, which becomes a number.
  uniform float opacity;

  uniform sampler2D src;

  varying vec2 vUv;

  void main() {
    vec4 sample = texture2D(src, vUv);
    // if (sample.r > 0.9 && sample.g > 0.9 && sample.b > 0.9) {
    // gl_FragColor = vec4(0.0,0.0,0.0,0.0);
    // } else {
      gl_FragColor = sample;
    // }
  }
`;

AFRAME.registerShader('basic-texture', {
  schema: {
    src: { type: 'map', is: 'uniform' },
  },
  vertexShader: simpleVert,
  fragmentShader: simpleFrag,
});

export default {
  simpleVert,
  simpleFrag,
};
