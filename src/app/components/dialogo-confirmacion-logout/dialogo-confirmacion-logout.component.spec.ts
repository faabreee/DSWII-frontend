import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoConfirmacionLogoutComponent } from './dialogo-confirmacion-logout.component';

describe('DialogoConfirmacionLogoutComponent', () => {
  let component: DialogoConfirmacionLogoutComponent;
  let fixture: ComponentFixture<DialogoConfirmacionLogoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogoConfirmacionLogoutComponent]
    });
    fixture = TestBed.createComponent(DialogoConfirmacionLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});