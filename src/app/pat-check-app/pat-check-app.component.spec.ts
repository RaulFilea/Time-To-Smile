import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatCheckAppComponent } from './pat-check-app.component';

describe('PatCheckAppComponent', () => {
  let component: PatCheckAppComponent;
  let fixture: ComponentFixture<PatCheckAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatCheckAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatCheckAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
