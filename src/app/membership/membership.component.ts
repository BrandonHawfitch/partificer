import { Component, OnInit } from '@angular/core';
import { Member } from '../entities/member';
import { MemberService } from '../shared/member.service';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css'],
})
export class MembershipComponent implements OnInit {
  members: Member[];

  currentMember: Member;

  constructor(private memberService: MemberService) {
    this.members = memberService.getMembers();
    this.currentMember = memberService.getCurrentMember();
  }

  ngOnInit(): void {
    this.memberService.currentMemberChanged.subscribe(() => {
      this.currentMember = this.memberService.getCurrentMember();
    });
  }

  onChangeMember(member: Member) {
    this.memberService.setCurrentMember(member.name);
  }
}
