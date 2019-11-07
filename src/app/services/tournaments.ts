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
    randomizeTeams: boolean;

    constructor(tournament: Tournament, newObject?: boolean, name?: string, adminUID?: string, type?: string, randomizeTeams?:boolean) {
        if (newObject) {
            tournament = {
                name: name,
                id: name.replace(/\s/g, ""),
                matches: [],
                teams: [],
                users: [],
                type: type,
                admin: adminUID,
                randomizeTeams: randomizeTeams,
            }
        }
        Object.assign(this, tournament);
    }
}