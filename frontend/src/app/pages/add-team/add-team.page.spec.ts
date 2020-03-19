import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddTeamPage } from './add-team.page';

describe('AddTeamPage', () => {
  let component: AddTeamPage;
  let fixture: ComponentFixture<AddTeamPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTeamPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddTeamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
