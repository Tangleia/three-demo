import * as THREE from "three"

// console.log(THREE)

// 创建场景
const scene = new THREE.Scene()

// 场景相机(透视相机)
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

// 设置相机位置
camera.position.set(0,0,10)

// 加入场景
scene.add(camera)


// 添加物体
// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1,1,1)
const cubeMaterial = new THREE.MeshBasicMaterial({color: 0xffff00})
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
scene.add(cubeMesh)


// 初始化渲染器
const renderer = new THREE.WebGL1Renderer()

renderer.setSize(window.innerWidth, window.innerHeight)

// 加入dom
document.body.appendChild(renderer.domElement)

renderer.render(scene, camera)
