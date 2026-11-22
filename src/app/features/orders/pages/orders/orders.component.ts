import { DatePipe, isPlatformBrowser } from '@angular/common';
import {  Orders } from '../../interface/order.interface';
import { OrderService } from './../../services/order.service';
import { Component, inject, OnInit, PLATFORM_ID, signal} from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { TranslatePipe } from '@ngx-translate/core';



@Component({
  imports: [DatePipe , TranslatePipe],
  selector: 'app-orders',
  styleUrl: './orders.component.css',
  templateUrl: './orders.component.html',
})
export class OrdersComponent implements OnInit {
  private readonly orderService =inject(OrderService)
    private readonly platformId = inject(PLATFORM_ID);
  orders = signal<Orders[]>([]);
ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.showOrder();
    }
  }

  showOrder(): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    const decoded: any = jwtDecode(token);

    this.orderService.getAllOrders(decoded.id).subscribe({
     next: (res) => {
  const sorted = [...res].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  this.orders.set(sorted);
},
      error: (err) => console.log(err),
    });
  }
  }