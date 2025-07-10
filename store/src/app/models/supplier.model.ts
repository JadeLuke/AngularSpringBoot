import { Items } from "./store.model";

export interface Suppliers {
    id?: number;
    name: string;
    contact: string;
    store: Items[]; 
  }