import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Member } from '../entities/member';
import { Preference } from '../entities/preference';
import { DataStorageService } from '../shared/data-storage.service';
import { MemberService } from '../shared/member.service';
import { PreferenceService } from '../shared/preference.service';

@Injectable({
  providedIn: 'root',
})
export class GroupResolverService
  implements Resolve<{ members: Member[]; preferences: Preference[] }>
{
  constructor(
    private dataStorageService: DataStorageService,
    private memberService: MemberService,
    private preferenceService: PreferenceService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let members = this.memberService.getMembers();
    let preferences = this.preferenceService.getPreferences();

    let memsObs: Observable<Member[]>;
    let prefsObs: Observable<Preference[]>;

    if (preferences.length === 0) {
      prefsObs = this.dataStorageService.fetchPreferences();
    } else {
      prefsObs = of(preferences);
    }

    if (members.length === 0) {
      memsObs = this.dataStorageService.fetchMembers();
    } else {
      memsObs = of(members);
    }

    const combined = combineLatest([prefsObs, memsObs]).pipe(
      map((combo) => {
        if (members.length === 0) {
          members = combo[1];
        }
        if (preferences.length === 0) {
          preferences = combo[0];
        }
        return { members, preferences };
      })
    );

    return combined;
  }
}
