import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TacticsPage } from './tactics.page';

describe('TacticsPage', () => {
  let component: TacticsPage;
  let fixture: ComponentFixture<TacticsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TacticsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TacticsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
