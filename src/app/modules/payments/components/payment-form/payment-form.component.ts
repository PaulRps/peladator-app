import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from 'src/app/core/services/dialog.service';
import { PaymentsService } from '../../payments.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Player } from 'src/app/shared/models/player.model';
import * as _moment from 'moment';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

export const MY_FORMATS = {
  parse: {
    dateInput: 'l',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'l',
    dateA11yLabel: 'l',
    monthYearA11yLabel: 'l',
  },
};

_moment.locale('pt-br');//TODO: fix date format

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-br' },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class PaymentFormComponent implements OnInit {
  paymentForm: FormGroup;
  players: Player[];

  constructor(
    public dialogRef: MatDialogRef<PaymentFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogService: DialogService,
    private paymentService: PaymentsService
  ) {
    this.paymentForm = new FormGroup({
      player: new FormControl(null, [Validators.required]),
      value: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit() {
    this.paymentService.getFormData().subscribe(formData => {
      this.players = formData.players;
      if (this.data) {
        this.paymentForm.setValue({
          player: this.data.player,
          value: this.data.value,
          date: new Date(this.data.date),
        });
      }
    });
  }

  submit(isDelete: boolean) {
    if (this.paymentForm.invalid) {
      this.paymentForm.markAllAsTouched();
      return;
    }

    const payment = {
      id: this.data && this.data.id ? this.data.id : null,
      player: this.f.player.value,
      value: this.f.value.value / 100,
      date: _moment(this.f.date.value).format('DD/MM/YYYY'),
    };

    if (isDelete) {
      this.paymentService.delete(this.data.id).subscribe();
    } else if (this.data) {
      this.paymentService.update(payment).subscribe();
    } else {
      this.paymentService.save(payment).subscribe();
    }

    this.paymentForm.reset();
    this.dialogRef.close();
  }

  get f() {
    return this.paymentForm.controls;
  }

  compareItemSelect(a, b) {
    return a && b ? a.id === b.id : a === b;
  }

  close() {
    this.dialogRef.close();
  }
}
