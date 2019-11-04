import { Team } from './team';

export class Match{
    blueScore: number;
    redScore: number;
    blueTeam:Team;
    redTeam:Team;
    date: string;
    finished: boolean;
    id: string;
}