import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgMeComponent } from './svg-me.component';

describe('SvgMeComponent', () => {
  let component: SvgMeComponent;
  let fixture: ComponentFixture<SvgMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvgMeComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SvgMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
