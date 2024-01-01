import { Component } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  @ViewChild('menu', { static: true })
  menu!: ElementRef<HTMLDivElement>;
  @ViewChild('menuSecond', { static: true })
  menuSecond!: ElementRef<HTMLDivElement>;

  constructor(@Inject(DOCUMENT) private document: Document) {}
  ngOnInit(): void {
    this.inititalAnimations();
  }

  inititalAnimations(): void {
    gsap.from(this.menu.nativeElement.childNodes, {
      duration: 0.5,
      opacity: 0,
      y: -20,
      stagger: 0.2,
      delay: 0.5,
    });
    gsap.from(this.menuSecond.nativeElement.childNodes, {
      duration: 0.5,
      opacity: 0,
      y: -20,
      stagger: 0.2,
      delay: 0.8,
    });
  }
}
