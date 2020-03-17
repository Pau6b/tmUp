import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GettingstartedPage } from './gettingstarted.page';

describe('GettingstartedPage', () => {
  let component: GettingstartedPage;
  let fixture: ComponentFixture<GettingstartedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GettingstartedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GettingstartedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
