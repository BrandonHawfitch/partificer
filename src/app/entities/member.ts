// A member represents a user's information confined to a single group
class Member {
  myChoices: Array<ChoiceGroup> = [];

  constructor(public name: string) {}

  getChoice(prefTitle: string): ChoiceGroup | undefined {
    for (let choice of this.myChoices) {
      if (choice.preference.title === prefTitle) {
        return choice;
      }
    }
    return undefined;
  }
}

class Group {
  members: Member[] = [];
  preferences: Preference[] = [];

  constructor(public name: string) {}
}
