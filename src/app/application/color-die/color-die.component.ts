import { Component } from '@angular/core';

@Component({
  selector: 'app-color-die',
  standalone: false,
  templateUrl: './color-die.component.html',
  styleUrl: './color-die.component.scss',
})
export class ColorDieComponent {
  cubeStyle: any = {};
  resultColor: string = '';

  faceTransforms = [
    { transform: 'rotateX(0deg) rotateY(0deg)', color: 'red' }, // front
    { transform: 'rotateY(180deg)', color: 'blue' }, // back
    { transform: 'rotateY(-90deg)', color: 'green' }, // right
    { transform: 'rotateY(90deg)', color: 'yellow' }, // left
    { transform: 'rotateX(-90deg)', color: 'pink' }, // top
    { transform: 'rotateX(90deg)', color: 'purple' }, // bottom
  ];

  rollCube() {
    const rollDuration = 3000; // in ms
    const intervalTime = 200;

    let interval = setInterval(() => {
      const randomRotation = {
        x: Math.floor(Math.random() * 360),
        y: Math.floor(Math.random() * 360),
      };
      this.cubeStyle = {
        transform: `rotateX(${randomRotation.x}deg) rotateY(${randomRotation.y}deg)`,
      };
    }, intervalTime);

    setTimeout(() => {
      clearInterval(interval);

      // Pick one face randomly as the "final" face
      const randomFace =
        this.faceTransforms[
          Math.floor(Math.random() * this.faceTransforms.length)
        ];
      this.cubeStyle = {
        transform: randomFace.transform,
      };
      this.resultColor = randomFace.color;
    }, rollDuration);
  }
}
