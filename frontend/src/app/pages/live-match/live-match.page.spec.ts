import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LiveMatchPage } from './live-match.page';

describe('LiveMatchPage', () => {
  let component: LiveMatchPage;
  let fixture: ComponentFixture<LiveMatchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveMatchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LiveMatchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
