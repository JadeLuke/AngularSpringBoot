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

  submittedSupplier: Suppliers | null = null;

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

  showSupplierPreview() {
    if (this.newSupplier.name.trim() && this.newSupplier.contact.trim()) {
      this.submittedSupplier = {
        name: this.newSupplier.name,
        contact: this.newSupplier.contact,
        store: [...this.newSupplier.store]
      };
    }
  }

  addStoreItem() {
    if (!this.newItem.item_name.trim() || this.newItem.price <= 0 || this.newItem.quantity <= 0) {
      alert('Please enter valid item details.');
      return;
    }

    this.newSupplier.store.push({ ...this.newItem });
    this.newItem = { item_name: '', price: 0, quantity: 0 };
    this.showSupplierPreview();
  }

  addSupplier() {
    if (!this.newSupplier.name.trim() || !this.newSupplier.contact.trim()) {
      alert('Please fill in supplier name and contact.');
      return;
    }

    this.showSupplierPreview(); 
  }

  submitSupplier() {
    if (!this.submittedSupplier) {
      alert('Please add supplier information first.');
      return;
    }
  
    const { name, contact, store } = this.submittedSupplier;
  
    if (!name?.trim() || !contact?.trim()) {
      alert('Please fill in the supplier name and contact.');
      return;
    }
  
    if (!store || store.length === 0) {
      alert('Please add at least one store item before submitting.');
      return;
    }
  
    this.supplierService.addSupplier(this.submittedSupplier).subscribe(() => {
     this.loadSuppliers();
  
      // Reset form and preview
      this.newSupplier = { name: '', contact: '', store: [] };
      this.newItem = { item_name: '', price: 0, quantity: 0 };
      this.submittedSupplier = null;
  
      alert('Supplier submitted successfully.');
    }, (error) => {
      console.error('Failed to submit supplier:', error);
      alert('Something went wrong while submitting. Please check the backend.');
    });
  }
  
  deleteSupplier(index: number) {
  this.suppliers.splice(index, 1);
}

deleteItem(supplierIndex: number, itemIndex: number) {
  this.suppliers[supplierIndex].store.splice(itemIndex, 1);
}

  
  
}
