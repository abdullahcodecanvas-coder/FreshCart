import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartStyleComponent } from './cart-style.component';

describe('CartStyleComponent', () => {
  let component: CartStyleComponent;
  let fixture: ComponentFixture<CartStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartStyleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CartStyleComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
