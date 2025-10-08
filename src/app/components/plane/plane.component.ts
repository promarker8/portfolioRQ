import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

// gsap.registerPlugin(MotionPathPlugin);

@Component({
  selector: 'app-plane',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plane.component.html',
  styleUrl: './plane.component.scss'
})

export class PlaneComponent implements AfterViewInit {

  // ngAfterViewInit(): void {
  //   // Add GSAP animation logic here
  //   gsap.fromTo(
  //     '.plane',  // Target the plane element (it could be a span or div)
  //     { x: 0, y: 0, rotation: 0 },  // Initial state (position, rotation, etc)
  //     { 
  //       x: 500,   // Move 500px to the right
  //       y: -200,  // Move 200px up (optional)
  //       rotation: 720,  // Rotate 720 degrees
  //       duration: 4,    // Time in seconds for the animation
  //       ease: "power1.inOut",  // Ease for smooth movement
  //       repeat: -1,      // Repeat the animation forever
  //       yoyo: true,      // Reverse back after the animation completes
  //     }
  //   );
  // }

  // ngAfterViewInit(): void {
  //   // Direct DOM query to select the plane element and animate it
  //   this.animatePlaneAlongPath();
  // }

  showBanner = false;

  onPlaneClick() {
    this.showBanner = !this.showBanner;
  }

  ngAfterViewInit() {
    gsap.registerPlugin(MotionPathPlugin);

    const tl = gsap.timeline({ repeat: -1, defaults: { ease: "linear" } });

    tl.to("#planeGroup", {
      duration: 9,
      // rotation: -42,
      // transformOrigin: "center",
      motionPath: {
        path: "#planePath",
        align: "#planePath",
        autoRotate: true,
        alignOrigin: [0.5, 0.5],
      },
    })
      .set("#bannerGroup", { scaleY: -1, transformOrigin: "center" })
      .to("#planeGroup", {
        duration: 9,
        motionPath: {
          path: "#planePathReturn",
          align: "#planePathReturn",
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        }
      })
      .set("#bannerGroup", { scaleY: 1, transformOrigin: "center" });
  }


  // animatePlane() {
  //   // Using GSAP to animate the plane element
  //   gsap.to('.plane', {
  //     x: "100vw", // Move to the right of the screen (100% of the viewport width)
  //     duration: 5, // Time to complete the animation
  //     repeat: -1, // Repeat infinitely
  //     yoyo: true, // Go back and forth
  //     ease: "power1.inOut" // Smooth acceleration and deceleration
  //   });
  // }

  // animatePlaneAlongPath() {
  //   gsap.to('.plane', {
  //     duration: 5,
  //     motionPath: {
  //       path: '#planePath', // Using the path defined in SVG
  //       align: '#planePath', // Align the plane to the path
  //       autoRotate: true // Make sure the plane rotates as it moves along the path
  //     },
  //     ease: 'power1.inOut',  // Apply ease to the animation directly, not inside motionPath
  //     repeat: -1,  // Loop infinitely
  //     yoyo: true   // Make it go back and forth
  //   });
  // }

}
