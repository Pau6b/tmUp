import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TeamBasketballComponent } from './team-basketball.component';

describe('TeamBasketballComponent', () => {
  let component: TeamBasketballComponent;
  let fixture: ComponentFixture<TeamBasketballComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamBasketballComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TeamBasketballComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
