import { TournamentUser } from './user';

export interface Team {
    name: string;
    strikerId: string;
    defenderId: string;
    goalFatti: number;
    goalSubiti: number;
    win: number;
    lost: number;
    score: number;
    played: number;
    id: string;
}