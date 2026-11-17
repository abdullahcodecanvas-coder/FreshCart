import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-promo-marquee',
  styleUrl: './promo-marquee.component.css',
  templateUrl: './promo-marquee.component.html',
})
export class PromoMarqueeComponent {
 promos = [
    {
      icon: 'fa-solid fa-building-columns',
      title: 'قسّط مع بنك مصر',
      desc: 'تقسيط حتى 24 شهر بدون فوائد',
      bg: 'bg-gradient-to-br from-rose-700 to-red-900',
    },
    {
      icon: 'fa-solid fa-credit-card',
      title: 'اشتري دلوقتي وقسّط',
      desc: 'ابدأ بمقدم 0%',
      bg: 'bg-gradient-to-br from-emerald-500 to-green-700',
    },
    {
      icon: 'fa-solid fa-tags',
      title: 'خصم 20%',
      desc: 'على أول طلب ليك',
      bg: 'bg-gradient-to-br from-amber-400 to-orange-500',
    },
    {
      icon: 'fa-solid fa-truck-fast',
      title: 'شحن مجاني',
      desc: 'على الطلبات فوق 500 جنيه',
      bg: 'bg-gradient-to-br from-sky-500 to-blue-700',
    },
  ];

  // نكرر القائمة مرتين عشان اللوب يبقى سلس
 loopItems = [...this.promos, ...this.promos];
}
