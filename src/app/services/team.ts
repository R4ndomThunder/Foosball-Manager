import { TournamentUser } from './user';

export interface Team {
    name: string;
    striker: TournamentUser;
    defender: TournamentUser;
    goalFatti: number;
    goalSubiti: number;
    win: number;
    lost: number;
    score: number;
    played: number;
}