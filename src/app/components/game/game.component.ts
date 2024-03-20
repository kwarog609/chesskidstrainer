import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from '../board/board.component';
import { Square } from '../../models/squares';  
import { Board } from '../../models/boards';  
import { Piece } from '../../models/pieces';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [BoardComponent,CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements AfterViewInit{
// @Input() board!: Board;
player_one: string = 'Player One';
player_two: string = 'Player Two'
notation: Array<string> = [];
move: any;
send_player_move:string = '';
@ViewChild(BoardComponent) boardcomponentref!: BoardComponent;

ngAfterViewInit(){
  // this.boardcomponentref.board_name = "This is board number one"
  this.set_board_name('board game initialized')
}

public set_board_name(name: string){
  this.boardcomponentref.board_name = name;
}

public add_to_annotation(){
  alert("annotation added")
}
public method_to_execute_by_parent(notations: Array<string>){
  alert("this is from parent message called by the child method")
  this.notation = notations;
}

public receive_move(move: any){
  this.notation = move;
}

handle_player_move(){
  // send move to board 
  console.log('move sent')
  this.send_player_move = "this is the move to be sent" + Math.random()
}


}
