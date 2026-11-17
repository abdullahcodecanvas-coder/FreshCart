import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PromoMarqueeComponent } from './promo-marquee.component';

describe('PromoMarqueeComponent', () => {
  let component: PromoMarqueeComponent;
  let fixture: ComponentFixture<PromoMarqueeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromoMarqueeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PromoMarqueeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
