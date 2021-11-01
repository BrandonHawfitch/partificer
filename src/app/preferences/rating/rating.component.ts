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
    this._choices = choices;
    this.choicesArray = choices.toArray();
    this.formName = choices.preference.title;
  }

  private _choices: ChoiceGroup;

  public formName = '';

  public choicesArray: Array<[string, number]>;

  ratingForm: FormGroup;

  onChange = (choices) => {};

  onTouched = () => {};

  touched = false;

  disabled = false;

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit(): void {
    this.ratingForm = <FormGroup>this.controlContainer.control;
    this.choicesArray.forEach((choice) => {
      this.ratingForm.addControl(choice[0], new FormControl(choice[1]));
    });
  }

  writeValue(choices: ChoiceGroup): void {
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
}
