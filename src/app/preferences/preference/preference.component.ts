import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Member } from 'src/app/entities/member';
import { Preference } from 'src/app/entities/preference';

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.css'],
})
export class PreferenceComponent implements OnInit {
  @Input()
  preference: Preference;

  @Input()
  member: Member;

  control: FormControl;

  constructor() {}

  ngOnInit(): void {
    const initial = this.member.getChoiceGroup(this.preference.title);
    this.control = new FormControl(initial);
  }
}
