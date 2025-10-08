import { Component } from '@angular/core';
import { PlaneComponent } from '../../components/plane/plane.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [PlaneComponent, ScrollRevealDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

  ngOnInit() {
    document.body.classList.add('theme-about');
  }
  ngOnDestroy() {
    document.body.classList.remove('theme-about');
  }

}
