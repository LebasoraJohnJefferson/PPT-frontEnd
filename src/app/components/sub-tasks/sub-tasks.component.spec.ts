import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubTasksComponent } from './sub-tasks.component';

describe('SubTasksComponent', () => {
  let component: SubTasksComponent;
  let fixture: ComponentFixture<SubTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
