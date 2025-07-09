import {  Component, Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environments";
import { Items } from "../models/store.model";
import { StoreService } from "../services/store.service";
import { Router, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";


@Component({
  selector: 'app-storage',
  imports: [RouterModule,CommonModule],
   providers: [StoreService],
  templateUrl: './storage.component.html',
  styleUrl: './storage.component.css'
})
export class StorageComponent implements OnInit {


  items: Items[] = []
// item: any;

  constructor(private itemService: StoreService, private router: Router) {}

  ngOnInit(): void {
    this.getItems()
  }    


  getItems() {
    this.itemService.getItem().subscribe((data: Items[]) => {
      this.items = data
    })
  }

}