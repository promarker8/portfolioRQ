import { AfterViewInit, Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { trigger, transition, style, animate, query, group } from '@angular/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import gsap from 'gsap';

const routeTransition = trigger('routeTransition', [
  transition('* <=> *', [
    query(':enter, :leave', [style({ position: 'fixed', width: '100%' })], { optional: true }),
    group([
      query(':leave', [animate('220ms ease', style({ opacity: 0, transform: 'translateY(6px) scale(0.98)' }))], { optional: true }),
      query(':enter', [style({ opacity: 0, transform: 'translateY(6px) scale(0.98)' }), animate('260ms 60ms ease', style({ opacity: 1, transform: 'none' }))], { optional: true })
    ])
  ])
]);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeTransition]
})
export class AppComponent implements AfterViewInit {

  @ViewChild('startupOverlay') startupOverlay!: ElementRef;
  @ViewChild('revealLine') revealLine!: ElementRef;

  constructor(private router: Router, private renderer: Renderer2) { }

  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        const isHome = url === '/';

        // Remove all theme classes first to avoid duplicates
        this.renderer.removeClass(document.body, 'theme-home');
        this.renderer.removeClass(document.body, 'theme-projects');
        this.renderer.removeClass(document.body, 'theme-about');
        this.renderer.removeClass(document.body, 'theme-contact');
        this.renderer.removeClass(document.body, 'theme-opener');

        // Add theme class based on URL
        if (url === '/' || url.startsWith('/home')) {
          this.renderer.addClass(document.body, 'theme-home');
        } else if (url.startsWith('/projects')) {
          this.renderer.addClass(document.body, 'theme-projects');
        } else if (url.startsWith('/about')) {
          this.renderer.addClass(document.body, 'theme-about');
        } else if (url.startsWith('/contact')) {
          this.renderer.addClass(document.body, 'theme-contact');
        } else if (url.startsWith('/opener')) {
          this.renderer.addClass(document.body, 'theme-opener');
        }

        if (isHome) {
          gsap.set('.nav', { y: 0, opacity: 1 });
          gsap.set('#homeContent', { opacity: 1, y: 0 });
        }

        // if (isHome) {
        //   const tl = gsap.timeline();
        //   const overlayEl = this.startupOverlay.nativeElement;
        //   const revealLineEl = this.revealLine.nativeElement;

        //   if (window.getComputedStyle(overlayEl).display !== 'none') {

        //     tl.set(overlayEl, { opacity: 1 })
        //       .fromTo(revealLineEl, { scale: 0 }, { scale: 1, duration: 0.2, ease: 'back.out(1.7)' })
        //       .to(revealLineEl, { width: '100%', borderRadius: '2px', duration: 0.2, ease: 'power2.inOut' })
        //       .set(overlayEl, { backgroundImage: 'none' })
        //       .to(revealLineEl, {
        //         scaleY: 100,
        //         transformOrigin: 'center center',
        //         duration: 0.6,
        //         ease: 'power4.inOut',
        //         onComplete: () => {
        //           gsap.set(overlayEl, { display: 'none' });
        //         }
        //       })
        //       .from('.nav', { y: -50, opacity: 0, duration: 0.6, ease: 'power3.out' })
        //       .fromTo('#homeContent', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });

        //   } else {
        //     // show elements immediately
        //     gsap.set('.nav', { y: 0, opacity: 1 });
        //     gsap.set('#homeContent', { opacity: 1, y: 0 });
        //   }
        // } else {
        //   gsap.set(this.startupOverlay.nativeElement, { display: 'none' });
        // }
      }
    });
  }


}