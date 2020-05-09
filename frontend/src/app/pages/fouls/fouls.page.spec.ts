import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FoulsPage } from './fouls.page';

describe('FoulsPage', () => {
  let component: FoulsPage;
  let fixture: ComponentFixture<FoulsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoulsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FoulsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
