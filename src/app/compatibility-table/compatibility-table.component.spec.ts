import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompatibilityTableComponent } from './compatibility-table.component';

describe('CompatibilityTableComponent', () => {
  let component: CompatibilityTableComponent;
  let fixture: ComponentFixture<CompatibilityTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompatibilityTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompatibilityTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
