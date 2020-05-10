import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelfFootballComponent } from './self-football.component';

describe('SelfFootballComponent', () => {
  let component: SelfFootballComponent;
  let fixture: ComponentFixture<SelfFootballComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfFootballComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelfFootballComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
