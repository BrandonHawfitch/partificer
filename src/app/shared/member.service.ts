import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Member } from '../entities/member';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  membersChanged = new Subject();

  private members: Member[] = [];

  constructor() {}

  getMembers() {
    return this.members.slice();
  }

  getMember(name: string) {
    for (const member of this.members) {
      if (member.name === name) {
        return member;
      }
    }
    return null;
  }

  addMember(member: Member) {
    this.members.push(member);
    this.membersChanged.next();
  }

  setMembers(members: Member[]) {
    this.members = members;
    this.membersChanged.next();
  }
}
