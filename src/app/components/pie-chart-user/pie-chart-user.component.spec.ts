import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartUserComponent } from './pie-chart-user.component';

describe('PieChartUserComponent', () => {
  let component: PieChartUserComponent;
  let fixture: ComponentFixture<PieChartUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieChartUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PieChartUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
