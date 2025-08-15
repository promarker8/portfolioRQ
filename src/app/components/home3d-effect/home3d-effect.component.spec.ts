import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home3dEffectComponent } from './home3d-effect.component';

describe('Home3dEffectComponent', () => {
  let component: Home3dEffectComponent;
  let fixture: ComponentFixture<Home3dEffectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home3dEffectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Home3dEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
