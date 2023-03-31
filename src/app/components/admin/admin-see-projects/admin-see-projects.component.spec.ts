import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSeeProjectsComponent } from './admin-see-projects.component';

describe('AdminSeeProjectsComponent', () => {
  let component: AdminSeeProjectsComponent;
  let fixture: ComponentFixture<AdminSeeProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSeeProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSeeProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
