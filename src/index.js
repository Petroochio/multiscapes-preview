import 'aframe';
import './shaders';
import './components';
import { init } from './MessageManager';

window.onload = () => {
  const stage = document.querySelector('#stage');
  const camera = document.querySelector('#camera');

  init();
};
