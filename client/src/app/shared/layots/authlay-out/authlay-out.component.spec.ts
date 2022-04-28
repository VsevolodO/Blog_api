import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthlayOutComponent } from './authlay-out.component';

describe('AuthlayOutComponent', () => {
  let component: AuthlayOutComponent;
  let fixture: ComponentFixture<AuthlayOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthlayOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthlayOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
