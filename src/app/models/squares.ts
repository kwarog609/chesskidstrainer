import { Component, Injectable } from "@angular/core";
import { Piece } from "./pieces";


// @Component({
//     selector: 'square',
// })

@Injectable()
export class Square
{
    public size: String = '50px';
    public cell_id: Number = 1;
    public cell_name: String = '';
    public color: String = 'black';
    // public piece1: String = '';
    // public piece_url: String = '';
    // public piece_color: String = '';
    public is_occupied: boolean = false;
    public piece: Piece;
    public rank: Number = 1;
    public file: String = '';
    private initial_piece:{[key: string]: string} = {a:'rook',b:'knight',c:'bishop',d:'queen',e:'king',f:'bishop',g:'knight',h:'rook',}


    constructor(
     cell_id: Number,
     cell_name: String,
     color: String ,  
     rank: Number,
     file: String,
  
     ){

    this.cell_id = cell_id;
    this.cell_name = cell_name;
    this.color = color;
    this.rank = rank;
    this.file = file;
    this.piece = new Piece('', 'white');

  // }
    }
    public add_piece(file: string, rank: number){
      //add piece if using the analyze and board set up
    }

    public set_piece(piece: Piece){
      this.piece = piece;
    }

    public get_name(): String {
      return this.cell_name
    }
    public get_file():number{
      return parseInt(this.file.valueOf() , 36) -9
      
    }  public get_rank(): number{
      return this.rank.valueOf()
    }

    public get_coordinates(cell_name: string): Array<number>{
      //get cell_name then returns the number values
      let file = parseInt(this.file.valueOf() , 36) -9
      return [file, this.rank.valueOf()]
    }

    public add_initial_piece(file: string, rank: number){
    // let piece = (rank == 2 || rank == 7) ? 'pawn' : '';
    let piece = ''
    let officer = this.initial_piece[file]
    let url_ext = ""
    let piece_color = ''
    let symbol = ''
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
     let url = 'assets/img/' + url_ext + piece + '.png';

    // console.log(this.initial_piece.[file] )
    // console.log(_.get(this.initial_piece, file))
    // return this.initial_piece[file]
    // console.log(Object.keys(this.initial_piece))
    this.piece = new Piece(piece, piece_color);

    this.piece.symbol
    if (this.piece.color == 'black'){
      this.piece.your_turn = false;
    }
    if (piece == ''){
      url = '';
    }
    this.piece.map_url(url);
    // console.log(url)
    
  }
}
