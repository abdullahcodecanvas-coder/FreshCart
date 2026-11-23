import { Component, computed, HostListener, inject, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MytranslateService } from '../../core/services/mytranslate.service';
import { SubCategryService } from '../../core/services/sub-categry.service';
import { RegisterService } from '../../features/auth/services/register.service';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CartService } from '../../features/cart/services/cart.service';
import { WishlistService } from '../../features/wishlist/services/wishlist.service';
import { SearchService } from '../../core/services/search.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule, TranslatePipe],
  styleUrl: './navbar.component.css',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  private readonly myTranslate = inject(MytranslateService);
  private readonly registerService = inject(RegisterService);
  private readonly cartservices = inject(CartService);
  private readonly wishlistServices = inject(WishlistService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly searchService = inject(SearchService)

onSearch(Event:InputEvent){
 const value = (Event.target as HTMLInputElement).value
 this.searchService.setItem(value)
}



  isloged = computed( ()=> this.registerService.isLogged() )

   categoriesOpen = signal(false);
  mobileOpen = signal(false);

  lang = this.myTranslate.lang;

  toggleLang(): void {
    this.myTranslate.toggle();
  }

  wishlistCount = computed(() => this.wishlistServices.count());
cartCount = computed(() => this.cartservices.count());

userName = signal<string>('');

  constructor() {
 
  this.router.events
    .pipe(filter(e => e instanceof NavigationEnd), takeUntilDestroyed())
    .subscribe(() => this.mobileOpen.set(false));

      if (isPlatformBrowser(this.platformId)) {
    const user = localStorage.getItem('user');
    if (user) {
      this.userName.set(JSON.parse(user).name);
    }
  }
}

closeMobile() {
    this.mobileOpen.set(false);
  this.mobileCategoriesOpen.set(false);
}


  toggleCategories(e: Event) {
    e.stopPropagation();
    this.categoriesOpen.update((v) => !v);
  }

  @HostListener('document:click')
  closeAll() {
    this.categoriesOpen.set(false);
  }
  private readonly subCategryService = inject(SubCategryService)
  subCategry = signal<SubCategry[]>([]);
  ngOnInit(): void {
    this.getAllSubCategry()
  }
  getAllSubCategry():void{
    this.subCategryService.GetAllSubCategories().subscribe({
      next:(res)=>{
        this.subCategry.set(res.data)
      }
    })
    if (isPlatformBrowser(this.platformId) && localStorage.getItem('token')) {
    this.cartservices.refreshCount();
    this.wishlistServices.refreshCount();
  }

  }
private router = inject(Router);

logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');

  this.registerService.isLogged.set(false);
  this.mobileOpen.set(false);
  this.router.navigate(['/login']);
}


mobileCategoriesOpen = signal(false);

toggleMobileCategories() {
  this.mobileCategoriesOpen.set(!this.mobileCategoriesOpen());
}

}