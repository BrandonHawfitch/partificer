import { Component, OnInit } from '@angular/core';
import { ChoiceGroup } from '../entities/choiceGroup';
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
  choices: ChoiceGroup[];

  constructor(
    private preferenceService: PreferenceService,
    private memberService: MemberService
  ) {
    this.preferences = preferenceService.getPreferences();
    this.choices = memberService.getMember('Brad').myChoices;
  }

  ngOnInit(): void {}

  public getChoiceGroup(prefTitle: string) {
    return this.choices.find((choice) => choice.preference.title === prefTitle);
  }
}
