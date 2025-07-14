import { Routes } from '@angular/router';
import { SupplierComponent } from './pages/supplier/supplier.component';
import { UpdateItemsComponent } from './pages/update-items/update-items.component';



export const routes: Routes = [
    {path: '', component: SupplierComponent},
    {path: 'edit/:id', component: UpdateItemsComponent},
   
    
];
