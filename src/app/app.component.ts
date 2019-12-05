import { Component, OnInit } from '@angular/core';
import { NgwWowService } from 'ngx-wow';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  constructor(private wowService: NgwWowService) {
    this.wowService.init(); 
  }
  ngOnInit() {
   
  }

  
}
