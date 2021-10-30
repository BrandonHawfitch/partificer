import { ChoiceGroup } from './choiceGroup';
import { Preference } from './preference';

// A member represents a user's information confined to a single group
export class Member {
  myChoices: Array<ChoiceGroup> = [];

  constructor(public name: string) {}

  getChoiceGroup(prefTitle: string): ChoiceGroup | undefined {
    for (let choice of this.myChoices) {
      if (choice.preference.title === prefTitle) {
        return choice;
      }
    }
    return undefined;
  }

  addChoiceGroup(choice: ChoiceGroup) {
    this.myChoices.push(choice);
  }

  getChoiceValue(prefTitle: string, itemName: string) {
    const choiceGroup = this.getChoiceGroup(prefTitle);
    const choiceValue = choiceGroup.getChoice(itemName);
    return choiceValue;
  }

  setChoiceGroup(choice: ChoiceGroup, prefTitle?: string) {
    if (!prefTitle) {
      prefTitle = choice.preference.title;
    }
    for (let i = 0; i < this.myChoices.length; i++) {
      const oldChoice = this.myChoices[i];
      if (oldChoice.preference.title === prefTitle) {
        this.myChoices[i] = choice;
        return true;
      }
    }
    return false;
  }
}

export class Group {
  members: Member[] = [];
  preferences: Preference[] = [];

  constructor(public name: string) {}
}
