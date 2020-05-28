import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HandballRankingComponent } from './handball-ranking.component';

describe('HandballRankingComponent', () => {
  let component: HandballRankingComponent;
  let fixture: ComponentFixture<HandballRankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandballRankingComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HandballRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
