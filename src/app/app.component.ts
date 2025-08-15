import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
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

  constructor(private router: Router) { }

  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const isHome = event.urlAfterRedirects === '/';

        if (isHome) {
          const tl = gsap.timeline();
          const overlayEl = this.startupOverlay.nativeElement;
          const revealLineEl = this.revealLine.nativeElement;

          if (window.getComputedStyle(overlayEl).display !== 'none') {

            tl.set(overlayEl, { opacity: 1 })
              .fromTo(revealLineEl, { scale: 0 }, { scale: 1, duration: 0.3, ease: 'back.out(1.7)' })
              .to(revealLineEl, { width: '100%', borderRadius: '2px', duration: 0.4, ease: 'power2.inOut' })
              .set(overlayEl, { backgroundImage: 'none' })
              .to(revealLineEl, {
                scaleY: 100,
                transformOrigin: 'center center',
                duration: 0.7,
                ease: 'power4.inOut',
                onComplete: () => {
                  gsap.set(overlayEl, { display: 'none' });
                }
              })
              .from('.nav', { y: -50, opacity: 0, duration: 0.6, ease: 'power3.out' })
              .fromTo('#homeContent', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });

          } else {
            // show elements imediately
            gsap.set('.nav', { y: 0, opacity: 1 });
            gsap.set('#homeContent', { opacity: 1, y: 0 });
          }
        } else {
          gsap.set(this.startupOverlay.nativeElement, { display: 'none' });
        }
      }
    });
  }


}