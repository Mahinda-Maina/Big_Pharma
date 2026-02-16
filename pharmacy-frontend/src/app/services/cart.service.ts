import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem, Product } from '../models';

const CART_STORAGE_KEY = 'pharmacy_cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private platformId = inject(PLATFORM_ID);
  private cartSubject = new BehaviorSubject<CartItem[]>(this.getCartFromStorage());
  public cart$ = this.cartSubject.asObservable();

  private cartCountSubject = new BehaviorSubject<number>(this.getCartFromStorage().length);
  public cartCount$ = this.cartCountSubject.asObservable();

  constructor() {}

  getCart(): CartItem[] {
    return this.cartSubject.value;
  }

  addToCart(product: Product, quantity: number = 1): void {
    const cart = this.getCart();
    const existingItem = cart.find((item) => item.product_id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        product_id: product.id,
        product,
        quantity,
      });
    }

    this.updateCart(cart);
  }

  removeFromCart(productId: number): void {
    const cart = this.getCart().filter((item) => item.product_id !== productId);
    this.updateCart(cart);
  }

  updateQuantity(productId: number, quantity: number): void {
    const cart = this.getCart();
    const item = cart.find((i) => i.product_id === productId);

    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        this.updateCart(cart);
      }
    }
  }

  getCartTotal(): number {
    return this.getCart().reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  getCartItemCount(): number {
    return this.getCart().reduce((count, item) => count + item.quantity, 0);
  }

  clearCart(): void {
    this.updateCart([]);
  }

  private updateCart(cart: CartItem[]): void {
    this.cartSubject.next(cart);
    this.cartCountSubject.next(cart.length);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  }

  private getCartFromStorage(): CartItem[] {
    if (!isPlatformBrowser(this.platformId)) {
      return [];
    }
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
  }
}
