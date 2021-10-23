import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/entities/member';
import { Preference } from 'src/app/entities/preference';
import { MemberService } from 'src/app/shared/member.service';

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.css'],
})
export class PreferenceComponent implements OnInit {
  @Input()
  preference: Preference;

  member: Member;

  constructor(private memberService: MemberService) {}

  ngOnInit(): void {
    this.member = this.memberService.getMember('Brad');
  }
}
