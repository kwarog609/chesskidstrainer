import { Component, Injectable } from "@angular/core";

// @Component({
//     selector: 'square',
// })
@Injectable()
export class Piece
{
    public piece: String = '';
    public color: String = 'black';
    public url: String = '';
    public pawn: String = 'pawn';
    public knight: String = 'knight';
    public bishop: String = 'bishop';
    public rook: String = 'rook';
    public king: String = 'king';
    public queen: String = 'queen';
    public first_move: boolean = true;
    public your_turn: boolean = true;
    public symbol: string = '';
    // public moves:Array<string> = [];
    public map_to_letter: Array<string> = ['a','b','c','d','e','f','g','h'];
    

    constructor(
      
     piece: String,
     color: String ,

     ){
    this.piece = piece;
    this.color = color;
    this.url = '';

    if(this.piece == 'pawn'){
      this.symbol = '';
    } else if (this.piece == 'knight'){
      this.symbol = 'N'
    } else {
      this.symbol = this.piece.charAt(0).toUpperCase();
    }

    }

    public map_url(url: String){
      this.url = url
    }
    public default_piece(){
      
    }



    private check_legal_moves(from_square: String, piece: String, color: String, target_square: string): string{
      //     //possible moves
      //     //parseInt('a', 36) - 9 convert to number
      //   let piece_color = color
      //   let file = this.get_index(from_square)[0]
      //   let rank = this.get_index(from_square)[1]
      //   switch(piece){
      //     case 'pawn':{
      //       if (piece_color == 'white') {
      //           rank += 1;
      //       } else {
      //         rank -= 1;
      //       }
    
      //       // console.log("possible moves: " + possible_moves)
      //     let move = this.get_position(file, rank)
      //     console.log("move: " + move)
      //     let possible_moves = (this.board1.filter(x => x.cell_name == move))[0];
      //     console.log("possible move: " + possible_moves.cell_name)
      //     console.log("possible move: " + possible_moves.piece)
      //     console.log("target square: " + target_square)
      //     if(((possible_moves.piece) == '' && target_square == move)) {
      //       console.log('legal')
      //       return 'legal'
      //       } else {
      //         break;
      //       }
            
      //     }
      //     case 'king':{
      //       break;
      //     } case 'queen':{
      //       break;
      //     } case 'rook':{
      //       break;
      //     } case 'knight':{
      //       break;
      //     } case 'bishop':{
      //       break;
      //     } default:{
      //       break;
      //     }
      //   }
    return 'illegal'
      }

}
