import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { trigger, transition, style, animate, query, group } from '@angular/animations';
import { NavbarComponent } from './components/navbar/navbar.component';

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
export class AppComponent { }