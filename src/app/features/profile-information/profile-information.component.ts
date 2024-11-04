import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {DropdownModule} from "primeng/dropdown";
import {CalendarModule} from "primeng/calendar";
import {UserService} from "../../core/service/user.service";
import {UserPreferenceModel} from "../../core/model/user-preference.model";
import {DialogModule} from "primeng/dialog";

@Component({
  selector: 'app-profile-information',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    CalendarModule,
    DialogModule
  ],
  templateUrl: './profile-information.component.html',
  styleUrl: './profile-information.component.css'
})
export class ProfileInformationComponent implements OnInit{

  showConfirmationPopup = false;

  profile : UserPreferenceModel = {
    lastName: '',
    firstName: '',
    birthDate: new Date(),
    income: 0,
    email : '',
    familyStatus: 'Célibataire',
    childrenCount: 0,
    profileType: 'Défensif',
    profession: ''
  };


  constructor(private userService: UserService ) {
    this.userService.user$.subscribe(user => {
      if (user != null) {
        this.profile.lastName = user.lastName;
        this.profile.firstName = user.firstName;
        this.profile.email = user.email
      }
    });
  }

  ngOnInit(): void {
    this.userService.getUserPreferences().subscribe(resp => {
      this.profile.profileType = resp.profileType;
      this.profile.income = resp.income;
      this.profile.childrenCount = resp.childrenCount;
      this.profile.birthDate = resp.birthDate;
      this.profile.familyStatus = resp.familyStatus;
      this.profile.profession = resp.profession;
    })
  }

  familyStatuses = [
    { label: 'Marié', value: 'MARIE' },
    { label: 'Célibataire', value: 'CELIBATAIRE' }
  ];

  childrenOptions = Array.from({ length: 11 }, (v, k) => ({ label: `${k}`, value: k }));

  profileTypes = [
    { label: 'Prudent', value: 'PRUDENT' },
    { label: 'Équilibré', value: 'EQUILIBRE' },
    { label: 'Risqué', value: 'RISQUE' }
  ];

  savePreferences() {
    this.userService.createOrUpdateUserPreferences(this.profile).subscribe(resp => {
        this.showConfirmationPopup = true;
    });
  }


}
