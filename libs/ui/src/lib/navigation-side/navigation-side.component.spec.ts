import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NavigationSideComponent } from './navigation-side.component';

describe('NavigationSideComponent', () => {
  let component: NavigationSideComponent;
  let fixture: ComponentFixture<NavigationSideComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
