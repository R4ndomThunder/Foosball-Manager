import { Component, OnInit, ViewChild } from '@angular/core';
import { CSVRecord } from '../services/CSVModel';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth-service.service';
import { CrudService } from '../crud.service';
import { Router } from '@angular/router';
import { Tournament } from '../services/tournaments';
import { TournamentUser } from '../services/user';
import { SnackbarService } from '../snackbar.service';
import { TeammakerComponent } from '../teammaker/teammaker.component';
import { Team } from '../services/team';

@Component({
  selector: 'app-tournamentmaker',
  templateUrl: './tournamentmaker.component.html',
  styleUrls: ['./tournamentmaker.component.scss']
})
export class TournamentmakerComponent implements OnInit {
  tournamentForm: FormGroup;
  name: string;
  tournament: any;
  type: string;
  public records: any[] = [];

  // @ViewChild('csvReader') 
  csvReader: any;

  tournamentControl = new FormControl('', [Validators.required]);

  constructor(private fb: FormBuilder, private crudService: CrudService, public auth: AuthService, private router: Router, private _snackBar: SnackbarService) {
    this.tournamentForm = fb.group({
      Name: ['', Validators.required],
      Type: ['', Validators.required],
    })
  }

  ngOnInit() {
  }

  createTournament() {

    let t: Tournament = new Tournament(null, true, this.name, this.auth.userData.uid, this.type);

    if (this.records == null) {
      var role = this.auth.extraData != undefined ? this.auth.extraData.preferredRole : "Any";

      var u = {
        name: this.auth.userData.displayName,
        uid: this.auth.userData.uid,
        role: role
      };
      t.users.push(u);
    }
    else {
      var role = "Admin";
      var u = {
        name: this.auth.userData.displayName,
        uid: this.auth.userData.uid,
        role: role
      };
      t.users.push(u);

      var count = 0
      this.records.forEach(line => {
        count++;
        var def: TournamentUser = {
          name: line.defender,
          role: "Defender",
          uid: count + "def"
        }
        
        var str: TournamentUser = {
          name: line.striker,
          role: "Striker",
          uid: count + "str"
        }

        var team: Team = {
          id: line.team + str.uid + def.uid,
          name: line.team,
          defenderId: def.uid,
          strikerId: str.uid,
          goalFatti: 0,
          goalSubiti: 0,
          lost: 0,
          played: 0,
          score: 0,
          win: 0
        }

        t.users.push(str);
        t.users.push(def);
        t.teams.push(team);
      });
    }

    this.crudService.addInfoToTournament(t).then(resp => {
      this._snackBar.show('🏆 Tournament created successfully.');
    }).catch(error => {
      this._snackBar.show('⚠️ Error: ' + error);
    });
    this.router.navigate(['dashboard']);
  }



  uploadListener($event: any): void {

    let text = [];
    let files = $event.srcElement.files;

    if (this.isValidCSVFile(files[0])) {

      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

        let headersRow = this.getHeaderArray(csvRecordsArray);

        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
      };

      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };

    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');
      if (curruntRecord.length == headerLength) {
        let csvRecord: CSVRecord = new CSVRecord();
        csvRecord.team = curruntRecord[0].trim();
        csvRecord.defender = curruntRecord[1].trim();
        csvRecord.striker = curruntRecord[2].trim();
        csvArr.push(csvRecord);
      }
    }
    return csvArr;
  }

  isValidCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  fileReset() {
    this.csvReader.nativeElement.value = "";
    this.records = [];
  }
}
