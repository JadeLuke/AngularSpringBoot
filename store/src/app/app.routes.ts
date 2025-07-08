import { Routes } from '@angular/router';
import { Store } from './pages/store/store.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {path: '', component: StoreComponent},
    {path: 'home', component: HomeComponent}
];
