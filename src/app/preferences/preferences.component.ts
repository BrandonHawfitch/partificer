import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { Member } from '../entities/member';
import { Preference } from '../entities/preference';
import { MemberService } from '../shared/member.service';
import { PreferenceService } from '../shared/preference.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css'],
})
export class PreferencesComponent implements OnInit {
  preferences: Preference[];
  member: Member;

  preferencesForm: FormArray;

  constructor(
    private preferenceService: PreferenceService,
    private memberService: MemberService
  ) {
    this.preferences = preferenceService.getPreferences();
    this.member = memberService.getCurrentMember();
  }

  ngOnInit(): void {
    let preferencesForm = new FormArray([]);

    this.preferences.forEach((preference) => {
      preferencesForm.push(
        new FormControl(this.getChoiceGroup(preference.title))
      );
    });
  }

  public getChoiceGroup(prefTitle: string) {
    return this.member.getChoiceGroup(prefTitle);
  }

  public saveChoices() {}
}
