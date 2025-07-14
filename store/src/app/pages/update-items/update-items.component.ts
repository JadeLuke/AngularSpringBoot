import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoreService } from '../../services/store.service';
import { SupplierService } from '../../services/supplier.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-update-items',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './update-items.component.html',
  styleUrl: './update-items.component.css'
})
export class UpdateItemsComponent {

  itemForm: FormGroup;

  itemId!: number;
  supplieId!: number;

  constructor(private fb: FormBuilder, private storeService: StoreService, private supplieService: SupplierService, private route: ActivatedRoute, private router: Router){
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      contact: ['', Validators.required],
      item_name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(0)]]
    })
  }

  ngOnInit(): void {
    this.supplieId = Number(this.route.snapshot.paramMap.get('id'));
    
  }
 

}
