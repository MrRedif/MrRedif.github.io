import '/style.css'

import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.set(0,10,50);
camera.rotateX(0.05);

const geometry = new THREE.IcosahedronGeometry(10,0); //new THREE.TorusGeometry(10,4,32,100);
const material = new THREE.MeshStandardMaterial({color:0xFFb321});
const torus = new THREE.Mesh(geometry,material);
scene.add(torus);

const light = new THREE.AmbientLight(0x0000ff,1);
const plinght = new THREE.PointLight(0xff0000,0.5);
scene.add(light);

plinght.position.set(0,20,0);
scene.add(plinght);
var tim = 0;

function animate(){
  requestAnimationFrame(animate);

  plinght.translateX(Math.sin(tim)*100);
  plinght.translateZ(Math.sin(tim)*100);
  torus.rotateY(0.001);
  torus.rotateZ(0.003);
  torus.rotateX(0.005);
  tim += 0.001
  renderer.render(scene,camera);
}
animate();