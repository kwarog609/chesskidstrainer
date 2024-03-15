import { Component, Injectable } from "@angular/core";
import { Square } from "./squares";
import { Piece } from "./pieces";   

// @Component({
//     selector: 'square',
// })
@Injectable()
export class Board
{
    public board: Array<Square> = [];
    public file: Array<string> = ['a','b','c','d','e','f','g','h',];
    public rank: number = 8;
    public size: number = 64;
    // public piece?: Piece;
    

    constructor(){
    let color = "white"
    let bcolor = 'green'
    let wcolor = 'white'
    let count = 1
    for(let rank=8; rank >= 1; rank--) {
      color = (color == bcolor) ? wcolor :bcolor;
      this.file.forEach(files => {
         color = (color == bcolor) ? wcolor :bcolor;
         const name = (files + String(rank))
         this.board.push(new Square(count,name,color, rank, files))
         count++
      })
    }
    console.log("this is the constructed board: " + this.board)
  }

  // }
  public populate_board(){
    let count = 0
    for(let rank=8; rank >= 1; rank--) {
      this.file.forEach(files => {
         const name = (files + String(rank))
        //  console.log(count)
        //  console.log(name);
        this.board[count].add_initial_piece(files, rank);
        count++;
        })
    }
    console.log("this is the populated board: " + this.board[0])
  }

  public get_piece(cell_name: string){
    return (this.board.filter(x => x.cell_name == cell_name))[0].piece
  }


  public is_occupied(cell_name: string){
    console.log(this.board.filter(x => x.cell_name == cell_name));
    try {
    let piece =  ((this.board.filter(x => x.cell_name == cell_name))[0].piece.piece.valueOf())
    console.log("this is the piece that occupies the square: " + piece)
    if (piece == ''){
      return false
    } else {
      return true
    }

   }catch(error){
      // alert("error: " + error);
      return false
    }
  }

  public can_move_to(cell_name: string, move_from: any): boolean{ //not currently in use
    // checks if the square is occupied and the piece is capturable
    console.log(this.board.filter(x => x.cell_name == cell_name));
    try {
    let piece =  ((this.board.filter(x => x.cell_name == cell_name))[0].piece)
    if (piece.piece.valueOf() == ''){
      return true
    } else if(piece.piece.valueOf() != '' && piece.color != move_from.piece.color){
      return true
    } else if(piece.piece.valueOf() != ''){
      return false
    }else{
      return false
    }
   } catch(error){
      alert("there is an error: " + error)
      return false
    }
  }
  public can_capture(cell_name: string, move_from: any): boolean{
    // checks if the square is occupied and the piece is capturable
    console.log(this.board.filter(x => x.cell_name == cell_name));
    try {
    let piece =  ((this.board.filter(x => x.cell_name == cell_name))[0].piece)
    
    if(piece.color.valueOf() == move_from.piece.color){
      return false
    } else if(piece.color.valueOf() != move_from.piece.color){
      return true
    } else {
      console.log("no color")
      return false
    }
   } catch(error){
      alert("there is an error: " + error)
      return false
    }
  }

  public occupant_color(cell_name: string){ //not currently in use
    try {
    let color =  ((this.board.filter(x => x.cell_name == cell_name))[0].piece.color)
    console.log("this is the color of the piece that occupies the square: " + color)
    if (color == ''){
      return 'no color'
    } else {
    return color
    }
    } catch(error) {
      return 'no color'
    }
  }


  public add_moves(move: any, move_to:any){ //not currently in use
    let moves:Array<string> = [];
    console.log("moving square: " + move_to.piece.piece)

    if(move_to.piece.piece == '') {
      moves.push(move)
      console.log("These are the added moves: " + moves)
    } else {


    } 
    return moves
  }

  public map_coordinates(file: number, rank: number):string{
    // returns cell name from parameter file and rank
    // console.log("the mapped coordinate is: " + this.map_to_letter[file] + rank)
    if (rank <= 0 || rank >=9) {
      return ''
    } else if (file <= 0 || file >=9){
      return ''
    } else {
      return (this.file[file-1] + rank)
    }
    // return 'test'
  }

  public get_vertical_moves(move_from: any): Array<string>{
    let moves:Array<string> = [];
    var rank = move_from.get_rank()
    var file = move_from.get_file()
      rank++
      for((rank); rank <= 8; rank++){
        if (!this.is_occupied(this.map_coordinates(file, rank))){
          moves.push(this.map_coordinates(file, rank))
        } else if (this.is_occupied(this.map_coordinates(file, rank)) && this.can_capture(this.map_coordinates(file, rank), move_from)){
          moves.push(this.map_coordinates(file, rank))
          break;
        } else {
          break;
        }
      }
      return moves
  }
  public get_negative_vertical_moves(move_from: any): Array<string>{
    let moves:Array<string> = [];
    var rank = move_from.get_rank()
    var file = move_from.get_file()
      rank--
      for(rank; rank >= 1; rank--){
        if (!this.is_occupied(this.map_coordinates(file, rank))){
          moves.push(this.map_coordinates(file, rank))
        } else if (this.is_occupied(this.map_coordinates(file, rank)) && this.can_capture(this.map_coordinates(file, rank), move_from)){
          moves.push(this.map_coordinates(file, rank))
          break;
        } else {
          break;
        }
      }
      return moves
  }
  public get_horizontal_moves(move_from: any): Array<string>{
    let moves:Array<string> = [];
    var rank = move_from.get_rank()
    var file = move_from.get_file()
      file++
      for((file); file <= 8; file++){
        if (!this.is_occupied(this.map_coordinates(file, rank))){
          moves.push(this.map_coordinates(file, rank))
        } else if (this.is_occupied(this.map_coordinates(file, rank)) && this.can_capture(this.map_coordinates(file, rank), move_from)){
          moves.push(this.map_coordinates(file, rank))
          break;
        } else {
          break;
        }
      }
      return moves
  }

  public get_negative_horizontal_moves(move_from: any): Array<string>{
    let moves:Array<string> = [];
    var rank = move_from.get_rank()
    var file = move_from.get_file()
      file--
      for(file; file >= 1; file--){
        if (!this.is_occupied(this.map_coordinates(file, rank))){
          moves.push(this.map_coordinates(file, rank))
        } else if (this.is_occupied(this.map_coordinates(file, rank)) && this.can_capture(this.map_coordinates(file, rank), move_from)){
          moves.push(this.map_coordinates(file, rank))
          break;
        } else {
          break;
        }
      }
      return moves
  }
  
  public get_left_to_right_diagonal_moves(){
    
  }
  public get_right_to_left_diagonal_moves(){
    
  }



  public get_legal(file: number, rank: number, move_from: any, move_to: any): Array<string>{
    let moves:Array<string> = [];
    let move_from_color = move_from.piece.color
    switch(move_from.piece.piece){
        case 'pawn':{
          var x = 1
          if(move_from.piece.first_move){
            if (!this.is_occupied(this.map_coordinates(file,rank+1)) && move_from_color != this.occupant_color(this.map_coordinates(file,rank+1))){ moves.push(this.map_coordinates(file,rank+1)) }
            if (!this.is_occupied(this.map_coordinates(file,rank+2)) && move_from_color != this.occupant_color(this.map_coordinates(file,rank+2))){ moves.push(this.map_coordinates(file,rank+2)) }
            if (this.is_occupied(this.map_coordinates(file+1,rank+x)) && move_from_color != this.occupant_color(this.map_coordinates(file+1,rank+x))){ moves.push(this.map_coordinates(file+1,rank+x)) }
            if (this.is_occupied(this.map_coordinates(file-1,rank+x)) && move_from_color != this.occupant_color(this.map_coordinates(file-1,rank+x))){ moves.push(this.map_coordinates(file-1,rank+x)) }
           
            if (move_from_color == 'black') {
            if (!this.is_occupied(this.map_coordinates(file,rank-1)) && move_from_color != this.occupant_color(this.map_coordinates(file,rank-1))){ moves.push(this.map_coordinates(file,rank-1)) }
            if (!this.is_occupied(this.map_coordinates(file,rank-2)) && move_from_color != this.occupant_color(this.map_coordinates(file,rank-2))){ moves.push(this.map_coordinates(file,rank-2)) }  
            if (this.is_occupied(this.map_coordinates(file-1,rank-x)) && move_from_color != this.occupant_color(this.map_coordinates(file-1,rank-x))){ moves.push(this.map_coordinates(file-1,rank-x)) }
            if (this.is_occupied(this.map_coordinates(file+1,rank-x)) && move_from_color != this.occupant_color(this.map_coordinates(file+1,rank-x))){ moves.push(this.map_coordinates(file+1,rank-x)) }
            
          }
          } else {
            
            if (!this.is_occupied(this.map_coordinates(file,rank+x)) && move_from_color != this.occupant_color(this.map_coordinates(file,rank+x))){ moves.push(this.map_coordinates(file,rank+x)) }
            if (this.is_occupied(this.map_coordinates(file+1,rank+x)) && move_from_color != this.occupant_color(this.map_coordinates(file+1,rank+x))){ moves.push(this.map_coordinates(file+1,rank+x)) }
            if (this.is_occupied(this.map_coordinates(file-1,rank+x)) && move_from_color != this.occupant_color(this.map_coordinates(file-1,rank+x))){ moves.push(this.map_coordinates(file-1,rank+x)) }
            
            if (move_from_color == 'black') {
            if (!this.is_occupied(this.map_coordinates(file,rank-x)) && move_from_color != this.occupant_color(this.map_coordinates(file,rank-x))){ moves.push(this.map_coordinates(file,rank-x)) }
            if (this.is_occupied(this.map_coordinates(file-1,rank-x)) && move_from_color != this.occupant_color(this.map_coordinates(file-1,rank-x))){ moves.push(this.map_coordinates(file-1,rank-x)) }
            if (this.is_occupied(this.map_coordinates(file+1,rank-x)) && move_from_color != this.occupant_color(this.map_coordinates(file+1,rank-x))){ moves.push(this.map_coordinates(file+1,rank-x)) }
            
          }
          }

          return moves
        }case 'king':{
            if (!this.is_occupied(this.map_coordinates(file,rank+1)) || move_from_color != this.occupant_color(this.map_coordinates(file,rank+1))){ moves.push(this.map_coordinates(file,rank+1)) }
            if (!this.is_occupied(this.map_coordinates(file+1,rank+1)) || move_from_color != this.occupant_color(this.map_coordinates(file+1,rank+1))){ moves.push(this.map_coordinates(file+1,rank+1)) }
            if (!this.is_occupied(this.map_coordinates(file-1,rank+1)) || move_from_color != this.occupant_color(this.map_coordinates(file-1,rank+1))){ moves.push(this.map_coordinates(file-1,rank+1)) }
            if (!this.is_occupied(this.map_coordinates(file-1,rank-1)) || move_from_color != this.occupant_color(this.map_coordinates(file-1,rank-1))){ moves.push(this.map_coordinates(file-1,rank-1)) }
            if (!this.is_occupied(this.map_coordinates(file,rank-1)) || move_from_color != this.occupant_color(this.map_coordinates(file,rank-1))){ moves.push(this.map_coordinates(file,rank-1)) }
            if (!this.is_occupied(this.map_coordinates(file+1,rank-1)) || move_from_color != this.occupant_color(this.map_coordinates(file+1,rank-1))){ moves.push(this.map_coordinates(file+1,rank-1)) }
            if (!this.is_occupied(this.map_coordinates(file+1,rank)) || move_from_color != this.occupant_color(this.map_coordinates(file+1,rank))){ moves.push(this.map_coordinates(file+1,rank)) }
            if (!this.is_occupied(this.map_coordinates(file+-1,rank)) || move_from_color != this.occupant_color(this.map_coordinates(file+-1,rank))){ moves.push(this.map_coordinates(file+-1,rank)) }
          return moves

        } case 'queen':{
          let x = 0;
          let y = 0;
          let file_opposite = file
          let rank_opposite = rank
          for(let i = rank; y <=8; i++){
            for(let j = file ; x <=8; j++){
              if(x == y) {
              if (!this.is_occupied(this.map_coordinates(j,i)) || move_from_color != this.occupant_color(this.map_coordinates(j,i))){ moves.push(this.map_coordinates(j,i)) }
              if (!this.is_occupied(this.map_coordinates(file_opposite,i)) || move_from_color != this.occupant_color(this.map_coordinates(file_opposite,i))){ moves.push(this.map_coordinates(file_opposite,i)) }
              if (!this.is_occupied(this.map_coordinates(j,rank_opposite)) || move_from_color != this.occupant_color(this.map_coordinates(j,rank_opposite))){ moves.push(this.map_coordinates(j,rank_opposite)) }
              if (!this.is_occupied(this.map_coordinates(file_opposite,rank_opposite)) || move_from_color != this.occupant_color(this.map_coordinates(file_opposite,rank_opposite))){ moves.push(this.map_coordinates(file_opposite,rank_opposite)) }
              }
              x++;
            } 
            rank_opposite--;
            file_opposite--;
            y++;
            x = 0;
          }
          x = 0;
          y = 0;
          file_opposite = file
          rank_opposite = rank
          for(let i = rank; y <=8; i++){
            for(let j = file ; x <=8; j++){// forward
              if (!this.is_occupied(this.map_coordinates(file,i)) || move_from_color != this.occupant_color(this.map_coordinates(file,i))){ moves.push(this.map_coordinates(file,i)) }
              if (!this.is_occupied(this.map_coordinates(file,file_opposite)) || move_from_color != this.occupant_color(this.map_coordinates(file,file_opposite))){ moves.push(this.map_coordinates(file,file_opposite)) }
              if (!this.is_occupied(this.map_coordinates(j,rank)) || move_from_color != this.occupant_color(this.map_coordinates(j,rank))){ moves.push(this.map_coordinates(j,rank)) }
              if (!this.is_occupied(this.map_coordinates(file_opposite,rank)) || move_from_color != this.occupant_color(this.map_coordinates(file_opposite,rank))){ moves.push(this.map_coordinates(file_opposite,rank)) }
              x++;
            } 
            rank_opposite--;
            file_opposite--;
            y++;
            x = 0;
          }
          return moves

        } case 'rook':{
          // let x = 0;
          // let y = 0;
          // let file_opposite = file
          // let rank_opposite = rank
          // for(let i = rank; y <=8; i++){
          //   for(let j = file ; x <=8; j++){
          //     if (!this.is_occupied(this.map_coordinates(file,i)) || move_from_color != this.occupant_color(this.map_coordinates(file,i))){ moves.push(this.map_coordinates(file,i)) }
          //     if (!this.is_occupied(this.map_coordinates(file,file_opposite)) || move_from_color != this.occupant_color(this.map_coordinates(file,file_opposite))){ moves.push(this.map_coordinates(file,file_opposite)) }
          //     if (!this.is_occupied(this.map_coordinates(j,rank)) || move_from_color != this.occupant_color(this.map_coordinates(j,rank))){ moves.push(this.map_coordinates(j,rank)) }
          //     if (!this.is_occupied(this.map_coordinates(file_opposite,rank)) || move_from_color != this.occupant_color(this.map_coordinates(file_opposite,rank))){ moves.push(this.map_coordinates(file_opposite,rank)) }
          //     x++;
          //   } 
          //   rank_opposite--;
          //   file_opposite--;
          //   y++;
          //   x = 0;
          // }
          
          moves.push(...(this.get_vertical_moves(move_from)))
          moves.push(...(this.get_negative_vertical_moves(move_from)))
          moves.push(...(this.get_horizontal_moves(move_from)))
          moves.push(...(this.get_negative_horizontal_moves(move_from)))

          
          return moves

        } case 'knight':{
          moves.push(this.map_coordinates(file+2,rank+1))
          if (!this.is_occupied(this.map_coordinates(file+2,rank+1)) || move_from_color != this.occupant_color(this.map_coordinates(file+2,rank+1))){ moves.push(this.map_coordinates(file+2,rank+1)) }
          if (!this.is_occupied(this.map_coordinates(file+2,rank-1)) || move_from_color != this.occupant_color(this.map_coordinates(file+2,rank-1))){ moves.push(this.map_coordinates(file+2,rank-1)) }
          if (!this.is_occupied(this.map_coordinates(file-2,rank+1)) || move_from_color != this.occupant_color(this.map_coordinates(file-2,rank+1))){ moves.push(this.map_coordinates(file-2,rank+1)) }
          if (!this.is_occupied(this.map_coordinates(file-2,rank-1)) || move_from_color != this.occupant_color(this.map_coordinates(file-2,rank-1))){ moves.push(this.map_coordinates(file-2,rank-1)) }
          if (!this.is_occupied(this.map_coordinates(file+1,rank+2)) || move_from_color != this.occupant_color(this.map_coordinates(file+1,rank+2))){ moves.push(this.map_coordinates(file+1,rank+2)) }
          if (!this.is_occupied(this.map_coordinates(file-1,rank+2)) || move_from_color != this.occupant_color(this.map_coordinates(file-1,rank+2))){ moves.push(this.map_coordinates(file-1,rank+2)) }
          if (!this.is_occupied(this.map_coordinates(file+1,rank-2)) || move_from_color != this.occupant_color(this.map_coordinates(file+1,rank-2))){ moves.push(this.map_coordinates(file+1,rank-2)) }
          if (!this.is_occupied(this.map_coordinates(file-1,rank-2)) || move_from_color != this.occupant_color(this.map_coordinates(file-1,rank-2))){ moves.push(this.map_coordinates(file-1,rank-2)) }
          return moves

        } case 'bishop':{
          let x = 0;
          let y = 0;
          let file_opposite = file
          let rank_opposite = rank
          for(let i = rank; y <=8; i++){
            for(let j = file ; x <=8; j++){
              if(x == y) {
              if (!this.is_occupied(this.map_coordinates(j,i)) || move_from_color != this.occupant_color(this.map_coordinates(j,i))){ moves.push(this.map_coordinates(j,i)) }
              if (!this.is_occupied(this.map_coordinates(file_opposite,i)) || move_from_color != this.occupant_color(this.map_coordinates(file_opposite,i))){ moves.push(this.map_coordinates(file_opposite,i)) }
              if (!this.is_occupied(this.map_coordinates(j,rank_opposite)) || move_from_color != this.occupant_color(this.map_coordinates(j,rank_opposite))){ moves.push(this.map_coordinates(j,rank_opposite)) }
              if (!this.is_occupied(this.map_coordinates(file_opposite,rank_opposite)) || move_from_color != this.occupant_color(this.map_coordinates(file_opposite,rank_opposite))){ moves.push(this.map_coordinates(file_opposite,rank_opposite)) }
              }
              x++;
            } 
            rank_opposite--;
            file_opposite--;
            y++;
            x = 0;
          }
          return moves
        } default:{
          return ['illegal']

        }
        
    }
    return ['illegal']
  }

  public check_legal(move_from: any, move_to: any): boolean{
    let piece = move_from.piece.piece

    //calling function using variable string
    // var call = eval("move_from.piece." + piece + "_get_legal")(move_from.get_file(), move_from.get_rank() );
    let possible_moves = this.get_legal(move_from.get_file(), move_from.get_rank(), move_from, move_to)
    console.log("possible moves are: " + possible_moves)
    let filtered_moves = [...new Set(possible_moves)]
    console.log("filtered possible moves are: " + filtered_moves)

    // window["move_from.piece."][piece]["_get_legal"](arguments);
    if (filtered_moves.includes(move_to.cell_name)) {
      return true
    }else{
      return false;
    }
    
  }

  // private get_position(file: number, rank: number) {
  //   //returns a square name
  //   let move = String.fromCharCode(96 + file) + "" + rank
  //   return move
  // }


  // private get_index(name: String){
  //   //returns rank and file in number
  //   let file =  ((this.board1.filter(x => x.cell_name == name))[0].file).valueOf()
  //   let rank = ((this.board1.filter(x => x.cell_name == name))[0].rank).valueOf()
  //   // convert numbers to letters String.fromCharCode(97 + n)
  //   // let possible_moves = String.fromCharCode(97 + current_square_rank)
  //   let file_transformed = parseInt(file , 36) -9
  //   console.log("file: " + file + '  rank: ' + rank)
  //   return [file_transformed, rank]
  // }

  // 

  // private check_legal(move_from: Square, move_to: Square): boolean{
  //   // checks if the move is legal
  //   // calls out of bounds
  //   console.log(move_from.cell_name + " to --> " + move_to.cell_name)
  //   const piece = move_from.piece;
  //   const from_square = (move_from.cell_name)
  //   const to_square = move_to.cell_name
  //   const piece_color = move_from.piece_color

  //   // call move checker 
  //   const current_square = this.board1.filter(x => x.cell_name == from_square) //returns current square
  //   const target_square = this.board1.filter(x => x.cell_name == to_square) // returns target square
  //   console.log(current_square)
    
  //   if(this.check_legal_moves(from_square, piece, piece_color, target_square[0].cell_name.valueOf()) == 'legal'){
  //     return true;
  //   }

  //   return false;
  // }



  // }


}

