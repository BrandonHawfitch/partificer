import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChoiceGroup } from '../entities/choiceGroup';
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

  preferencesForm: FormGroup;

  constructor(
    private preferenceService: PreferenceService,
    private memberService: MemberService
  ) {
    this.preferences = preferenceService.getPreferences();
    this.member = memberService.getCurrentMember();
  }

  ngOnInit(): void {
    this.preferencesForm = new FormGroup({});
    this.preferences.forEach((preference) => {
      this.preferencesForm.addControl(
        preference.title,
        new FormControl(this.getChoiceGroup(preference.title))
      );
    });
  }

  public getChoiceGroup(prefTitle: string) {
    return this.member.getChoiceGroup(prefTitle);
  }

  public saveChoices() {
    let newChoices = this.preferencesForm.value;
    this.memberService.savePreferences(newChoices);
  }
}
