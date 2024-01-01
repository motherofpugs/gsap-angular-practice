import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { PropertyModel } from 'src/app/models/property.model';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss'],
})
export class PropertiesComponent implements OnInit {
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
}
