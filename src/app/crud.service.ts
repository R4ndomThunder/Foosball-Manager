import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { TournamentUser } from './services/user';
import { extraUserData } from './services/extraUserData';
import { Tournament } from './services/tournaments';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private firestore: AngularFirestore) { }

  getTournaments(){
    return this.firestore.collection("tournaments").snapshotChanges();
  }
  
  getTournamentDetail(tId){
    return this.firestore.collection("tournaments").doc(tId).snapshotChanges();
  }

  getPlayerData(userId){
    return this.firestore.collection("usersData").doc(userId).snapshotChanges();
  }

  setPlayerData(user){
    return this.firestore.collection("userData").doc(user.uid).set(user);
  }

  addInfoToTournament(tournament : Tournament)
  {
    return this.firestore.collection("tournaments").doc(tournament.id).set(tournament);
  }

  getAppData()
  {
    return this.firestore.collection("appdata").snapshotChanges();
  }

  removeTournament(tournament)
  {
    return this.firestore.collection("tournaments").doc(tournament.id).delete();
  }
}
