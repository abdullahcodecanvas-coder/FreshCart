import { Component, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MytranslateService } from '../../core/services/mytranslate.service';
import { SubCategryService } from '../../core/services/sub-categry.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule, TranslatePipe],
  styleUrl: './navbar.component.css',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  private readonly myTranslate = inject(MytranslateService);

  categoriesOpen = signal(false);
  mobileOpen = signal(false);

  lang = this.myTranslate.lang;

  toggleLang(): void {
    this.myTranslate.toggle();
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
}