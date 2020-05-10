import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FootballViewComponent } from './football-view.component';

describe('FootballViewComponent', () => {
  let component: FootballViewComponent;
  let fixture: ComponentFixture<FootballViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootballViewComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FootballViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
