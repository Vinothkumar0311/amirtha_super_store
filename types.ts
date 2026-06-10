
export interface Product {
  id: number;
  name: string;
  price?: number;
  originalPrice?: number;
  imageUrl: string;
  category: string;
  description: string;
}

export interface Category {
  id: number;
  name: string;
  imageUrl: string;
  productCount: number;
  description: string;
}
export interface GALLERY {
  id: number;
  name: string;
  imageUrl: string;
  productCount: number;
}
export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  location: string;
}

export interface NavLink {
    name:string;
    path: string;
    sublinks?: NavLink[];
}