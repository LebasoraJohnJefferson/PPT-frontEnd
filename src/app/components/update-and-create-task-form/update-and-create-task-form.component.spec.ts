import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAndCreateTaskFormComponent } from './update-and-create-task-form.component';

describe('UpdateAndCreateTaskFormComponent', () => {
  let component: UpdateAndCreateTaskFormComponent;
  let fixture: ComponentFixture<UpdateAndCreateTaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAndCreateTaskFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAndCreateTaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
