import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../entities/member';
import { Preference } from '../entities/preference';

@Component({
  selector: 'app-direct-comparison',
  templateUrl: './direct-comparison.component.html',
  styleUrls: ['./direct-comparison.component.css'],
})
export class DirectComparisonComponent implements OnInit {
  @Input()
  public members: Member[] = [];

  @Input()
  public preference: Preference = null;

  public memberA: Member = null;
  public memberB: Member = null;

  constructor() {}

  ngOnInit(): void {}

  onSelectMemberA(player: Member) {
    this.memberA = player;
    // console.log(player);
  }
  onSelectMemberB(player: Member) {
    this.memberB = player;
  }
}
