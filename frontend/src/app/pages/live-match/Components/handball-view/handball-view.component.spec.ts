import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HandballViewComponent } from './handball-view.component';

describe('HandballViewComponent', () => {
  let component: HandballViewComponent;
  let fixture: ComponentFixture<HandballViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandballViewComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HandballViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
