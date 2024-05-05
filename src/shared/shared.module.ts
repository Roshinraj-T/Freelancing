import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    CardModule,
    DropdownModule,
    ToastModule
  ],
  exports:[
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    CardModule,
    DropdownModule,
    ToastModule
  ]
})
export class SharedModule { }
