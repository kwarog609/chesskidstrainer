import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { BoardComponent } from './components/board/board.component';  
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GameComponent, BoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'chessapp';
}
