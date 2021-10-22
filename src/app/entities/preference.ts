// A preference defines the behavior for a choice or set of choices by defining both the items
// that are to be chosen, and the options available for each item
class Preference {
  // In this context, an option is just the label that is displayed for said option
  // Options are assumed to be in the preferred order
  options: string[] = [];

  // Items refers to the individual questions that compose this Preference
  // Here, items is represented as labels
  items: string[] = [];

  description: string = '';
  id: string = '';

  // prefType defines the type of choice being applied to this preference
  // IE ranking, rating, etc
  constructor(public title: string, public prefType: string) {}

  equals(other: Preference): boolean {
    // return this.id == other.id;
    return this.title === other.title;
  }
}
