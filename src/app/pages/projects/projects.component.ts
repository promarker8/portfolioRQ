import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
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
