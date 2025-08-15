import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  ngOnInit() {
    document.body.classList.add('theme-contact');
  }
  ngOnDestroy() {
    document.body.classList.remove('theme-contact');
  }

}
