import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


const materialModules = [
  MatProgressSpinnerModule,
  MatIconModule,
  MatSelectModule,
  MatInputModule,
  MatStepperModule,
  MatDatepickerModule,
  MatNativeDateModule
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
