import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddTacticPage } from './add-tactic.page';

describe('AddTacticPage', () => {
  let component: AddTacticPage;
  let fixture: ComponentFixture<AddTacticPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTacticPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddTacticPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
