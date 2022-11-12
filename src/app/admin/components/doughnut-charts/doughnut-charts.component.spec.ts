import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoughnutChartsComponent } from './doughnut-charts.component';

describe('DoughnutChartsComponent', () => {
  let component: DoughnutChartsComponent;
  let fixture: ComponentFixture<DoughnutChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoughnutChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoughnutChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
