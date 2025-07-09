import {  Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environments";
import { Suppliers } from "../models/supplier.model";




@Injectable({
    providedIn: "root"
})
export class SupplierService{
    getSuppliers() {
      throw new Error('Method not implemented.');
    }
  
    private apiUrl = environment.apiUrl;
     
    constructor (private http: HttpClient){}

    getSupplier
    (): Observable<Suppliers[]>{
        return this.http.get<Suppliers[]>(this.apiUrl+"/api/v1/store/")


    }}
