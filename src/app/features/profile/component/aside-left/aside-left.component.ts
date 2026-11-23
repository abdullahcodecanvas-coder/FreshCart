import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [RouterLink, RouterLinkActive , TranslatePipe],
  selector: 'app-aside-left',
  styleUrl: './aside-left.component.css',
  templateUrl: './aside-left.component.html',
})
export class AsideLeftComponent {}
