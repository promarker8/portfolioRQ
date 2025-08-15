import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit {

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.opacity = '0';
    this.el.nativeElement.style.transform = 'translateY(40px)';
    this.el.nativeElement.style.transition = 'all 0.6s ease-out';
  }

  // IntersectionObserver is a built in browser API btw
  ngOnInit() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.el.nativeElement.style.opacity = '1';
          this.el.nativeElement.style.transform = 'translateY(0)';
          observer.unobserve(this.el.nativeElement);
        }
      });
    }, { threshold: 0.6 });

    observer.observe(this.el.nativeElement);
  }
}
