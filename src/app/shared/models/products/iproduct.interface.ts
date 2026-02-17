import { Ibrand } from "../brands/ibrand.interface";
import { Icategory } from "../categories/icategory.interface";
import { Isubcategory } from "../subcategories/isubcategory.interface";

export interface Iproduct {
  sold: number;
  images: string[];
  subcategory: Isubcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Icategory;
  brand: Ibrand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
  __v?:number;
  reviews?:any[];
}
