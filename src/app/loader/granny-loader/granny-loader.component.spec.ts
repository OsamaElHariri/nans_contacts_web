import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrannyLoaderComponent } from './granny-loader.component';

describe('GrannyLoaderComponent', () => {
  let component: GrannyLoaderComponent;
  let fixture: ComponentFixture<GrannyLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrannyLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrannyLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
