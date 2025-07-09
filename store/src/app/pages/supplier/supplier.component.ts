import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { SupplierService } from '../../services/supplier.service';
import {  Suppliers } from '../../models/supplier.model';

@Component({
  selector: 'app-supplier',
   imports: [RouterModule,CommonModule],
providers: [SupplierService],
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.css'
})
export class SupplierComponent implements OnInit {

  suppliers: Suppliers[] = []
  SupplierService: any;
 
// item: any;

  constructor(private supplierService: SupplierService, private router: Router) {}

  ngOnInit(): void {
       this.getSuppliers()
  }    


    getSuppliers() {
      this.supplierService.getSupplier().subscribe((data: Suppliers[]) => {
        this.suppliers = data
      })
    }
}

