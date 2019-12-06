import { Team } from './team';
import { Match } from './matches';
import { TournamentUser } from './user';
import { Bracket } from './brackets';

export class Tournament {
    id: string;
    name: string;
    teams: Team[];
    matches?: Match[];
    users?: TournamentUser[];
    type: string;
    admin: string[];
    limit?: number;
    brackets?:Bracket;

    constructor(tournament: Tournament, newObject?: boolean, name?: string, adminUID?: string, type?: string) {
        if (newObject) {
            tournament = {
                name: name,
                id: name.replace(/\s/g, ""),
                matches: [],
                teams: [],
                users: [],
                type: type,
                admin:[...adminUID]
            }
        }
        return tournament;
    }
}