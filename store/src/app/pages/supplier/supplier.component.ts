import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupplierService } from '../../services/supplier.service';
import { Suppliers } from '../../models/supplier.model';
import { Items } from '../../models/store.model';

@Component({
  selector: 'app-supplier',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent {
  suppliers: Suppliers[] = [];
  showSuppliers = false;
  showStores = false;

  // Initialize here to avoid undefined errors
  newSupplier: Suppliers = {
    name: '',
    contact: '',
    store: []
  };

  newItem: Items = {
    item_name: '',
    price: 0,
    quantity: 0
  };

  constructor(private supplierService: SupplierService) {}

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers() {
    this.supplierService.getSuppliers().subscribe((data: Suppliers[]) => {
      this.suppliers = data || [];
    });
  }

  toggleSuppliers() {
    this.showSuppliers = true;
    this.showStores = false;
  }

  toggleStores() {
    this.showStores = true;
    this.showSuppliers = false;
  }

  addStoreItem() {
    if (!this.newItem.item_name.trim() || this.newItem.price <= 0 || this.newItem.quantity <= 0) {
      alert('Please enter valid item details.');
      return;
    }
    this.newSupplier.store.push({ ...this.newItem });
    this.newItem = { item_name: '', price: 0, quantity: 0 };
  }

  addSupplier() {
    if (!this.newSupplier.name.trim() || !this.newSupplier.contact.trim() || this.newSupplier.store.length === 0) {
      alert('Please fill in all supplier and store details.');
      return;
    }
  
    const supplierToSend = {
      name: this.newSupplier.name,
      contact: this.newSupplier.contact,
      store: this.newSupplier.store.map(item => ({
        item_name: item.item_name,
        price: item.price,
        quantity: item.quantity
      }))
    };
  
    console.log('Sending supplier:', supplierToSend);
  
    this.supplierService.addSupplier(supplierToSend).subscribe(() => {
      this.newSupplier = { name: '', contact: '', store: [] };
      this.loadSuppliers();
    }, (error) => {
      console.error('Failed to add supplier:', error);
    });
  }
  
  
}