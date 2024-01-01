import { Injectable } from '@angular/core';

import {
  Firestore,
  collection,
  doc,
  getDocs,
  writeBatch,
} from '@angular/fire/firestore';
import { PropertyModel } from '../models/property.model';
import { data } from '../models/rantedProperties';
import { data2 } from '../models/notRantedProperties';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private readonly rentedFlatCollectionRef = collection(
    this.firestore,
    'rentedFlats'
  );
  private readonly notRentedFlatCollectionRef = collection(
    this.firestore,
    'notRentedFlats'
  );
  constructor(private firestore: Firestore) {}
  public async initializeDb(): Promise<void> {
    await this.dropCollection('rentedFlats');
    await this.uploadCollection('rentedFlats', data);
    await this.dropCollection('notRentedFlats');
    await this.uploadCollection('notRentedFlats', data2);
  }

  private async dropCollection(collectionName: string): Promise<void> {
    console.log(`Dropping collection ${collectionName}`);

    const c = collection(this.firestore, collectionName);
    const snapshot = await getDocs(c);

    const batch = writeBatch(this.firestore);
    for (let doc of snapshot.docs) {
      batch.delete(doc.ref);
    }
    await batch.commit();

    console.log(`Done!`);
  }

  private async uploadCollection(
    collectionName: string,
    data: PropertyModel[]
  ) {
    console.log(`Uploading collection ${collectionName}`);

    const collectionRef = collection(this.firestore, collectionName);
    const batch = writeBatch(this.firestore);
    data.forEach((data) => {
      const ref = doc(collectionRef);
      batch.set(ref, data);
    });
    await batch.commit();

    console.log(`Done!`);
  }

  getRentedProperties(): Observable<PropertyModel[]> {
    return from(getDocs(this.rentedFlatCollectionRef)).pipe(
      map((snapshot) => {
        const resultList = snapshot.docs.map((doc) => {
          const rentedFlatData: PropertyModel = doc.data() as PropertyModel;
          rentedFlatData.id = doc.id;
          return rentedFlatData;
        });
        return resultList;
      })
    );
  }
  getNotRentedProperties(): Observable<PropertyModel[]> {
    return from(getDocs(this.notRentedFlatCollectionRef)).pipe(
      map((snapshot) => {
        const resultList = snapshot.docs.map((doc) => {
          const notRentedFlatData: PropertyModel = doc.data() as PropertyModel;
          notRentedFlatData.id = doc.id;
          return notRentedFlatData;
        });
        return resultList;
      })
    );
  }
}
