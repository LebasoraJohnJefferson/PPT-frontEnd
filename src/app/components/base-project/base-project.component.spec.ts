import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseProjectComponent } from './base-project.component';

describe('BaseProjectComponent', () => {
  let component: BaseProjectComponent;
  let fixture: ComponentFixture<BaseProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
