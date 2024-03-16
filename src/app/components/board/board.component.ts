import { Component, Type, ElementRef, ViewChild, OnInit, AfterViewInit} from '@angular/core';
import { CellComponent } from '../cell/cell.component';
import { CommonModule } from '@angular/common';
import { Square } from '../../models/squares';  
import { Board } from '../../models/boards';  
import { NONE_TYPE } from '@angular/compiler';
import { Piece } from '../../models/pieces';


@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CellComponent, CommonModule, ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
// template: `
// <h1>Test Angular Programmatic Click Event</h1>

// <div #namedElement (click)="showAlert('Clicked namedElement')">
//   Named element
// </div>
// `,
export class BoardComponent implements OnInit,AfterViewInit   {
  public board:Board;
  public empty_board;
  public size: number = 64;
  public board_dim: string = '400px';
  public is_legal: boolean = true;
  public player_turn: string = "white";
  public current_drag:any;

  public game_notations: Array<string> = [];
  public game_notation_number: number = 1;


  constructor(){
    this.board = new Board;
    this.empty_board = this.board.board;
    this.board.populate_board();
    console.log("this is the empty board at index o: " + this.empty_board[0]);

  }

    // @ViewChild('dragevent') dragevent: ElementRef<HTMLElement>;
    // @ViewChild('testtrigger') testtrigger: ElementRef;
    // @ViewChild('myDiv', { read: ElementRef }) myDiv: ElementRef<HTMLElement>;
    @ViewChild('testtrigger', {static: false}) testtrigger!: ElementRef
    @ViewChild('testtriggerbutton') testtriggerbutton!: ElementRef<HTMLElement>;
    @ViewChild('forlooptrigger') forlooptrigger!: ElementRef<HTMLElement>;
    //use for automoving if the game access database games
    // trigger_onDragStart(){
    //   let el: HTMLElement = this.dragevent.nativeElement;
    //   el.click
    // }
  ngAfterViewInit(){
    // this.testtrigger.nativeElement.click();
  }

  ngOnInit() {

  
  }
   // implement later
  method_to_call_trigger(){
    let el: HTMLElement = this.testtriggerbutton.nativeElement;
    el.click()
  }
  testclick(){
    alert("autoclicked test")
  }
  calltestclick(){
    alert("manual trigger")
  }


  onDragStart(cell: any){
    this.current_drag = cell;
  }
  onDrop(event: any, move: Square){
    console.log("ondrop")
    //this is to call the method that triggers the other method from html
    // this.method_to_call_trigger()
    try {
    if ( this.board.check_legal(this.current_drag, move) == true && this.current_drag.piece.your_turn) {
      console.log("check legal returned true")
      var count: number;

      this.player_turn = (this.player_turn == 'black') ? "white":"black";
      const index = parseInt(String(move.cell_id)) - 1;
      console.log("using the parameter move: " + move.cell_name + " piece: " + move.piece.piece)
      
      console.log("this is the index: " + index + "this is the destination square: " + this.board.board[index].cell_name)
      this.board.board[index].piece = this.current_drag.piece;
      this.board.board[index].piece.first_move = false;

      // game notation
      if (move.piece.color == 'white'){
        this.game_notations.push(parseInt(String(this.game_notation_number)) +". " + move.piece.symbol + move.cell_name)
      } else {
        this.game_notations.push(move.piece.symbol +  move.cell_name)
        this.game_notation_number += 1
      }
      
      this.board.board.forEach((square)=>{
        ///to add player freezing if not your turn
        if (square.piece.color == this.player_turn){
          square.piece.your_turn = true;
        } else {
          square.piece.your_turn = false;
        }
       
      });
      

      console.log(" this is the current drag piece: " + this.current_drag.piece)
      // then set null the from place
      this.current_drag.piece = new Piece('','no color')

      console.log(this.board.board[index])

    }
  } catch(error){
    console.log("error: " + error)
  }
  }
  onDragover(event: any){
    console.log("ondropover")
    event.preventDefault()
  }

  populate(){
  }
}
