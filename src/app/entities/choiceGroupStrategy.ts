// This interface is used to define strategies used for calculating compatibility from within a single choice group
interface ChoiceGroupStrategy {
  // Calculates the maximum sum of the differences between choices
  calculateMaxDifferenceSum(preference: Preference): number;
  // Calculates the difference score between two choices
  calculateDifferenceScore(optionValue1: number, optionValue2: number): number;
}

class RankingStrategy implements ChoiceGroupStrategy {
  constructor(public scale: Scale) {}

  calculateMaxDifferenceSum(preference: Preference) {
    const n = preference.items.length;
    const result = Math.sqrt(n * Math.floor(0.5 * n * n));
    return result;
  }
  calculateDifferenceScore(optionValue1: number, optionValue2: number) {
    const absDif = Math.abs(optionValue1 - optionValue2);
    const difRoot = Math.sqrt(absDif);
    return difRoot;
  }
}

class RatingStrategy implements ChoiceGroupStrategy {
  constructor(public scale: Scale) {}

  calculateMaxDifferenceSum(preference: Preference) {
    const n = preference.items.length;
    const maxDif = Math.abs(this.scale.max - this.scale.min);
    const result = n * maxDif;
    return result;
  }
  calculateDifferenceScore(optionValue1: number, optionValue2: number) {
    const absDif = Math.abs(optionValue1 - optionValue2);
    return absDif;
  }
}

// A scale establishes a numerical relationship between the options provided by a preference
class Scale {
  // Mapping from option number value to its string representation or label
  options: Map<number, string> = new Map();
  max: number;

  constructor(public preference: Preference, public min = 1) {
    const optionsString = preference.options;
    const numOptions = optionsString.length;

    // Sets maximum relative to the minimum and number of options
    this.max = min + numOptions - 1;

    for (let i = 0; i < optionsString.length; i++) {
      this.options.set(min + i, optionsString[i]);
    }
  }

  getOptionName(optionValue: number): string {
    const result = this.options.get(optionValue);
    if (result) {
      return result;
    }
    return 'Option not found on this scale!';
  }

  getOptionValue(optionName: string): number {
    const options = this.options.entries();
    for (let option of options) {
      if (option[1] == optionName) {
        return option[0];
      }
    }
    return -1;
  }
}
