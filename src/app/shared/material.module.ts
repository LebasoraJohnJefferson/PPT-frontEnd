import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatTableModule} from '@angular/material/table';
import {MatSliderModule} from '@angular/material/slider';


const materialModules = [
  MatProgressSpinnerModule,
  DragDropModule,
  MatIconModule,
  MatSelectModule,
  MatInputModule,
  MatStepperModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTableModule,
  MatSliderModule
]

@NgModule({
  declarations: [  
  ],
  imports: [
    ...materialModules,
    CommonModule
  ],exports:[
    ...materialModules,
  ]
})
export class MaterialModule { }
