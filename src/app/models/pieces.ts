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

    return 'illegal'
      }

}
