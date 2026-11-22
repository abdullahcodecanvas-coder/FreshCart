import { Component } from '@angular/core';
import { AsideLeftComponent } from '../../component/aside-left/aside-left.component';
import { RouterOutlet } from '@angular/router';


@Component({
  imports: [AsideLeftComponent, RouterOutlet],
  selector: 'app-profile',
  styleUrl: './profile.component.css',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {}
