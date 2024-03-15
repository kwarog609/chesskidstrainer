import { Component, Type, } from '@angular/core';
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
export class BoardComponent {
  public board:Board;
  public empty_board;
  // public board1: Array<Square> = [];
  public size: number = 64;
  public board_dim: string = '400px';
  // public rank: number = 8;
  public is_legal: boolean = true;
  public player_turn: string = "white";
  // public file: Array<string> = ['a','b','c','d','e','f','g','h',];
  // public initial_piece:{[key: string]: string} = {a:'rook',b:'knight',c:'bishop',d:'queen',e:'king',f:'bishop',g:'knight',h:'rook',}
  // public square: Square[] = [];
  public current_drag:any;
  // public board_index: Array<any> = [
  //   ['a8','b8','c8','d8','e8','f8','g8','h8',],
  //   ['a7','b7','c7','d7','e7','f7','g7','h7',],
  //   ['a6','b6','c6','d6','e6','f6','g6','h6',],
  //   ['a5','b5','c5','d5','e5','f5','g5','h5',],
  //   ['a4','b4','c4','d4','e4','f4','g4','h4',],
  //   ['a3','b3','c3','d3','e3','f3','g3','h3',],
  //   ['a2','b2','c2','d2','e2','f2','g2','h2',],
  //   ['a1','b1','c1','d1','e1','f1','g1','h1',]
  // ]
  

  constructor(){
    this.board = new Board;
    this.empty_board = this.board.board;
    this.board.populate_board();
    console.log("this is the empty board at index o: " + this.empty_board[0]);

  }
  ngOnInit() {
    // this.board.push(
    //  this.board = new Board;
    // var hasName = (name === 'true') ? 'Y' :'N';
    // for(let i:number=1; i <= (this.size); i++){
    //   // color = (color === 'white') ? 'white' :'black';
    //   this.board1.push(new Square(i,'','white', false))
    // }
    // for(let file=1; file <= 8; file++){
    //   color = (color == bcolor) ? wcolor :bcolor;
    //   for(let file=1; file <= 8; file++){
    //     console.log("file" + file + "col" + file)
    //      color = (color == bcolor) ? wcolor :bcolor;
    //      this.board1.push(new Square(count,'',color, false))
    //      count++
    //     //  color = "black"
    //     //  this.board1.push(new Square(col,'',color, false))
    //   }
    // } 
//This populates the board
 // this.board.push(
  // this.board = new Board;
  // this.empty_board = this.board.board;
  // this.board.populate_board();
  
  }
  

  onDragStart(cell: any){
    this.current_drag = cell;

  }
  onDrop(event: any, move: Square){
    console.log("ondrop")
    try {
    if ( this.board.check_legal(this.current_drag, move) == true) {
      console.log("check legal returned true")
      // console.log(cell.piece)
      // console.log(this.board1[index])
      // console.log(this.current_drag.cell_name)
      // console.log(this.current_drag.piece)
      // to drop place = from current drag
      this.player_turn = (this.player_turn == 'black') ? "white":"black";
      const index = parseInt(String(move.cell_id)) - 1;
      console.log("using the parameter move: " + move.cell_name + " piece: " + move.piece.piece)
      
      // this.board1[index].piece = this.current_drag.piece
      // this.board1[index].piece_url = this.current_drag.piece_url 
      // this.board1[index].piece_color = this.current_drag.piece_color
      console.log("this is the index: " + index + "this is the destination square: " + this.board.board[index].cell_name)
      this.board.board[index].piece = this.current_drag.piece;
      this.board.board[index].piece.first_move = false;
  
      this.board.board.forEach((square)=>{
        ///to add player freezing if not your turn
        if (square.piece.color == this.player_turn){
          square.piece.not_your_turn = false;
        } else {
          square.piece.not_your_turn = true;
        }
       
      });
      

      console.log(" this is the current drag piece: " + this.current_drag.piece)
      // then set null the from place
      this.current_drag.piece = new Piece('','no color')

      // this.current_drag.piece.url= ''  
      console.log(this.board.board[index])
    // } else {
    //   console.log("illegal move");
    // 
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
