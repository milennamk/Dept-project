import { DOCUMENT } from '@angular/common';
import { Component, OnInit, HostListener, Inject, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  scrollFlag: boolean;
  isMenuCollapsed: boolean;
  menuOpenClass: string;
  renderer: Renderer2;

  constructor(@Inject(DOCUMENT) document, renderer: Renderer2) {


    this.scrollFlag = (window.scrollY > 50) ? true : false;
    this.isMenuCollapsed = true;
    this.menuOpenClass = this.isMenuCollapsed ? '' : 'menuOpen';
    this.renderer = renderer;
  }

  ngOnInit() {
    this.renderer.removeClass(document.body, 'menuOpen');
  }
  onMenuToggle() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    console.log(!this.isMenuCollapsed);
    if (!this.isMenuCollapsed) {
      this.renderer.addClass(document.body, 'menuOpen');
    } else {
      this.renderer.removeClass(document.body, 'menuOpen');
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(e: Event) {
    this.scrollFlag = (window.scrollY > 50) ? true : false;
  }

}
