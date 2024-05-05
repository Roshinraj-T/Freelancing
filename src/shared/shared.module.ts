import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
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
    ToastModule,
    DialogModule,
    InputTextareaModule
  ],
  exports:[
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    CardModule,
    DropdownModule,
    ToastModule,
    DialogModule,
    InputTextareaModule
  ]
})
export class SharedModule { }
