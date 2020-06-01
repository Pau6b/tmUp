import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FootballRankingComponent } from './football-ranking.component';

describe('FootballRankingComponent', () => {
  let component: FootballRankingComponent;
  let fixture: ComponentFixture<FootballRankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootballRankingComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FootballRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
