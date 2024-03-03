import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cell.component.html',
  styleUrl: './cell.component.css'
})


export class CellComponent {
  
  public cell_id: Number = 1;
  public cell_name: String = 'e1';
  public color: String = 'black';
  public is_occupied: Boolean = false;
  public size: String = '50px';

  constructor(){

  }

  // ngOnInit(
  //    cell_id: Number = 20,
  //    cell_name: String = 'e1',
  //    color: String ='black',
  //    is_occupied: Boolean = false,
  //    size: String = '100px',
  // ){
  //   this.cell_id = cell_id;
  //   this.cell_name = cell_name;
  //   this.color = color;
  //   this.is_occupied = is_occupied;
  //   this.size = size;
  // }
}
