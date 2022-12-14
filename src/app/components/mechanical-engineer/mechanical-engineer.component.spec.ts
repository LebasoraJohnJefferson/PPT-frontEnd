import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MechanicalEngineerComponent } from './mechanical-engineer.component';

describe('MechanicalEngineerComponent', () => {
  let component: MechanicalEngineerComponent;
  let fixture: ComponentFixture<MechanicalEngineerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MechanicalEngineerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MechanicalEngineerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
