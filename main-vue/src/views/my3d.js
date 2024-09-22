import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  MeshBasicMaterial,
  Mesh,
  BoxGeometry,
  DoubleSide,
  AmbientLight,
  PointLight,
  AxesHelper,
  TextureLoader,
  EquirectangularReflectionMapping,
  SphereGeometry,
  MeshStandardMaterial,
} from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import HouseImg from '../assets/imgs/house.jpeg'
console.log("EquirectangularReflectionMapping:", EquirectangularReflectionMapping)
export class Application {
  constructor(el) {
    this.el = el;
    this.initScene()
    this.initCamera()
    this.initRenderer()

    this.initBackground()
    // this.initAmbientLight()
    // this.initGeometry()
    this.initAxis()
    // 添加鼠标控制
    const controls = new OrbitControls(this.camera, this.renderer.domElement)
    controls.enableDamping = true

    // 当窗口变化的时候
    // window.addEventListener('resize', () => this.onWindowResize())
    // 渲染
    this.render()
  }
  onWindowResize() {
    this.w = window.innerWidth
    this.h = window.innerHeight
    this.renderer.setSize(this.w, this.h)
    // 下面这句的目的是不管窗口如何改变，盒子始终不会变化
    this.camera.aspect = this.w / this.h
    this.camera.updateProjectionMatrix()
  }
  // 定义场景
  initScene() {
    this.scene = new Scene()
  }
  // 定义相机
  initCamera() {
    this.w = window.innerWidth
    this.h = window.innerHeight
    const fov = 75 // 摄像机视锥体垂直视野角度，从视图的底部到顶部，以角度来表示
    const aspect = this.w / this.h// 摄像机视锥体长宽比
    const near = 0.1 // 摄像机的近端面
    const far = 1000 //摄像机的远端面 

    this.camera = new PerspectiveCamera(fov, aspect, near, far)
    this.camera.position.set(0, 0, 10)
    // this.camera.lookAt(this.scene.position)
  }
  // 定义渲染器
  initRenderer() {
    // 定义渲染器
    this.renderer = new WebGLRenderer({
      antialias: true // 使面平滑，无锯齿
    })
    this.renderer.setSize(this.w, this.h)
    this.renderer.setClearColor(0x888888)
    document.querySelector(this.el).appendChild(this.renderer.domElement)
  }
  initGeometry() {
    const boxGeometry = new BoxGeometry(2, 2, 2)
    // const texture = new TextureLoader().load(require('../assets/imgs/avators/1.jpg'))
    // const material = new MeshBasicMaterial({color: '0x0000ff'})
    // const material = new MeshBasicMaterial({map: texture, side: DoubleSide})
    const textureLoader = new TextureLoader()
    const boxMaterial = new MeshBasicMaterial({ map: textureLoader.load(require('../assets/imgs/avators/6.jpg')), side: DoubleSide })
    const boxMesh = new Mesh(boxGeometry, boxMaterial)
    boxMesh.position.set(-3, -3, 3)
    boxMesh.name = 'box'
    this.scene.add(boxMesh)

    // const skyGeometry = new BoxGeometry(100,100,100) 
    // const skyMaterials = [
    //   new MeshBasicMaterial({map: textureLoader.load(require('../assets/imgs/sky/right.png')), side: DoubleSide}),
    //   new MeshBasicMaterial({map: textureLoader.load(require('../assets/imgs/sky/left.png')), side: DoubleSide}),
    //   new MeshBasicMaterial({map: textureLoader.load(require('../assets/imgs/sky/up.png')), side: DoubleSide}),
    //   new MeshBasicMaterial({map: textureLoader.load(require('../assets/imgs/sky/dn.png')), side: DoubleSide}),
    //   new MeshBasicMaterial({map: textureLoader.load(require('../assets/imgs/sky/back.png')), side: DoubleSide}),
    //   new MeshBasicMaterial({map: textureLoader.load(require('../assets/imgs/sky/front.png')), side: DoubleSide}),
    // ] 
    // const skyMesh = new Mesh(skyGeometry, skyMaterials)
    // skyMesh.name = 'sky'
    // this.scene.add(skyMesh)
  }
  initBackground() {
    const textureLoader = new TextureLoader()
    textureLoader.loadAsync(HouseImg, function onProgress(...args) {
      console.log(args)
    }).then(texture => {
      texture.mapping = EquirectangularReflectionMapping
      this.scene.background = texture
      this.scene.environment = texture
    })

    const cubeGeomertry = new SphereGeometry(2, 20, 20)
    const cubeMaterial = new MeshStandardMaterial({
      metalness: 0.7,
      roughness: 0.1,
    })
    const cube = new Mesh(cubeGeomertry, cubeMaterial)

    this.scene.add(cube)
  }
  initAmbientLight() {
    const ambientLight = new AmbientLight(0x0000ff)
    this.scene.add(ambientLight)
    console.log(this.scene)

    const pointLight = new PointLight(0x0000ff)
    pointLight.position.set(10, 10, 10);
    this.scene.add(pointLight)

  }
  initAxis() {
    const axesHelper = new AxesHelper(5)
    this.scene.add(axesHelper)
  }
  render() {
    window.requestAnimationFrame(() => this.render())
    // const box = this.scene.getObjectByName('box') //获取mesh
    // box.rotation.x += 0.01
    // box.rotation.y += 0.01
    // const sky = this.scene.getObjectByName('sky') //获取mesh
    // sky.rotation.y += 0.005
    this.renderer.render(this.scene, this.camera)
  }
}
