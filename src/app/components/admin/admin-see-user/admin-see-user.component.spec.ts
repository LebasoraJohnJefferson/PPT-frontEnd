import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSeeUserComponent } from './admin-see-user.component';

describe('AdminSeeUserComponent', () => {
  let component: AdminSeeUserComponent;
  let fixture: ComponentFixture<AdminSeeUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSeeUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSeeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
