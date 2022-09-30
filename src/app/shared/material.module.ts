import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';

const materialModules = [
  MatProgressSpinnerModule,
  MatIconModule,
  MatSelectModule
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
