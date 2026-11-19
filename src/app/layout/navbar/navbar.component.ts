import { Component, computed, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MytranslateService } from '../../core/services/mytranslate.service';
import { SubCategryService } from '../../core/services/sub-categry.service';
import { RegisterService } from '../../features/auth/services/register.service';
import { Router } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule, TranslatePipe],
  styleUrl: './navbar.component.css',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  private readonly myTranslate = inject(MytranslateService);
  private readonly registerService = inject(RegisterService);


  isloged = computed( ()=> this.registerService.isLogged() )

   categoriesOpen = signal(false);
  mobileOpen = signal(false);

  lang = this.myTranslate.lang;

  toggleLang(): void {
    this.myTranslate.toggle();
  }
  wishlistCount = computed(() => 0);
cartCount = computed(() => 0);
userName = computed(() => 'Usama');
  constructor() {
 
  this.router.events
    .pipe(filter(e => e instanceof NavigationEnd), takeUntilDestroyed())
    .subscribe(() => this.mobileOpen.set(false));
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
  }
private router = inject(Router);

  logout() {
  localStorage.removeItem('token');   
  this.registerService.isLogged.set(false);
  this.mobileOpen.set(false);
  this.router.navigate(['/login']);
}


mobileCategoriesOpen = signal(false);

toggleMobileCategories() {
  this.mobileCategoriesOpen.set(!this.mobileCategoriesOpen());
}

}