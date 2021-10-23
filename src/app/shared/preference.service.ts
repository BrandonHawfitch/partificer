import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Preference } from '../entities/preference';

@Injectable({
  providedIn: 'root',
})
export class PreferenceService {
  preferencesChanged = new Subject();

  private preferences: Preference[] = [];

  constructor() {}

  getPreferences() {
    return this.preferences.slice();
  }

  getPreference(id: string): Preference {
    for (const preference of this.preferences) {
      if (preference.id === id) {
        return preference;
      }
    }
    return null;
  }

  addPreference(preference: Preference) {
    this.preferences.push(preference);
    this.preferencesChanged.next();
  }

  setPreferences(preferences: Preference[]) {
    this.preferences = preferences;
    this.preferencesChanged.next();
  }
}
