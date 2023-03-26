import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPieChartCategoryComponent } from './admin-pie-chart-category.component';

describe('AdminPieChartCategoryComponent', () => {
  let component: AdminPieChartCategoryComponent;
  let fixture: ComponentFixture<AdminPieChartCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPieChartCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPieChartCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
