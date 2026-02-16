import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Order } from '../models';
import { environment } from '../utils/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private api: ApiService) {}

  createOrder(orderData: any): Observable<Order> {
    return new Observable((observer) => {
      this.api
        .post<Order>(environment.apiEndpoints.orders, orderData)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  getOrders(): Observable<Order[]> {
    return new Observable((observer) => {
      this.api
        .get(environment.apiEndpoints.orders)
        .then((response) => {
          observer.next((response.data as any).data || response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  getOrder(id: number): Observable<Order> {
    return new Observable((observer) => {
      this.api
        .get<Order>(`${environment.apiEndpoints.orders}/${id}`)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
