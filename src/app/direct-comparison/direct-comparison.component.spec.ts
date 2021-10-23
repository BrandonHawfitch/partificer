import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectComparisonComponent } from './direct-comparison.component';

describe('DirectComparisonComponent', () => {
  let component: DirectComparisonComponent;
  let fixture: ComponentFixture<DirectComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectComparisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
