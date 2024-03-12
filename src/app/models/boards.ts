import { Component, Injectable } from "@angular/core";

// @Component({
//     selector: 'square',
// })
@Injectable()
export class Board
{
    public piece: String = '';
    public color: String = 'black';
    public piece_url: String = '';
    constructor(
     piece: String,
     color: String ,
     piece_url: String,
     ){
    this.piece = piece;
    this.color = color;
    this.piece_url = piece_url;
  // }
    }
}
