import { Team } from './team';
import { Match } from './matches';
import { User } from './user';

export class Tournament{
    id: string;
    name :string;
    teams: Team[];
    matches: Match[];
    users: User[];
    type: string;
}