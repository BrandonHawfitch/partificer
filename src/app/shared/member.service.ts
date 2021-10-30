import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ChoiceGroup } from '../entities/choiceGroup';
import { Member } from '../entities/member';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  membersChanged = new Subject();

  currentMemberChanged = new Subject();

  private currentMemberIndex: number = 0;

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

  getCurrentMember(): Member {
    return this.members[this.currentMemberIndex];
  }

  setCurrentMember(name: string): void {
    this.members.forEach((member: Member, index: number) => {
      if (member.name === name) {
        this.currentMemberIndex = index;
        this.currentMemberChanged.next();
      }
    });
  }

  savePreferences(choices: { [prefTitle: string]: ChoiceGroup }) {
    const curMem = this.getCurrentMember();
    for (const prefTitle in choices) {
      const newChoice = choices[prefTitle];
      curMem.setChoiceGroup(newChoice, prefTitle);
    }
  }
}
