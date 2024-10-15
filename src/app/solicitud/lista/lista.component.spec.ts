import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudListaComponent } from './lista.component';

describe('SolicitudListaComponent', () => {
  let component: SolicitudListaComponent;
  let fixture: ComponentFixture<SolicitudListaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolicitudListaComponent]
    });
    fixture = TestBed.createComponent(SolicitudListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
