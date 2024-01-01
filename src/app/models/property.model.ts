export interface PropertyModel {
  id?: string;
  title: string;
  city: string;
  address: string;
  size: number;
  rooms: number;
  isRented?: boolean;
  isPetsAllowed: boolean;
  imgUrl: string;
}
