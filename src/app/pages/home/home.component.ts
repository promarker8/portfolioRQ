import { Component } from '@angular/core';
import { Home3dEffectComponent } from "../../components/home3d-effect/home3d-effect.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Home3dEffectComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
