import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolverLivrosComponent } from './devolver-livros.component';

describe('DevolverLivrosComponent', () => {
  let component: DevolverLivrosComponent;
  let fixture: ComponentFixture<DevolverLivrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevolverLivrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevolverLivrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
