import { Component, Input, OnInit } from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { ChoiceGroup } from 'src/app/entities/choiceGroup';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: RatingComponent,
    },
  ],
})
export class RatingComponent implements ControlValueAccessor, OnInit {
  @Input()
  set choices(choices: ChoiceGroup) {
    // console.log(choices);
    this._choices = choices;
    this.choicesArray = choices.toArray();
    this.formName = choices.preference.title;
  }

  private _choices: ChoiceGroup;

  public formName = '';

  public choicesArray: Array<[string, number]> = [];

  ratingForm: FormGroup;

  onChange = (choices) => {};

  onTouched = () => {};

  touched = false;

  disabled = false;

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit(): void {
    this.ratingForm = new FormGroup({});
    this.choicesArray.forEach((choice) => {
      this.ratingForm.addControl(choice[0], new FormControl(choice[1]));
    });
    this.ratingForm.valueChanges.subscribe((value) => {
      console.log(value);
      this.onChange(this.choicesObjectToGroup(value));
    });
  }

  writeValue(choices: ChoiceGroup): void {
    // console.log(choices);
    this.choices = choices;
  }
  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }
  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private choicesArrayToGroup(
    choicesArray: Array<[string, number]>
  ): ChoiceGroup {
    let newChoices = new ChoiceGroup(this._choices.preference);
    choicesArray.forEach((choice: [string, number], index: number) => {
      let correctedIndex = index + 1;
      newChoices.setChoice(choice[0], correctedIndex);
    });
    return newChoices;
  }

  private choicesObjectToGroup(choicesObject: {
    [key: string]: number;
  }): ChoiceGroup {
    const choiceGroup = new ChoiceGroup(this._choices.preference);
    for (const itemName in choicesObject) {
      if (Object.prototype.hasOwnProperty.call(choicesObject, itemName)) {
        const optionValue = choicesObject[itemName];
        choiceGroup.setChoice(itemName, optionValue);
      }
    }
    return choiceGroup;
  }
}
