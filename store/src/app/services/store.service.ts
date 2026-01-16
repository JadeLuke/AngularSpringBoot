import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Items } from "../models/store.model";
import { environment } from "../environments/environments";

@Injectable({
  providedIn: "root"
})
export class StoreService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}


  getItems(): Observable<Items[]> {
    return this.http.get<Items[]>(`${this.apiUrl}/api/v1/store/`);
  }

  addItem(item: Items): Observable<Items> {
    return this.http.post<Items>(`${this.apiUrl}/api/v1/store/`, item);
  }

  getItemById(id: number): Observable<Items>{
    return this.http.get<Items>(`${this.apiUrl}/api/v1/store/${id}`);
  }

  updateItem(id: number, item:FormData): Observable<any>{
 return this.http.put(`${this.apiUrl}/api/v1/store/${id}`, item);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/v1/store/${id}`, { responseType: 'text' });
  }
  
}
