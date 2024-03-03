import { Component, Injectable } from "@angular/core";


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
    public piece: String = '';
    public piece_url: String = '';
    public rank: Number = 1;
    public file: String = '';


    constructor(
     cell_id: Number,
     cell_name: String,
     color: String ,
     piece: String,
     piece_url: String,
     rank: Number,
     file: String,

     ){

    this.cell_id = cell_id;
    this.cell_name = cell_name;
    this.color = color;
    this.piece = piece;
    this.piece_url = piece_url;
    this.rank = rank;
    this.file = file;


  // }
    }
}
