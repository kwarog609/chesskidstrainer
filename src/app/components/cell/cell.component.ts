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

}
