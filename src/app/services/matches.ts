import { Team } from './team';
import { formatDate } from '@angular/common';

export class Match {
    blueScore: number;
    redScore: number;
    blueTeam: Team;
    redTeam: Team;
    date: string;
    finished: boolean;
    id: string;

    constructor(match: Match, newObject?: boolean, blueTeam?: Team, redTeam?: Team)
    {
        var data : Match;
        if(newObject)
        {
            data = {
                blueScore : 0,
                redScore : 0,
                redTeam: redTeam,
                blueTeam: blueTeam,
                finished: false,
                id: redTeam.name+blueTeam.name+formatDate(new Date(), "ddMMyyyyHHmmss", 'en'),
                date: formatDate(new Date(), "dd MMM yyyy", 'en')
            }
        }
        Object.assign(this, data);
    }
}