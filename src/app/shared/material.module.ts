import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


const materialModules = [
  MatProgressSpinnerModule
]

@NgModule({
  declarations: [],
  imports: [
    ...materialModules,
    CommonModule
  ],exports:[
    ...materialModules
  ]
})
export class MaterialModule { }
