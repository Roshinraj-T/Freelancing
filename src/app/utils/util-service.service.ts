import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class UtilServiceService {

  constructor(
    private messageService: MessageService
  ) { }
  digitsOnly(){

  }
  showSuccess(summary: string, detail: string) {
    this.messageService.add({
      severity: 'success', // Severity for success
      summary,
      detail,
    });
  }
  showError(summary: string, detail: string) {
    this.messageService.add({
      severity: 'error', // Severity for error
      summary,
      detail,
    });
  }

}
