import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddFinePage } from './add-fine.page';

describe('AddFinePage', () => {
  let component: AddFinePage;
  let fixture: ComponentFixture<AddFinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFinePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddFinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
