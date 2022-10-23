import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonAsideOpenComponent } from './button-aside-open.component';

describe('ButtonAsideOpenComponent', () => {
  let component: ButtonAsideOpenComponent;
  let fixture: ComponentFixture<ButtonAsideOpenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonAsideOpenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonAsideOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
