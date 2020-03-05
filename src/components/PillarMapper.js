import AFRAME from 'aframe';
import { addMessageListener, sendMessage } from '../MessageManager';

AFRAME.registerComponent('pillar-mapper', {
    init() {
        addMessageListener('PILLAR_STATE', (data) => {
            data.forEach((p) => {
                console.log(p);
                const element = document.querySelector(`#pillar-${p.id}`);
                element.setAttribute('width', p.w / 10);
                element.setAttribute('height', p.h / 10);
                element.setAttribute('position', { x: p.x / 20 - 15, y: 2, z: p.y / 20 - 15 });
                element.setAttribute('rotation', `-90 0 ${p.rot}`);
            });
        });

        sendMessage('GET_PILLARS', ' ');
    }
});