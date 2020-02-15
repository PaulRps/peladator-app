import { PaymentsService } from '../../payments.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PaymentFormComponent } from '../payment-form/payment-form.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss'],
})
export class PaymentListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  payments: MatTableDataSource<any> = new MatTableDataSource<any>();
  tableColumns: string[] = ['id', 'name', 'value', 'date'];

  constructor(private paymentsService: PaymentsService, private modalService: MatDialog) {}

  ngOnInit() {
    this.paginator.hidePageSize = true;
    this.paymentsService.getAll().subscribe(payments => {
      this.payments.data = payments;
      this.payments.paginator = this.paginator;
    });
    this.paymentsService.getEvent().subscribe(payments => (this.payments.data = payments));
  }

  select(row) {
    this.modalService.open(PaymentFormComponent, {
      autoFocus: false,
      data: row,
    });
  }

  create() {
    this.modalService.open(PaymentFormComponent, {
      autoFocus: false,
    });
  }
}
