import { Component, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-home3d-effect',
  standalone: true,
  templateUrl: './home3d-effect.component.html',
  styleUrls: ['./home3d-effect.component.scss']
})
export class Home3dEffectComponent implements AfterViewInit {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;

  private scene!: THREE.Scene;
  private sceneGroup = new THREE.Group();
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  // private particles: THREE.Mesh[] = [];
  private particles: (THREE.Mesh | THREE.Sprite)[] = [];
  private mouse = new THREE.Vector2();

  private logos: THREE.Texture[] = [];

  ngAfterViewInit() {
    this.initThree();
    this.loadLogos();
    this.addParticles();
    this.animate();
  }

  private initThree() {
    const width = this.canvasContainer.nativeElement.clientWidth;
    const height = this.canvasContainer.nativeElement.clientHeight;

    this.scene = new THREE.Scene();
    this.scene.add(this.sceneGroup);

    const texture = new THREE.TextureLoader().load('assets/standin.png');
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    const headshotMesh = new THREE.Mesh(geometry, material);
    headshotMesh.position.set(0, -0.4, 0); // adjust -0.8 until it's just above bottom
    this.scene.add(headshotMesh);

    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    this.camera.position.z = 2.4;
    // this.camera.position.set(0, 1, 2); // raise camera on Y
    // this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.canvasContainer.nativeElement.appendChild(this.renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    this.scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    this.scene.add(pointLight);
  }


  private loadLogos() {
    const loader = new THREE.TextureLoader();
    const logoUrls = [
      'assets/logos/angular.png',
      'assets/logos/js.png',
      'assets/logos/python.png',
      'assets/logos/css.png',
      'assets/logos/html.png',
      'assets/logos/sql.png',
      'assets/logos/java.png',
      'assets/logos/git.png'
    ];

    this.logos = logoUrls.map(url => loader.load(url));
  }

  private addParticles() {
    if (!this.logos || this.logos.length === 0) return;

    for (let i = 0; i < 20; i++) {
      const texture = this.logos[Math.floor(Math.random() * this.logos.length)];
      const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
      const sprite = new THREE.Sprite(material);

      const scale = 0.2 + Math.random() * 0.1;
      sprite.scale.set(scale, scale, 1);

      const radius = 1.5 + Math.random() * 1.0;
      const theta = Math.random() * Math.PI * 2;
      const yOffset = 1.5;

      sprite.position.set(
        Math.cos(theta) * radius,
        yOffset + (Math.random() * 0.3 - 0.15),
        Math.sin(theta) * radius
      );

      this.sceneGroup.add(sprite);
      this.particles.push(sprite);
    }

    this.sceneGroup.position.y = 0.6;
  }

  // private addParticles() {
  //   const colors = [
  //     0xff2d95,
  //     0xff69b4,
  //     0xff4c9f,
  //     0xff77ab,
  //     0xff5ca2,
  //     0xff7f50,
  //     0xff1a1a,
  //     0xffa6c1,
  //     0xff3f8e,
  //     0xffb6c1,
  //     0xff3f34,
  //     0xFBF9DA,
  //     0xFFAA33
  //   ];

  //   for (let i = 0; i < 20; i++) {
  //     const geometry = new THREE.SphereGeometry(0.1 + Math.random() * 0.05, 32, 32);
  //     const material = new THREE.MeshStandardMaterial({
  //       color: colors[Math.floor(Math.random() * colors.length)],
  //     });

  //     const particle = new THREE.Mesh(geometry, material);

  //     // Wider horizontal spread
  //     const radius = 1.5 + Math.random() * 1.0; // controls loop size
  //     const theta = Math.random() * Math.PI * 2; // horizontal angle

  //     const yOffset = 1.5; // near the top of camera view
  //     particle.position.set(
  //       Math.cos(theta) * radius, // X
  //       yOffset + (Math.random() * 0.3 - 0.15), // small vertical jitter
  //       Math.sin(theta) * radius  // Z
  //     );

  //     this.sceneGroup.add(particle);
  //     this.particles.push(particle);

  //   }

  //   this.sceneGroup.position.y = 0.6;

  // }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    // Convert mouse to -1..1 range
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  private animate = () => {
    requestAnimationFrame(this.animate);

    const time = Date.now() * 0.001; // smooth rotation

    this.particles.forEach((p, index) => {
      const angle = (index / this.particles.length) * Math.PI * 2 + time;
      const radius = 0.8 + Math.sin(time + index) * 0.1;

      // Original motion
      let targetX = Math.cos(angle) * radius;
      let targetZ = Math.sin(angle) * radius;
      let targetY = Math.sin(time * 2 + index) * 0.2;

      // Mouse attraction
      const attractionStrength = 0.2; // between 0.1 and 1
      targetX += this.mouse.x * attractionStrength;
      targetY += this.mouse.y * attractionStrength;

      // move particle towards target
      p.position.x += (targetX - p.position.x) * 0.1;
      p.position.y += (targetY - p.position.y) * 0.1;
      p.position.z += (targetZ - p.position.z) * 0.1;
    });

    // Slowly rotate whole particle cloud
    this.sceneGroup.rotation.y = time * 0.2;

    this.renderer.render(this.scene, this.camera);
  };


}
