import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { SupplierService } from '../../services/supplier.service';
import { Supplier } from '../../models/supplier.model';

@Component({
  selector: 'app-supplier',
   imports: [RouterModule,CommonModule],

  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.css'
})
export class SupplierComponent implements OnInit {

  items: Supplier[] = []
  suppliers: Supplier[];
// item: any;

  constructor(private suppliersService: SupplierService, private router: Router) {}

  ngOnInit(): void {
    this.getSuppliers()
  }    


  getSuppliers() {
    this.suppliersService.getSuppliers().subscribe((data: Supplier[]) => {
      this.suppliers = data
    })
  }

}

