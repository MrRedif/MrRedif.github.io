import '/style.css'

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/addons/loaders/OBJLoader';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.set(0,10,50);
camera.rotateX(0.05);


const rotPoint = new THREE.Object3D();
rotPoint.add(camera);
scene.add(rotPoint);

const plinght = new THREE.PointLight(0xffffff,0.8);

const rotPointDown = new THREE.Object3D();
rotPointDown.position.set(0,-5,0);
plinght.position.set(0,0,15);

rotPointDown.add(plinght);
rotPoint.add(rotPointDown);

//const geometry = new THREE.IcosahedronGeometry(10,0); //new THREE.TorusGeometry(10,4,32,100);
//const material = new THREE.MeshStandardMaterial({color:0xFFb321});
//const torus = new THREE.Mesh(geometry,material);
//scene.add(torus);


const loader = new OBJLoader();

var bird = null;
loader.load("bird.obj", function(obj){
  obj.scale.set(10,10,10);
  obj.rotation.set(0,-90,0);
  obj.position.set(0,-10,0);

  for(var i in obj.children){
    obj.children[i].material = new THREE.MeshStandardMaterial({color: 0xff0000, emissive: 0x450000 });
    obj.children[i].material.color = {isColor: true, r: 0.5, g: 0, b: 0.02};
    if(i == 4 || i== 3) obj.children[i].material.color = {isColor: true, r: 1, g: 1, b: 0.3};

    if(i == 5)obj.children[i].material.color = {isColor: true, r: 0, g: 0, b: 0};
  }
  bird = obj;
  scene.add(obj);
});



const light = new THREE.AmbientLight(0xffffff,0.1);
scene.add(light);

//const gridHelper = new THREE.GridHelper(200,50);
//scene.add(gridHelper);
const controls = new OrbitControls(camera,renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;


function addStar(){
  const geometry = new THREE.SphereGeometry(0.25,24,24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry,material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(300));
  star.position.set(x,y,z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);

//Resize Listener
window.addEventListener('resize',() =>{
  //Update Camera
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth ,window.innerHeight);
});
var freezeRot = false;
const camButton = document.getElementById('cameraButton');

if(camButton != null)
camButton.addEventListener('click',()=>{
  camera.removeFromParent();
  bird.add(camera);
  camera.position.set(2,1,0);
  controls.dampingFactor = 0;
  freezeRot = true;
});

var i = 0
function animate(){
  requestAnimationFrame(animate);
  rotPoint.rotateY(0.001);
  bird?.rotateX(0.003);
  bird?.rotateY(-0.005);
  bird?.rotateZ(0.007);
  controls.update();
  if(freezeRot)camera.rotation.set(0,1.6,0);
  renderer.render(scene,camera);
  i+= 0.001;
}
animate();