import * as THREE from "three"
import * as dat from "dat.gui"
import gsap from "gsap"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


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


// 坐标轴
const axesHelper  = new THREE.AxesHelper(5)
scene.add(axesHelper)


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

// 创建轨道控制器
const controllers = new OrbitControls(camera, renderer.domElement)
// 阻尼
controllers.enableDamping = true

// 设置动画
gsap.to(cubeMesh.position, {x: 5, duration: 5})

function render() {
  controllers.update()
  renderer.render(scene, camera)
  // 下一帧递归调用
  requestAnimationFrame(render)
}

render()


// 监听画面变化
window.addEventListener('resize', () => {
  // 更新相机
  camera.aspect = window.innerWidth / window.innerHeight
  // 更新相机投影矩阵
  camera.updateProjectionMatrix()
  // 更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio)

})

// 全屏和退出全屏
window.addEventListener('dblclick', () => {
  const fullScreenElement = document.fullscreenElement
  if (!fullScreenElement) {
    renderer.domElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
})


// 创建GUI
const gui = new dat.GUI()
gui.add(cubeMesh.position, 'x').min(0).max(5).step(0.1).name('移动x轴')
