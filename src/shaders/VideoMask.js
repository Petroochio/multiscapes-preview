import AFRAME from 'aframe';
import { simpleVert } from './Common';

const thirdSectionFloor = `
  // Use medium precision.
  precision mediump float;

  // This receives the color value from the schema, which becomes a vec3 in the shader.
  uniform vec3 color;

  // This receives the opacity value from the schema, which becomes a number.
  uniform float opacity;

  uniform sampler2D src;

  varying vec2 vUv;

  void main() {
    if (vUv.x < 0.5) {
      gl_FragColor = texture2D(src, vUv);
    } else {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    }
  }
`;

AFRAME.registerShader('floor', {
  schema: {
    src: { type: 'map', is: 'uniform' },
  },
  vertexShader: simpleVert,
  fragmentShader: thirdSectionFloor,
});

const flowerTint = `
  // Use medium precision.
  precision mediump float;

  // This receives the color value from the schema, which becomes a vec3 in the shader.
  uniform vec3 color;

  // This receives the opacity value from the schema, which becomes a number.
  uniform float opacity;

  uniform sampler2D src;

  varying vec2 vUv;

  void main() {
    vec4 sample = texture2D(src, vUv); // Displays Nothing
    if (vUv.x < 0.8) {
      sample = texture2D(src, vec2(vUv.x + 0.1, vUv.y));
    }
    if (sample.r > 0.6 && sample.g > 0.6 && sample.b < 0.3) {
      // it's yellow
      sample.g -= 0.3;
      
    }

    if (vUv.x > 0.4 && vUv.x < 0.6) {
      if (vUv.y > 0.4 && vUv.y < 0.6) {
        sample += vec4(0.02, 0.02, 0.02, 1.0);
      }
    }
    gl_FragColor = sample;
    //gl_FragColor = vec4(0.5, 0.2, 1.0, 1.0); // Works; Displays Flat Color
  }
`;

AFRAME.registerShader('flowerTint', {
  schema: {
    src: { type: 'map', is: 'uniform' },
  },
  vertexShader: simpleVert,
  fragmentShader: flowerTint,
});

const canvasMask = `
  // Use medium precision.
  precision mediump float;

  uniform sampler2D mask;
  uniform sampler2D src;

  varying vec2 vUv;

  void main() {
    vec4 maskVal = texture2D(mask, vUv);
    vec4 sample = texture2D(src, vUv);
    // Ideally this will multiply the canvas mask by other values in the texture
    gl_FragColor = vec4(maskVal.r * sample.r, maskVal.g * sample.g, maskVal.b * sample.b, maskVal.a);
  }
`;
AFRAME.registerShader('canvas-mask', {
  schema: {
    mask: { type: 'map', is: 'uniform' },
    src: { type: 'map', is: 'uniform' },
  },
  vertexShader: simpleVert,
  fragmentShader: canvasMask,
});
