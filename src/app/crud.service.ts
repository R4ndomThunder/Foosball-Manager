import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private firestore: AngularFirestore) { }

  getTournaments(){
    return this.firestore.collection("tournaments").snapshotChanges();
  }
  
  getTournamentDetail(tId){
    return this.firestore.doc("/tournaments/" + tId).snapshotChanges();
  }

  getPlayerData(userId){
    return this.firestore.doc("/usersData/" + userId).snapshotChanges();
  }

  createNewTournament(tournament){
    return this.firestore.collection("tournaments").doc(tournament.name.replace(/\s/g, "")).set(tournament);
  }

  addInfoToTournament(tournament)
  {
    return this.firestore.collection("tournaments").doc(tournament.id).set(tournament, { merge: true });
  }

  getAppData()
  {
    return this.firestore.collection("appdata").snapshotChanges();
  }
}
