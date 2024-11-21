import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetirarLivrosComponent } from './retirar-livros.component';

describe('RetirarLivrosComponent', () => {
  let component: RetirarLivrosComponent;
  let fixture: ComponentFixture<RetirarLivrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetirarLivrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetirarLivrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
