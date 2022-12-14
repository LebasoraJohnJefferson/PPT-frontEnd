import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CivilEngineerComponent } from './civil-engineer.component';

describe('CivilEngineerComponent', () => {
  let component: CivilEngineerComponent;
  let fixture: ComponentFixture<CivilEngineerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CivilEngineerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CivilEngineerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
