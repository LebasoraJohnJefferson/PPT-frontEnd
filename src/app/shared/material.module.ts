import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';

const materialModules = [
  MatProgressSpinnerModule,
  MatIconModule,
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
