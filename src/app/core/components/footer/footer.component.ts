import { APIInfoService } from './../../services/apiinfo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  apiInfo: any;
  constructor(private apiInfoService: APIInfoService) {}

  ngOnInit(): void {
    this.apiInfo = this.apiInfoService.APIInfo;
  }
}
