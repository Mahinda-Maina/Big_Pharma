import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Product } from '../models';
import { environment } from '../utils/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private api: ApiService) {}

  getProducts(params?: any): Observable<any> {
    return new Observable((observer) => {
      this.api
        .get(environment.apiEndpoints.products, { params })
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  getProduct(id: number): Observable<Product> {
    return new Observable((observer) => {
      this.api
        .get<Product>(`${environment.apiEndpoints.products}/${id}`)
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  searchProducts(query: string, category?: number): Observable<Product[]> {
    return new Observable((observer) => {
      const params: any = { search: query };
      if (category) {
        params.category_id = category;
      }

      this.api
        .get(environment.apiEndpoints.products, { params })
        .then((response) => {
          observer.next((response.data as any).data || response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
