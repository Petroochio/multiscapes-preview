import AFRAME from 'aframe';
import * as THREE from 'three';
import { simpleVert } from './Common';

const { Vector3 } = THREE;

AFRAME.registerShader('step-ripple', {
  schema: {
    color: { type: 'color', is: 'uniform' },
    time: { type: 'time', is: 'uniform', default: 0 },
    ripple0: { type: 'vec3', is: 'uniform', default: new Vector3(0, 0, 0) },
    ripple1: { type: 'vec3', is: 'uniform', default: new Vector3(0, 0, 0) },
    ripple2: { type: 'vec3', is: 'uniform', default: new Vector3(0, 0, 0) },
    ripple3: { type: 'vec3', is: 'uniform', default: new Vector3(0, 0, 0) },
    ripple4: { type: 'vec3', is: 'uniform', default: new Vector3(0, 0, 0) },
    ripple5: { type: 'vec3', is: 'uniform', default: new Vector3(0, 0, 0) },
    ripple6: { type: 'vec3', is: 'uniform', default: new Vector3(0, 0, 0) },
    ripple7: { type: 'vec3', is: 'uniform', default: new Vector3(0, 0, 0) },
    ripple8: { type: 'vec3', is: 'uniform', default: new Vector3(0, 0, 0) },
    ripple9: { type: 'vec3', is: 'uniform', default: new Vector3(0, 0, 0) },
    ripple10: { type: 'vec3', is: 'uniform', default: new Vector3(0, 0, 0) },
    ripple11: { type: 'vec3', is: 'uniform', default: new Vector3(0, 0, 0) },
    ripple12: { type: 'vec3', is: 'uniform', default: new Vector3(0, 0, 0) },
    ripple13: { type: 'vec3', is: 'uniform', default: new Vector3(0, 0, 0) },
    ripple14: { type: 'vec3', is: 'uniform', default: new Vector3(0, 0, 0) },
    ripple15: { type: 'vec3', is: 'uniform', default: new Vector3(0, 0, 0) },
  },
  vertexShader: simpleVert,
  fragmentShader: `
    varying vec2 vUv;
    uniform float time; // A-Frame time in milliseconds.
    uniform vec3 ripple0;
    uniform vec3 ripple1;
    uniform vec3 ripple2;
    uniform vec3 ripple3;
    uniform vec3 ripple4;
    uniform vec3 ripple5;
    uniform vec3 ripple6;
    uniform vec3 ripple7;
    uniform vec3 ripple8;
    uniform vec3 ripple9;
    uniform vec3 ripple10;
    uniform vec3 ripple11;
    uniform vec3 ripple12;
    uniform vec3 ripple13;
    uniform vec3 ripple14;
    uniform vec3 ripple15;

    float getRippleAlpha(in vec3 ripple) { // Convert from A-Frame milliseconds to typical time in seconds.
      float threshold = 0.02;
      float fade = 0.5;

      float a = 0.0;

      float r = (time - ripple.z) / 500.0;
      float d = distance(vUv, ripple.xy) - r;
      float f = r / fade;
      if (f > 1.0) { f = 1.0; }
      if (d < 0.0) { d = -d; }
      if (d <= threshold) { a = (1.0 - f) * (1.0 - (d / threshold) * (d / threshold)); }

      return a;
    }
  
    void main() {
      vec4 color = vec4(1.0, 1.0, 1.0, 0.0);

      color.a = getRippleAlpha(ripple0);
      color.a += getRippleAlpha(ripple1);
      color.a += getRippleAlpha(ripple2);
      color.a += getRippleAlpha(ripple3);
      color.a += getRippleAlpha(ripple4);
      color.a += getRippleAlpha(ripple5);
      color.a += getRippleAlpha(ripple6);
      color.a += getRippleAlpha(ripple7);
      color.a += getRippleAlpha(ripple8);
      color.a += getRippleAlpha(ripple9);
      color.a += getRippleAlpha(ripple10);
      color.a += getRippleAlpha(ripple11);
      color.a += getRippleAlpha(ripple12);
      color.a += getRippleAlpha(ripple13);
      color.a += getRippleAlpha(ripple14);
      color.a += getRippleAlpha(ripple15);

      gl_FragColor = color;
    }
  `,
});
