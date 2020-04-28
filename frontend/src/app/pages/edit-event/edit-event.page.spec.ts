import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditEventPage } from './edit-event.page';

describe('EditEventPage', () => {
  let component: EditEventPage;
  let fixture: ComponentFixture<EditEventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEventPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
