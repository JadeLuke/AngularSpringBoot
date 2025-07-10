import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Suppliers } from '../models/supplier.model';
import { environment } from '../environments/environments';

@Injectable({ providedIn: 'root' })
export class SupplierService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getSuppliers(): Observable<Suppliers[]> {
    return this.http.get<Suppliers[]>(`${this.apiUrl}/api/v1/supplier/`);
  }

  addSupplier(supplier: Suppliers): Observable<Suppliers> {
    return this.http.post<Suppliers>(`${this.apiUrl}/api/v1/supplier/`, supplier);
  }


  

}
