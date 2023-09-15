import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminAsideComponent } from './super-admin-aside.component';

describe('SuperAdminAsideComponent', () => {
  let component: SuperAdminAsideComponent;
  let fixture: ComponentFixture<SuperAdminAsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperAdminAsideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAdminAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
