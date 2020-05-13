import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelfBasketballComponent } from './self-basketball.component';

describe('SelfBasketballComponent', () => {
  let component: SelfBasketballComponent;
  let fixture: ComponentFixture<SelfBasketballComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfBasketballComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelfBasketballComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
