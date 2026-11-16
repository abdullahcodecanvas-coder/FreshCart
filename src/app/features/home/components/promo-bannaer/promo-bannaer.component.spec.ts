import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PromoBannaerComponent } from './promo-bannaer.component';

describe('PromoBannaerComponent', () => {
  let component: PromoBannaerComponent;
  let fixture: ComponentFixture<PromoBannaerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromoBannaerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PromoBannaerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
