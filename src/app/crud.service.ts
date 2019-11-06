import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { TournamentUser } from './services/user';
import { extraUserData } from './services/extraUserData';

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

  addInfoToTournament(tournament)
  {
    return this.firestore.collection("tournaments").doc(tournament.id).set(tournament, { merge: true });
  }

  getAppData()
  {
    return this.firestore.collection("appdata").snapshotChanges();
  }

  removeTournament(tournament)
  {
    return this.firestore.collection("tournaments").doc(tournament.id).delete();
  }

  getData()
  {

  }

  createData()
  {

  }

  updateData()
  {

  }

  deleteData()
  {
    
  }

}
