import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-gray-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <!-- Company Info -->
          <div>
            <div class="flex items-center space-x-2 mb-4">
              <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <span class="text-white font-bold text-lg">💊</span>
              </div>
              <span class="font-bold text-lg">Big Pharma</span>
            </div>
            <p class="text-gray-400">
              Your trusted online pharmacy for quality medications and healthcare products.
            </p>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="font-semibold mb-4">Quick Links</h3>
            <ul class="space-y-2 text-gray-400">
              <li><a href="/" class="hover:text-white transition">Home</a></li>
              <li><a href="/products" class="hover:text-white transition">Shop</a></li>
              <li><a href="/about" class="hover:text-white transition">About Us</a></li>
              <li><a href="/contact" class="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          <!-- Support -->
          <div>
            <h3 class="font-semibold mb-4">Support</h3>
            <ul class="space-y-2 text-gray-400">
              <li><a href="/faq" class="hover:text-white transition">FAQ</a></li>
              <li><a href="/shipping" class="hover:text-white transition">Shipping Info</a></li>
              <li><a href="/returns" class="hover:text-white transition">Returns</a></li>
              <li><a href="/privacy" class="hover:text-white transition">Privacy Policy</a></li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div>
            <h3 class="font-semibold mb-4">Contact Us</h3>
            <ul class="space-y-2 text-gray-400">
              <li>📧 support@bigpharma.com</li>
              <li>📞 +1 (555) 123-4567</li>
              <li>📍 123 Medical Ave, Healthcare City</li>
              <li>⏰ Mon-Fri: 9AM - 6PM</li>
            </ul>
          </div>
        </div>

        <!-- Divider -->
        <div class="border-t border-gray-700 pt-8">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <p class="text-gray-400">
              &copy; 2026 Big Pharma. All rights reserved.
            </p>
            <div class="flex space-x-6 mt-4 md:mt-0">
              <a href="#" class="text-gray-400 hover:text-white transition">Facebook</a>
              <a href="#" class="text-gray-400 hover:text-white transition">Twitter</a>
              <a href="#" class="text-gray-400 hover:text-white transition">Instagram</a>
              <a href="#" class="text-gray-400 hover:text-white transition">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {}
