export class TournamentUser {
  uid: string;
  name: string;
  role: string;

  constructor(user: TournamentUser, newObject?: boolean, uid?: string, name?: string, role?: string) {
    if (newObject) {
      user = {
        name: name,
        uid: uid,
        role: role
      };
    }
    Object.assign(this, user);
  }
}