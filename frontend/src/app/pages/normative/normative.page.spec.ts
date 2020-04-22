import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NormativePage } from './normative.page';

describe('NormativePage', () => {
  let component: NormativePage;
  let fixture: ComponentFixture<NormativePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormativePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NormativePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
