import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TeamFootballComponent } from './team-football.component';

describe('TeamFootballComponent', () => {
  let component: TeamFootballComponent;
  let fixture: ComponentFixture<TeamFootballComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamFootballComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TeamFootballComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
