import { Component,  } from '@angular/core';
import { CellComponent } from '../cell/cell.component';
import { CommonModule } from '@angular/common';
import { Square } from '../../models/squares';  
import {Piece} from '../../models/pieces';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CellComponent, CommonModule, ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {
  public board: Array<CellComponent> = [];
  public board1: Array<Square> = [];
  public size: number = 64;
  public board_dim: string = '400px';
  public rank: number = 8;
  public is_legal: boolean = true;
  public player_turn: string = "white";
  public file: Array<string> = ['a','b','c','d','e','f','g','h',];
  public initial_piece:{[key: string]: string} = {a:'rook',b:'knight',c:'bishop',d:'queen',e:'king',f:'bishop',g:'knight',h:'rook',}
  public square: Square[] = [];
  public current_drag:any;
  public board_index: Array<any> = [
    ['a8','b8','c8','d8','e8','f8','g8','h8',],
    ['a7','b7','c7','d7','e7','f7','g7','h7',],
    ['a6','b6','c6','d6','e6','f6','g6','h6',],
    ['a5','b5','c5','d5','e5','f5','g5','h5',],
    ['a4','b4','c4','d4','e4','f4','g4','h4',],
    ['a3','b3','c3','d3','e3','f3','g3','h3',],
    ['a2','b2','c2','d2','e2','f2','g2','h2',],
    ['a1','b1','c1','d1','e1','f1','g1','h1',]
  ]
  

  constructor(){

  }
  ngOnInit() {
    // this.board.push(
    for(let i=0; i < (this.size); i++){
      this.board.push(new CellComponent())
    }

    // var hasName = (name === 'true') ? 'Y' :'N';
    // for(let i:number=1; i <= (this.size); i++){
    //   // color = (color === 'white') ? 'white' :'black';
    //   this.board1.push(new Square(i,'','white', false))
    // }
    let color = "white"
    let bcolor = 'green'
    let wcolor = 'white'
    let count = 1
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
    let piece = ''
//This populates the board
    for(let rank=8; rank >= 1; rank--) {
      color = (color == bcolor) ? wcolor :bcolor;
      this.file.forEach(files => {
         color = (color == bcolor) ? wcolor :bcolor;
         let piece = this.assign_officer(rank, files)
         const name = (files + String(rank))
         this.board1.push(new Square(count,name,color, piece[0], piece[1], piece[2], rank, files))
         count++
      })
    }
  }
  private get_position(file: number, rank: number) {
    //returns a square name
    let move = String.fromCharCode(96 + file) + "" + rank
    return move
  }

  private get_index(name: String){
    //returns rank and file in number
    let file =  ((this.board1.filter(x => x.cell_name == name))[0].file).valueOf()
    let rank = ((this.board1.filter(x => x.cell_name == name))[0].rank).valueOf()
    // convert numbers to letters String.fromCharCode(97 + n)
    // let possible_moves = String.fromCharCode(97 + current_square_rank)
    let file_transformed = parseInt(file , 36) -9
    console.log("file: " + file + '  rank: ' + rank)
    return [file_transformed, rank]
  }

  private check_legal_moves(from_square: String, piece: String, color: String, target_square: string): string{
      //possible moves
      //parseInt('a', 36) - 9 convert to number
    let piece_color = color
    let file = this.get_index(from_square)[0]
    let rank = this.get_index(from_square)[1]
    switch(piece){
      case 'pawn':{
        if (piece_color == 'white') {
            rank += 1;
        } else {
          rank -= 1;
        }

        // console.log("possible moves: " + possible_moves)
      let move = this.get_position(file, rank)
      console.log("move: " + move)
      let possible_moves = (this.board1.filter(x => x.cell_name == move))[0];
      console.log("possible move: " + possible_moves.cell_name)
      console.log("possible move: " + possible_moves.piece)
      console.log("target square: " + target_square)
      if(((possible_moves.piece) == '' && target_square == move)) {
        console.log('legal')
        return 'legal'
        } else {
          break;
        }
        
      }
      case 'king':{
        break;
      } case 'queen':{
        break;
      } case 'rook':{
        break;
      } case 'knight':{
        break;
      } case 'bishop':{
        break;
      } default:{
        break;
      }
    }
    return 'illegal'
  }

  private check_legal(move_from: Square, move_to: Square): boolean{
    // checks if the move is legal
    // calls out of bounds
    console.log(move_from.cell_name + " to --> " + move_to.cell_name)
    const piece = move_from.piece;
    const from_square = (move_from.cell_name)
    const to_square = move_to.cell_name
    const piece_color = move_from.piece_color

    // call move checker 
    const current_square = this.board1.filter(x => x.cell_name == from_square) //returns current square
    const target_square = this.board1.filter(x => x.cell_name == to_square) // returns target square
    console.log(current_square)
    
    if(this.check_legal_moves(from_square, piece, piece_color, target_square[0].cell_name.valueOf()) == 'legal'){
      return true;
    }

    return false;
  }
  private  assign_officer(rank: number, file: string): any{
    // let piece = (rank == 2 || rank == 7) ? 'pawn' : '';
    let piece = ''
    let officer = this.initial_piece[file]
    let url_ext = ""
    let piece_color = ''
    if(rank == 2  ){
     piece = 'pawn';
     url_ext = "w_"
     piece_color = 'white'
    } else if (rank == 7){
      piece = 'pawn';
      url_ext = "b_"
      piece_color = 'black'
    } else if (rank == 8){
      piece = officer;
      url_ext = "b_"
      piece_color = 'black'
    } else if (rank == 1){
      piece = officer;
      url_ext = "w_"
      piece_color = 'white'
    } else {
     piece = ''
    }
    const url = 'assets/img/' + url_ext + piece + '.png';

    // console.log(this.initial_piece.[file] )
    // console.log(_.get(this.initial_piece, file))
    // return this.initial_piece[file]
    // console.log(Object.keys(this.initial_piece))
    return [piece , url, piece_color]
  }

  onDragStart(cell: any){
    this.current_drag = cell;
    console.log(this.current_drag.cell_name)

  }
  onDrop(event: any, move: Square){
    console.log("ondrop")
    if ( this.check_legal(this.current_drag, move) == true ) {
      // console.log(cell.piece)
      // console.log(this.board1[index])
      // console.log(this.current_drag.cell_name)
      // console.log(this.current_drag.piece)
      // to drop place = from current drag
      this.player_turn = (this.player_turn == 'black') ? "white":"black";
      const index = parseInt(String(move.cell_id)) - 1;
      this.board1[index].piece = this.current_drag.piece
      this.board1[index].piece_url = this.current_drag.piece_url 
      this.board1[index].piece_color = this.current_drag.piece_color
      // then set null the from place
      this.current_drag.piece = ''
      this.current_drag.piece_url = ''
      console.log(this.board1[index])
    } else {
      console.log("illegal move");
    }
  }
  onDragover(event: any){
    console.log("ondropover")
    event.preventDefault()
  }

  populate(){
  }
}
