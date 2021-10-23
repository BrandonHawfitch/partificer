import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ChoiceGroup } from '../entities/choiceGroup';
import { Member } from '../entities/member';
import { Preference } from '../entities/preference';
import { MemberService } from './member.service';
import { PreferenceService } from './preference.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private preferenceService: PreferenceService,
    private memberService: MemberService
  ) {}

  storePreferences() {}

  fetchPreferences() {
    return from(fetch('../../assets/preferences.json')).pipe(
      switchMap((response) =>
        from(response.json()).pipe(
          map((preferencesData: PreferenceData[]) => {
            const preferences: Preference[] = [];
            preferencesData.forEach((preferenceData) =>
              preferences.push(this.preferenceDataToObject(preferenceData))
            );
            return preferences;
          }),
          tap((preferences) =>
            this.preferenceService.setPreferences(preferences)
          )
        )
      )
    );
  }

  storeMembers() {}

  fetchMembers() {
    return from(fetch('../../assets/members.json')).pipe(
      switchMap((response) =>
        from(response.json()).pipe(
          map((memberData: MemberData[]) => {
            const members: Member[] = [];
            memberData.forEach((memberData) =>
              members.push(this.memberDataToObject(memberData))
            );
            return members;
          }),
          tap((members) => this.memberService.setMembers(members))
        )
      )
    );
  }

  private preferenceDataToObject(data: PreferenceData): Preference {
    let result = new Preference(data.title, data.prefType);
    result.description = data.description;
    result.id = data.id;
    result.items = data.items;
    result.options = data.options;

    return result;
  }

  private memberDataToObject(data: MemberData): Member {
    let result = new Member(data.name);
    data.myChoices.forEach((choiceGroupData: ChoiceGroupData) => {
      result.addChoiceGroup(this.choiceGroupDataToObject(choiceGroupData));
    });

    return result;
  }

  private choiceGroupDataToObject(data: ChoiceGroupData): ChoiceGroup {
    let prefId = data.preference;
    let preference = this.preferenceService.getPreference(prefId);

    let result = new ChoiceGroup(preference);
    data.choices.forEach((choiceData: ChoiceData) => {
      result.setChoice(choiceData[0], choiceData[1]);
    });

    return result;
  }
}

interface MemberData {
  name: string;
  myChoices: ChoiceGroupData[];
}

interface ChoiceGroupData {
  preference: string;
  choices: ChoiceData[];
}

type ChoiceData = [string, number];

interface PreferenceData {
  title: string;
  description: string;
  prefType: string;
  id: string;
  options: string[];
  items: string[];
}
