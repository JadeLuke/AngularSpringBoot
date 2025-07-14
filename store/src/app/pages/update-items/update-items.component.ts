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
  styleUrl: './update-items.component.css',
  providers: [StoreService, SupplierService]
})
export class UpdateItemsComponent {

  itemForm: FormGroup;

  itemId!: number;
  supplierId!: number;

  constructor(private fb: FormBuilder, private storeService: StoreService, private supplierService: SupplierService, private route: ActivatedRoute, private router: Router){
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      contact: ['', Validators.required],
      item_name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(0)]]
    })
  }

  ngOnInit(): void {
    this.supplierId = Number(this.route.snapshot.paramMap.get('id'));


    if(this.supplierId){
      this.supplierService.getSupplierById(this.supplierId).subscribe((supplier) => {
        const item = supplier.store[0];
        this.itemId = item.id!;

        this.itemForm.patchValue({
          name: supplier.name,
          contact: supplier.contact,
          item_name: item.item_name,
          price: item.price,
          quantity: item.quantity
        })
      })
    }
    
  }

  updateItem(): void {
    if (this.itemForm.invalid) return;
  
    const supplierData = new FormData();
    supplierData.append('name', this.itemForm.get('name')?.value);
    supplierData.append('contact', this.itemForm.get('contact')?.value);
  
    const itemData = new FormData();
    itemData.append('item_name', this.itemForm.get('item_name')?.value);
    itemData.append('price', this.itemForm.get('price')?.value.toString());
    itemData.append('quantity', this.itemForm.get('quantity')?.value.toString());
  
    this.supplierService.updateSupplier(this.supplierId, supplierData).subscribe({
      next: (response) => {
        this.storeService.updateItem(this.itemId, itemData).subscribe({
          next: (res) => {
            console.log('Item updated successfully', res);
            this.router.navigate(['/']);
          },
          error: (err) => {
            console.error('Error updating item', err);
          }
        });
      },
      error: (error) => {
        console.error('Error updating supplier', error);
      }
    });
  }
  
  

}
