import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
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
