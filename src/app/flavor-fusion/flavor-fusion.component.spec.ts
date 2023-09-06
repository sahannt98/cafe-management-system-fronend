import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlavorFusionComponent } from './flavor-fusion.component';

describe('FlavorFusionComponent', () => {
  let component: FlavorFusionComponent;
  let fixture: ComponentFixture<FlavorFusionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlavorFusionComponent]
    });
    fixture = TestBed.createComponent(FlavorFusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
