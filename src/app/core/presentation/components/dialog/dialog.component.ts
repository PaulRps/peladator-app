import { Component, EventEmitter, inject, OnInit, Output, SecurityContext } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent implements OnInit {
  htmlContent: string = '';
  constructor(private dom: DomSanitizer) {}

  ngOnInit(): void {
    if (this.data.htmlContent) {
      this.htmlContent = this.dom.sanitize(SecurityContext.HTML, this.data.htmlContent) || '';
    }
  }

  data = inject(MAT_DIALOG_DATA);
  confirm(): void {
    this.data?.onConfirm?.call();
  }
  cancel(): void {
    this.data?.onCancel?.call();
  }
}


