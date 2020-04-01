import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddMatchPage } from './add-match.page';

describe('AddMatchPage', () => {
  let component: AddMatchPage;
  let fixture: ComponentFixture<AddMatchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMatchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddMatchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
