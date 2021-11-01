import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../entities/member';
import { Preference } from '../entities/preference';

@Component({
  selector: 'app-compatibility-table',
  templateUrl: './compatibility-table.component.html',
  styleUrls: ['./compatibility-table.component.css'],
})
export class CompatibilityTableComponent implements OnInit {
  @Input()
  public members: Member[] = [];

  @Input()
  public preference: Preference = null;

  constructor() {}

  ngOnInit(): void {}

  getCompatibility(memberA: Member, memberB: Member): number {
    const choiceA = memberA.getChoiceGroup(this.preference.title);
    const choiceB = memberB.getChoiceGroup(this.preference.title);
    return choiceA.calculateCompatibility(choiceB);
  }

  getCumulativeCompatibility(memberA: Member, memberB: Member): number {
    const prefs: Preference[] = memberA.myChoices.map((x) => x.preference);
    let compatibility = 0;
    prefs.forEach((pref) => {
      const choiceA = memberA.getChoiceGroup(pref.title);
      const choiceB = memberB.getChoiceGroup(pref.title);
      compatibility += choiceA.calculateCompatibility(choiceB);
    });
    compatibility /= prefs.length;

    return compatibility;
  }
}
