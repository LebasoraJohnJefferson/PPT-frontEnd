import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorWorkStationComponent } from './collaborator-work-station.component';

describe('CollaboratorWorkStationComponent', () => {
  let component: CollaboratorWorkStationComponent;
  let fixture: ComponentFixture<CollaboratorWorkStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollaboratorWorkStationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorWorkStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
