import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  HostListener,
  ElementRef,
  ViewChild
} from '@angular/core';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { CustomWiggle } from 'gsap/CustomWiggle';

gsap.registerPlugin(CustomEase, CustomWiggle);

@Component({
  selector: 'app-opener',
  templateUrl: './opener.component.html',
  styleUrls: ['./opener.component.scss'],
  standalone: true
})
export class OpenerComponent implements AfterViewInit, OnDestroy {
  private xPosition = 0;
  private yPosition = 0;
  private storedXPosition = 0;
  private storedYPosition = 0;
  private height = window.innerHeight;
  private width = window.innerWidth;
  private dizzyIsPlaying = false;

  private dom: any = {};

  private blink!: gsap.core.Timeline;
  private dizzy!: gsap.core.Timeline;

  constructor(private elRef: ElementRef) { }

  ngAfterViewInit(): void {
    this.cacheDom();

    this.setupAnimations();
    this.setupBlink();
    this.setupDizzy();

    // Setup resize listener
    this.updateWindowSize();
    window.addEventListener('resize', this.updateWindowSize.bind(this));
  }

  ngOnDestroy(): void {
    gsap.ticker.remove(this.animateFace);
    window.removeEventListener('mousemove', this.updateScreenCoords);
    window.removeEventListener('resize', this.updateWindowSize);
  }

  private cacheDom() {
    const native = this.elRef.nativeElement;
    this.dom = {
      face: native.querySelector('.face'),
      eye: native.querySelectorAll('.eye'),
      innerFace: native.querySelector('.inner-face'),
      hairFrontLeft: native.querySelector('.hair-front-left'),
      hairFrontRight: native.querySelector('.hair-front-right'),
      hairBack: native.querySelector('.hair-back'),
      shadow: native.querySelectorAll('.shadow'),
      ear: native.querySelectorAll('.ear'),
      eyebrowLeft: native.querySelector('.eyebrow-left'),
      eyebrowRight: native.querySelector('.eyebrow-right'),
      blush: native.querySelectorAll('.blush-left, .blush-right'),
      necklace: native.querySelector('.necklace'),
      noseRing: native.querySelector('.nose'),
      septum: native.querySelector('.septum')
    };
  }

  private setupAnimations() {
    gsap.set('.bg', { transformOrigin: '50% 50%' });
    gsap.set('.ear-right', { transformOrigin: '0% 50%' });
    gsap.set('.ear-left', { transformOrigin: '100% 50%' });
    gsap.set('.me', { opacity: 1 });

    const meTl = gsap.timeline({
      delay: 1,
      onComplete: () => this.addMouseEvent()
    });

    meTl
      .from('.me', {
        duration: 1,
        yPercent: 100,
        ease: 'elastic.out(0.5, 0.4)'
      }, 0.5)
      .from('.head, .hair, .shadow', {
        duration: 0.9,
        yPercent: 20,
        ease: 'elastic.out(0.58, 0.25)'
      }, 0.6)
      .from('.ear-right', {
        duration: 1,
        rotate: 40,
        yPercent: 10,
        ease: 'elastic.out(0.5, 0.2)'
      }, 0.7)
      .from('.ear-left', {
        duration: 1,
        rotate: -40,
        yPercent: 10,
        ease: 'elastic.out(0.5, 0.2)'
      }, 0.7)
      .to('.glasses', {
        duration: 1,
        keyframes: [{ yPercent: -10 }, { yPercent: 0 }],
        ease: 'elastic.out(0.5, 0.2)'
      }, 0.75)
      .from('.eyebrow-right, .eyebrow-left', {
        duration: 1,
        yPercent: 300,
        ease: 'elastic.out(0.5, 0.2)'
      }, 0.7)
      .to('.eye-right, .eye-left', {
        duration: 0.01,
        opacity: 1
      }, 0.85)
      .to('.eye-right-2, .eye-left-2', {
        duration: 0.01,
        opacity: 0
      }, 0.85);
  }

  private setupBlink() {
    this.blink = gsap.timeline({ repeat: -1, repeatDelay: 4, paused: true });

    this.blink
      .to('.eye-right, .eye-left', { duration: 0.01, opacity: 0 }, 0)
      .to('.eye-right-2, .eye-left-2', { duration: 0.01, opacity: 1 }, 0)
      .to('.eye-right, .eye-left', { duration: 0.01, opacity: 1 }, 0.15)
      .to('.eye-right-2, .eye-left-2', { duration: 0.01, opacity: 0 }, 0.15);
  }

  private setupDizzy() {
    CustomWiggle.create('myWiggle', { wiggles: 6, type: 'ease-out' });
    CustomWiggle.create('lessWiggle', { wiggles: 4, type: 'ease-in-out' });

    this.dizzy = gsap.timeline({
      paused: true,
      onComplete: () => {
        this.dizzyIsPlaying = false
      }
    });

    this.dizzy
      .to('.eyes', { duration: 0.01, opacity: 0 }, 0)
      .to('.dizzy', { duration: 0.01, opacity: 0.3 }, 0)
      .to('.mouth', { duration: 0.01, opacity: 0 }, 0)
      .to('.oh', { duration: 0.01, opacity: 0.85 }, 0)
      .to('.head, .hair-back, .shadow', {
        duration: 6,
        rotate: 2,
        transformOrigin: '50% 50%',
        ease: 'myWiggle'
      }, 0)
      .to('.me', {
        duration: 6,
        rotate: -2,
        transformOrigin: '50% 100%',
        ease: 'myWiggle'
      }, 0)
      .to('.me', {
        duration: 4,
        scale: 0.99,
        transformOrigin: '50% 100%',
        ease: 'lessWiggle'
      }, 0)
      .to('.dizzy-1', {
        rotate: -360,
        duration: 1,
        repeat: 5,
        transformOrigin: '50% 50%',
        ease: 'none'
      }, 0.01)
      .to('.dizzy-2', {
        rotate: 360,
        duration: 1,
        repeat: 5,
        transformOrigin: '50% 50%',
        ease: 'none'
      }, 0.01)
      .to('.eyes', { duration: 0.01, opacity: 1 }, 4)
      .to('.dizzy', { duration: 0.01, opacity: 0 }, 4)
      .to('.oh', { duration: 0.01, opacity: 0 }, 4)
      .to('.mouth', { duration: 0.01, opacity: 1 }, 4);
  }

  private addMouseEvent() {
    const safeToAnimate = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
    if (safeToAnimate) {
      window.addEventListener('mousemove', this.updateScreenCoords);
      gsap.ticker.add(this.animateFace);
      this.blink.play();
    }
  }

  private updateScreenCoords = (event: MouseEvent) => {
    if (!this.dizzyIsPlaying) {
      this.xPosition = event.clientX;
      this.yPosition = event.clientY;
    }

    if (!this.dizzyIsPlaying && Math.abs(event.movementX) > 500) {
      this.dizzyIsPlaying = true;
      this.dizzy.restart();
    }
  };

  private animateFace = () => {
    if (!this.xPosition || (this.storedXPosition === this.xPosition && this.storedYPosition === this.yPosition)) return;

    const x = (100 * this.xPosition) / this.width - 50;
    const y = (100 * this.yPosition) / this.height - 50;
    const yHigh = (100 * this.yPosition) / this.height - 20;
    const yLow = (100 * this.yPosition) / this.height - 80;

    gsap.to(this.dom.face, { yPercent: yLow / 30, xPercent: x / 30 });
    gsap.to(this.dom.eye, { yPercent: yHigh / 3, xPercent: x / 2 });
    gsap.to(this.dom.innerFace, { yPercent: y / 6, xPercent: x / 8 });
    gsap.to(this.dom.hairFront, { yPercent: yHigh / 15, xPercent: x / 22 });
    gsap.to([this.dom.hairBack, this.dom.shadow], { yPercent: -yLow / 20, xPercent: -x / 20 });
    gsap.to(this.dom.ear, { yPercent: -y / 1.5, xPercent: -x / 10 });
    gsap.to([this.dom.eyebrowLeft, this.dom.eyebrowRight], { yPercent: y * 2.5 });

    this.storedXPosition = this.xPosition;
    this.storedYPosition = this.yPosition;
  };

  private updateWindowSize = () => {
    this.height = window.innerHeight;
    this.width = window.innerWidth;
  };
}
