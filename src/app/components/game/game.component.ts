import { Component, Input } from '@angular/core';
import { BoardComponent } from '../board/board.component';
import { Square } from '../../models/squares';  
import { Board } from '../../models/boards';  
import { Piece } from '../../models/pieces';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [BoardComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {



}
