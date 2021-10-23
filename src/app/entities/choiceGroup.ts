import {
  ChoiceGroupStrategy,
  RankingStrategy,
  RatingStrategy,
  Scale,
} from './choiceGroupStrategy';
import { Preference } from './preference';

// This class is used to group multiple Choices that belong to a single preference
export class ChoiceGroup implements Comparable<ChoiceGroup> {
  choices: Map<string, number> = new Map();
  strategy: ChoiceGroupStrategy;

  constructor(public preference: Preference) {
    if (preference.prefType === 'RANKING') {
      this.strategy = new RankingStrategy(new Scale(preference));
    } else {
      this.strategy = new RatingStrategy(new Scale(preference));
    }
  }

  calculateCompatibility(other: ChoiceGroup) {
    const difSum = this.calculateDifferenceSum(other);
    const maxDifSum = this.strategy.calculateMaxDifferenceSum(this.preference);
    return 1 - difSum / maxDifSum;
  }

  calculateDifferenceSum(other: ChoiceGroup) {
    let sum = 0;
    const items = this.preference.items;
    for (let item of items) {
      if (this.choices.has(item) && other.choices.has(item)) {
        const cho1 = this.choices.get(item)!;
        const cho2 = other.choices.get(item)!;
        sum += this.strategy.calculateDifferenceScore(cho1, cho2);
      }
    }
    return sum;
  }

  setChoice(itemName: string, optionValue: number): void {
    this.choices.set(itemName, optionValue);
  }

  getChoice(itemName: string) {
    return this.choices.get(itemName);
  }
}

// This interface is used to specify calculations used for determining compatibility
interface Comparable<T> {
  // Calculates a percentage point indicating level of compatibility between two choices / choice groups
  calculateCompatibility(other: T): number;
}
