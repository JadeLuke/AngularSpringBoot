import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';


import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, RouterModule],
  providers: [storeService],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class StorageComponent implements OnInit {
  storeService: any;
updateItem(arg0: any) {
throw new Error('Method not implemented.');
}
  item:items[] = []
item: any | undefined;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getItems()
  }    
  getItems() {
    throw new Error('Method not implemented.');
  }

  getUsers() {
    this.storeService.getUsers().subscribe((data: Item[]) => {
      this.item = data
    })
  }

}
