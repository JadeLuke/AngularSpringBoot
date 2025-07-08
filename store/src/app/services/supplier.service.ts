import {  Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environments";
import { Items } from "../models/store.model";




@Injectable({
    providedIn: "root"
})
export class SupplierService{
    getSuppliers() {
      throw new Error('Method not implemented.');
    }
  
    private apiUrl = environment.apiUrl;
     
    constructor (private http: HttpClient){}

    getItem(): Observable<Items[]>{
        return this.http.get<Items[]>(this.apiUrl+"/api/v1/store/")


    }}
