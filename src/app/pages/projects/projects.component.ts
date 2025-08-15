import { Component } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ScrollRevealDirective],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {

  ngOnInit() {
    document.body.classList.add('theme-projects');
  }
  ngOnDestroy() {
    document.body.classList.remove('theme-projects');
  }

}
