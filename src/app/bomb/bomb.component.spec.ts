import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BombComponent } from './bomb.component';

describe('BombComponent', () => {
  let component: BombComponent;
  let fixture: ComponentFixture<BombComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BombComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BombComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set show_game_win to true if game has been won', function () {

    if (this.game_won == 4 && this.timer[0] != 0 && this.timer[1] != 0 && this.timer[2] != 0 && this.timer[3] != 0){
      expect(component.show_game_win).toBe(true)
    }
    else {
      expect(component.show_game_win).toBe(false)
    }
  });

  /*it('should set game_over to true if game has been lost', function () {

    if (this.timer[0] == 0.0 || this.timer[1] == 0.0 || this.timer[2] == 0.0 || this.timer[3] == 0.0 ) {
      expect(component.game_over).toBe(true)
    }
    else {
      expect(component.game_over).toBe(false)
    }

  }); */


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
