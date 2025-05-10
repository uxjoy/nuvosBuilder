import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokersCardComponent } from './brokers-card.component';

describe('BrokersCardComponent', () => {
  let component: BrokersCardComponent;
  let fixture: ComponentFixture<BrokersCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrokersCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrokersCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
