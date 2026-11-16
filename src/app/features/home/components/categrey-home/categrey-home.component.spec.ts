import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategreyHomeComponent } from './categrey-home.component';

describe('CategreyHomeComponent', () => {
  let component: CategreyHomeComponent;
  let fixture: ComponentFixture<CategreyHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategreyHomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CategreyHomeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
