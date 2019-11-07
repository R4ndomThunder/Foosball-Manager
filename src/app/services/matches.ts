import { Team } from './team';
import { formatDate } from '@angular/common';

export class Match {
    blueScore: number;
    redScore: number;
    blueTeamId: string;
    redTeamId: string;
    date: string;
    finished: boolean;
    id: string;

    constructor(match: Match, newObject?: boolean, blueTeam?: Team, redTeam?: Team)
    {
        if(newObject)
        {
            match = {
                blueScore : 0,
                redScore : 0,
                redTeamId: redTeam.id,
                blueTeamId: blueTeam.id,
                finished: false,
                id: redTeam.id+blueTeam.id+formatDate(new Date(), "ddMMyyyyHHmmss", 'en'),
                date: formatDate(new Date(), "dd MMM yyyy", 'en')
            }
        }
        Object.assign(this, match);
    }
}