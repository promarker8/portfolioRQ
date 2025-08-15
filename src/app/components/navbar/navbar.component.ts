import { Component, computed, signal, HostListener, ViewChild, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import gsap from 'gsap';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  open = signal(false);
  scrolled = signal(false);

  // @ViewChild('navbarEl') navbarEl!: ElementRef;

  toggle() {
    this.open.update(state => !state);
  }

  elevated = computed(() => this.scrolled());

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 10);
  }

  // ngAfterViewInit() {
  //   gsap.timeline()
  //     .to(this.navbarEl.nativeElement, {
  //       opacity: 1,
  //       duration: 0.2
  //     })
  //     .to(this.navbarEl.nativeElement, {
  //       scaleY: 1,
  //       ease: 'power4.out',
  //       duration: 0.6
  //     });
  // }

}
