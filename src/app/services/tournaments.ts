import { Team } from './team';
import { Match } from './matches';
import { TournamentUser } from './user';

export class Tournament {
    id: string;
    name: string;
    teams: Team[];
    matches: Match[];
    users: TournamentUser[];
    type: string;
    admin: string;

    constructor(tournament: Tournament, newObject?: boolean, name?: string, adminUID?: string, type?: string) {
        if (newObject) {
            tournament = {
                name: name,
                id: name.replace(/\s/g, ""),
                matches: [],
                teams: [],
                users: [],
                type: type,
                admin: adminUID
            }
        }
        Object.assign(this, tournament);
    }
}