import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sort-teams',
  templateUrl: './sort-teams.component.html',
  styleUrls: ['./sort-teams.component.scss']
})
export class SortTeamsComponent implements OnInit {

  @Input() teams: any;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {}

}
