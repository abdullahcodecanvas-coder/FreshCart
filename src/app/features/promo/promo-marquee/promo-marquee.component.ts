import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [TranslatePipe],
  selector: 'app-promo-marquee',
  styleUrl: './promo-marquee.component.css',
  templateUrl: './promo-marquee.component.html',
})
export class PromoMarqueeComponent {
  promos = [
    { key: 'bankInstallment', icon: 'fa-solid fa-building-columns', bg: 'bg-gradient-to-br from-rose-700 to-red-900' },
    { key: 'buyNow', icon: 'fa-solid fa-credit-card', bg: 'bg-gradient-to-br from-emerald-500 to-green-700' },
    { key: 'discount', icon: 'fa-solid fa-tags', bg: 'bg-gradient-to-br from-amber-400 to-orange-500' },
    { key: 'freeShipping', icon: 'fa-solid fa-truck-fast', bg: 'bg-gradient-to-br from-sky-500 to-blue-700' },
    { key: 'freshProducts', icon: 'fa-solid fa-leaf', bg: 'bg-gradient-to-br from-lime-500 to-green-600' },
    { key: 'support', icon: 'fa-solid fa-headset', bg: 'bg-gradient-to-br from-violet-500 to-purple-700' },
    { key: 'easyReturn', icon: 'fa-solid fa-rotate-left', bg: 'bg-gradient-to-br from-pink-500 to-rose-600' },
    { key: 'securePayment', icon: 'fa-solid fa-shield-halved', bg: 'bg-gradient-to-br from-teal-500 to-cyan-700' },
  ];

  // نكرر القائمة مرتين عشان اللوب يبقى سلس
  loopItems = [...this.promos, ...this.promos];
}