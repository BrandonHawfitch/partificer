import { Component, OnInit } from '@angular/core';
import { Member } from '../entities/member';
import { Preference } from '../entities/preference';
import { DataStorageService } from '../shared/data-storage.service';
import { MemberService } from '../shared/member.service';
import { PreferenceService } from '../shared/preference.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
})
export class GroupComponent implements OnInit {
  members: Member[];
  preferences: Preference[];

  constructor(
    private preferenceService: PreferenceService,
    private memberService: MemberService
  ) {}

  ngOnInit(): void {
    this.preferences = this.preferenceService.getPreferences();
    this.members = this.memberService.getMembers();
    console.log(this.members);
  }
}
