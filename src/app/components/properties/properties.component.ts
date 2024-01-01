import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { PropertyModel } from 'src/app/models/property.model';
import { PropertyService } from 'src/app/services/property.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss'],
})
export class PropertiesComponent implements OnInit, AfterViewInit {
  @ViewChild('row') row!: ElementRef<HTMLDivElement>;

  constructor(private propertyService: PropertyService) {}
  allProperties$!: Observable<PropertyModel[]>;
  rentedProperties$!: Observable<PropertyModel[]>;
  notRentedProperties$!: Observable<PropertyModel[]>;

  ngOnInit(): void {
    this.rentedProperties$ = this.propertyService.getRentedProperties();
    this.notRentedProperties$ = this.propertyService.getNotRentedProperties();
    this.allProperties$ = combineLatest([
      this.rentedProperties$,
      this.notRentedProperties$,
    ]).pipe(
      map(([rentedProperties, notRentedProperties]) => {
        const newRentedProperties = rentedProperties.map(
          (property: PropertyModel) => ({
            ...property,
            isRented: true,
          })
        );
        const newNotRentedProperties = notRentedProperties.map(
          (property: PropertyModel) => ({
            ...property,
            isRented: false,
          })
        );
        return [newRentedProperties, newNotRentedProperties];
      }),
      map(([rentedProperties, notRentedProperties]) => [
        ...rentedProperties,
        ...notRentedProperties,
      ])
    );
  }

  ngAfterViewInit(): void {
    this.inititalAnimations();
  }

  inititalAnimations(): void {
    console.log('Row Element:', this.row);
    console.log('Child Nodes:', this.row.nativeElement.childNodes);
    gsap.from(this.row.nativeElement, {
      opacity: 0,
      scale: 0.5,
      y: 30,
      duration: 1.5,
      stagger: 0.2,
      delay: 0.5,
    });
  }
}
