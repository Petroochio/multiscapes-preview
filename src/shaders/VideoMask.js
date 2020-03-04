import AFRAME from 'aframe';
import * as THREE from 'three';
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
    if (maskVal.r < 0.1 && maskVal.g < 0.1 && maskVal.b < 0.1) {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
    }
    else {
      gl_FragColor = vec4(maskVal.r * sample.r, maskVal.g * sample.g, maskVal.b * sample.b, maskVal.a);
    }
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

// this is shitty figure out if you can do arrays and loops in here
const matHoles = `
  // Use medium precision.
  precision mediump float;

  uniform vec3 mat_0;
  uniform vec3 mat_1;
  uniform vec3 mat_2;
  uniform vec3 mat_3;
  uniform vec3 mat_4;
  uniform vec3 mat_5;
  uniform vec3 mat_6;
  uniform vec3 mat_7;
  uniform vec3 mat_8;
  uniform vec3 mat_9;
  uniform vec3 mat_10;
  uniform vec3 mat_11;
  uniform vec3 mat_12;
  uniform vec3 mat_13;
  uniform vec3 mat_14;
  uniform vec3 mat_15;

  varying vec2 vUv;

  void main() {
    float r0 = 0.0, r1 = 0.0, r2 = 0.0, r3 = 0.0, r4 = 0.0, r5 = 0.0, r6 = 0.0, r7 = 0.0, r8 = 0.0;
    float r9 = 0.0, r10 = 0.0, r11 = 0.0, r12 = 0.0, r13 = 0.0, r14 = 0.0, r15 = 0.0;

    float threshold = 0.75;

    float t0 = 0.0, t1 = 0.0, t2 = 0.0, t3 = 0.0, t4 = 0.0, t5 = 0.0, t6 = 0.0, t7 = 0.0, t8 = 0.0;
    float t9 = 0.0, t10 = 0.0, t11 = 0.0, t12 = 0.0, t13 = 0.0, t14 = 0.0, t15 = 0.0;

    r0 = distance(vUv, mat_0.xy);
    r1 = distance(vUv, mat_1.xy);
    r2 = distance(vUv, mat_2.xy);

    r3 = distance(vUv, mat_3.xy);
    r4 = distance(vUv, mat_4.xy);
    r5 = distance(vUv, mat_5.xy);

    r6 = distance(vUv, mat_6.xy);
    r7 = distance(vUv, mat_7.xy);
    r8 = distance(vUv, mat_8.xy);

    r9 = distance(vUv, mat_9.xy);
    r10 = distance(vUv, mat_10.xy);
    r11 = distance(vUv, mat_11.xy);

    r12 = distance(vUv, mat_12.xy);
    r13 = distance(vUv, mat_13.xy);
    r14 = distance(vUv, mat_14.xy);
    r15 = distance(vUv, mat_15.xy);

    t0 = r0 / mat_0.z;
    t1 = r1 / mat_1.z;
    t2 = r2 / mat_2.z;

    t3 = r3 / mat_3.z;
    t4 = r4 / mat_4.z;
    t5 = r5 / mat_5.z;

    t6 = r6 / mat_6.z;
    t7 = r7 / mat_7.z;
    t8 = r8 / mat_8.z;

    t9 = r9 / mat_9.z;
    t10 = r10 / mat_10.z;
    t11 = r11 / mat_11.z;

    t12 = r12 / mat_12.z;
    t13 = r13 / mat_13.z;
    t14 = r14 / mat_14.z;
    t15 = r15 / mat_15.z;

    vec4 color = vec4(0.0, 0.0, 0.0, 1.0);

    if (t0 < threshold || t1 < threshold || t2 < threshold) {
      color.a = 0;
    } else if (t3 < threshold || t4 < threshold || t5 < threshold) {
      color.a = 0;
    } else if (t6 < threshold || t7 < threshold || t8 < threshold) {
      color.a = 0;
    } else if (t9 < threshold || t10 < threshold || t11 < threshold) {
      color.a = 0;
    } else if (t12 < threshold || t13 < threshold || t14 < threshold || t15 < threshold) {
      color.a = 0;
    }

    if (t0 >= threshold && t0 < 1) {
      color.a = color.a + ((-threshold+t0)/(1-threshold))*((-threshold+t0)/(1-threshold));
    } else if (t1 >= threshold && t1 < 1) {
      color.a = color.a + ((-threshold+t1)/(1-threshold))*((-threshold+t1)/(1-threshold));
    } else if (t2 >= threshold && t2 < 1) {
      color.a = color.a + ((-threshold+t2)/(1-threshold))*((-threshold+t2)/(1-threshold));
    } else if (t3 >= threshold && t3 < 1) {
      color.a = color.a + ((-threshold+t3)/(1-threshold))*((-threshold+t3)/(1-threshold));
    } else if (t4 >= threshold && t4 < 1) {
      color.a = color.a + ((-threshold+t4)/(1-threshold))*((-threshold+t4)/(1-threshold));
    } else if (t5 >= threshold && t5 < 1) {
      color.a = color.a + ((-threshold+t5)/(1-threshold))*((-threshold+t5)/(1-threshold));
    } else if (t6 >= threshold && t6 < 1) {
      color.a = color.a + ((-threshold+t6)/(1-threshold))*((-threshold+t6)/(1-threshold));
    } else if (t7 >= threshold && t7 < 1) {
      color.a = color.a + ((-threshold+t7)/(1-threshold))*((-threshold+t7)/(1-threshold));
    } else if (t8 >= threshold && t8 < 1) {
      color.a = color.a + ((-threshold+t8)/(1-threshold))*((-threshold+t8)/(1-threshold));
    } else if (t9 >= threshold && t9 < 1) {
      color.a = color.a + ((-threshold+t9)/(1-threshold))*((-threshold+t9)/(1-threshold));
    } else if (t10 >= threshold && t10 < 1) {
      color.a = color.a + ((-threshold+t10)/(1-threshold))*((-threshold+t10)/(1-threshold));
    } else if (t11 >= threshold && t11 < 1) {
      color.a = color.a + ((-threshold+t11)/(1-threshold))*((-threshold+t11)/(1-threshold));
    } else if (t12 >= threshold && t12 < 1) {
      color.a = color.a + ((-threshold+t12)/(1-threshold))*((-threshold+t12)/(1-threshold));
    } else if (t13 >= threshold && t13 < 1) {
      color.a = color.a + ((-threshold+t13)/(1-threshold))*((-threshold+t13)/(1-threshold));
    } else if (t14 >= threshold && t14 < 1) {
      color.a = color.a + ((-threshold+t14)/(1-threshold))*((-threshold+t14)/(1-threshold));
    } else if (t15 >= threshold && t15 < 1) {
      color.a = color.a + ((-threshold+t15)/(1-threshold))*((-threshold+t15)/(1-threshold));
    }

    if (color.a > 1) color.a = 1;
    
    // if (r0 < mat_0.z || r1 < mat_1.z || r2 < mat_2.z) {
    //   color = vec4(0.0, 0.0, 0.0, 0.0);
    // } else if (r3 < mat_3.z || r4 < mat_4.z || r5 < mat_5.z) {
    //   color = vec4(0.0, 0.0, 0.0, 0.0);
    // } else if (r6 < mat_6.z || r7 < mat_7.z || r8 < mat_8.z) {
    //   color = vec4(0.0, 0.0, 0.0, 0.0);
    // } else if (r9 < mat_9.z || r10 < mat_10.z || r11 < mat_11.z) {
    //   color = vec4(1.0, 0.0, 0.0, 0.0);
    // } else if (r12 < mat_12.z || r13 < mat_13.z || r14 < mat_14.z || r15 < mat_15.z) {
    //   color = vec4(0.0, 0.0, 0.0, 0.0);
    // }

    gl_FragColor = color;
  }
`;

AFRAME.registerShader('mat-holes', {
  schema: {
    mat_0: { type: 'vec3', is: 'uniform', default: new THREE.Vector3(-0.5, 0.0, 0.01) },
    mat_1: { type: 'vec3', is: 'uniform', default: new THREE.Vector3(-0.5, 0.0, 0.01) },
    mat_2: { type: 'vec3', is: 'uniform', default: new THREE.Vector3(-0.5, 0.0, 0.01) },

    mat_3: { type: 'vec3', is: 'uniform', default: new THREE.Vector3(-0.5, 0.0, 0.01) },
    mat_4: { type: 'vec3', is: 'uniform', default: new THREE.Vector3(-0.5, 0.0, 0.01) },
    mat_5: { type: 'vec3', is: 'uniform', default: new THREE.Vector3(-0.5, 0.0, 0.01) },

    mat_6: { type: 'vec3', is: 'uniform', default: new THREE.Vector3(-0.5, 0.0, 0.01) },
    mat_7: { type: 'vec3', is: 'uniform', default: new THREE.Vector3(-0.5, 0.0, 0.01) },
    mat_8: { type: 'vec3', is: 'uniform', default: new THREE.Vector3(-0.5, 0.0, 0.01) },

    mat_9: { type: 'vec3', is: 'uniform', default: new THREE.Vector3(-0.5, 0.0, 0.01) },
    mat_10: { type: 'vec3', is: 'uniform', default: new THREE.Vector3(-0.5, 0.0, 0.01) },
    mat_11: { type: 'vec3', is: 'uniform', default: new THREE.Vector3(-0.5, 0.0, 0.01) },

    mat_12: { type: 'vec3', is: 'uniform', default: new THREE.Vector3(-0.5, 0.0, 0.01) },
    mat_13: { type: 'vec3', is: 'uniform', default: new THREE.Vector3(-0.5, 0.0, 0.01) },
    mat_14: { type: 'vec3', is: 'uniform', default: new THREE.Vector3(-0.5, 0.0, 0.01) },
    mat_15: { type: 'vec3', is: 'uniform', default: new THREE.Vector3(-0.5, 0.0, 0.01) },
  },
  vertexShader: simpleVert,
  fragmentShader: matHoles,
});

const vidMatHoles = `
  // Use medium precision.
  precision mediump float;
  uniform sampler2D src;

  uniform vec3 mat_0;
  uniform vec3 mat_1;
  uniform vec3 mat_2;
  uniform vec3 mat_3;
  uniform vec3 mat_4;
  uniform vec3 mat_5;
  uniform vec3 mat_6;
  uniform vec3 mat_7;
  uniform vec3 mat_8;
  uniform vec3 mat_9;
  uniform vec3 mat_10;
  uniform vec3 mat_11;
  uniform vec3 mat_12;
  uniform vec3 mat_13;
  uniform vec3 mat_14;
  uniform vec3 mat_15;

  varying vec2 vUv;

  void main() {
    float r0 = 0.0, r1 = 0.0, r2 = 0.0, r3 = 0.0, r4 = 0.0, r5 = 0.0, r6 = 0.0, r7 = 0.0, r8 = 0.0;
    float r9 = 0.0, r10 = 0.0, r11 = 0.0, r12 = 0.0, r13 = 0.0, r14 = 0.0, r15 = 0.0;
    r0 = distance(vUv, mat_0.xy);
    r1 = distance(vUv, mat_1.xy);
    r2 = distance(vUv, mat_2.xy);

    r3 = distance(vUv, mat_3.xy);
    r4 = distance(vUv, mat_4.xy);
    r5 = distance(vUv, mat_5.xy);

    r6 = distance(vUv, mat_6.xy);
    r7 = distance(vUv, mat_7.xy);
    r8 = distance(vUv, mat_8.xy);

    r9 = distance(vUv, mat_9.xy);
    r10 = distance(vUv, mat_10.xy);
    r11 = distance(vUv, mat_11.xy);

    r12 = distance(vUv, mat_12.xy);
    r13 = distance(vUv, mat_13.xy);
    r14 = distance(vUv, mat_14.xy);
    r15 = distance(vUv, mat_15.xy);

    vec4 color = texture2D(src, vUv);
    if (r0 < mat_0.z || r1 < mat_1.z || r2 < mat_2.z) {
      color = vec4(0.0, 0.0, 0.0, 0.0);
    } else if (r3 < mat_3.z || r4 < mat_4.z || r5 < mat_5.z) {
      color = vec4(0.0, 0.0, 0.0, 0.0);
    } else if (r6 < mat_6.z || r7 < mat_7.z || r8 < mat_8.z) {
      color = vec4(0.0, 0.0, 0.0, 0.0);
    } else if (r9 < mat_9.z || r10 < mat_10.z || r11 < mat_11.z) {
      color = vec4(0.0, 0.0, 0.0, 0.0);
    } else if (r12 < mat_12.z || r13 < mat_13.z || r14 < mat_14.z || r15 < mat_15.z) {
      color = vec4(0.0, 0.0, 0.0, 0.0);
    }

    gl_FragColor = color;
  }
`;

AFRAME.registerShader('vid-mat-holes', {
  schema: {
    src: { type: 'map', is: 'uniform' },

    mat_0: { type: 'vec3', is: 'uniform', default: new THREE.Vector3(-0.5, 0.0, 0.01) },
    mat_1: { type: 'vec3', is: 'uniform', default: new THREE.Vector3(-0.5, 0.0, 0.01) },
    mat_2: { type: 'vec3', is: 'uniform', default: new THREE.Vector3(-0.5, 0.0, 0.01) },

    mat_3: { type: 'vec3', is: 'uniform', default: new THREE.Vector3(-0.5, 0.0, 0.01) },
    mat_4: { type: 'vec3', is: 'uniform', default: new THREE.Vector3(-0.5, 0.0, 0.01) },
    mat_5: { type: 'vec3', is: 'uniform', default: new THREE.Vector3(-0.5, 0.0, 0.01) },

    mat_6: { type: 'vec3', is: 'uniform', default: new THREE.Vector3(-0.5, 0.0, 0.01) },
    mat_7: { type: 'vec3', is: 'uniform', default: new THREE.Vector3(-0.5, 0.0, 0.01) },
    mat_8: { type: 'vec3', is: 'uniform', default: new THREE.Vector3(-0.5, 0.0, 0.01) },

    mat_9: { type: 'vec3', is: 'uniform', default: new THREE.Vector3(-0.5, 0.0, 0.01) },
    mat_10: { type: 'vec3', is: 'uniform', default: new THREE.Vector3(-0.5, 0.0, 0.01) },
    mat_11: { type: 'vec3', is: 'uniform', default: new THREE.Vector3(-0.5, 0.0, 0.01) },

    mat_12: { type: 'vec3', is: 'uniform', default: new THREE.Vector3(-0.5, 0.0, 0.01) },
    mat_13: { type: 'vec3', is: 'uniform', default: new THREE.Vector3(-0.5, 0.0, 0.01) },
    mat_14: { type: 'vec3', is: 'uniform', default: new THREE.Vector3(-0.5, 0.0, 0.01) },
    mat_15: { type: 'vec3', is: 'uniform', default: new THREE.Vector3(-0.5, 0.0, 0.01) },
  },
  vertexShader: simpleVert,
  fragmentShader: vidMatHoles,
});
