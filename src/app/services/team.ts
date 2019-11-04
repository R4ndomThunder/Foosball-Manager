import { User } from './user';

export interface Team {
    name: string;
    striker: User;
    defender: User;
    goalFatti: number;
    goalSubiti: number;
    win: number;
    lost: number;
    score: number;
    played: number;
}