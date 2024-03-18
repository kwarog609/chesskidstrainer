import { Component, Injectable } from "@angular/core";
import { Square } from "./squares";
import { Piece } from "./pieces";   
import { Board } from "./boards";

@Injectable()
export class Game
{
    public game_id: number = 0;
    public player_one: string = '';
    public player_opponent: string = '';
    public game_notation: Array<string> = [];


    constructor(){

    }

    

}