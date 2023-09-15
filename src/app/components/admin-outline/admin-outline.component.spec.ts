import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOutlineComponent } from './admin-outline.component';

describe('AdminOutlineComponent', () => {
  let component: AdminOutlineComponent;
  let fixture: ComponentFixture<AdminOutlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOutlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOutlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
