import { PropertyService } from './services/property.service';
import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('menu', { static: true })
  menu!: ElementRef<HTMLDivElement>;
  @ViewChild('menuSecond', { static: true })
  menuSecond!: ElementRef<HTMLDivElement>;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private propertyService: PropertyService
  ) {}
  ngOnInit(): void {
    this.inititalAnimations(), this.propertyService.initializeDb();
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
