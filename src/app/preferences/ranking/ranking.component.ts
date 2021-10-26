import { Component, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ChoiceGroup } from 'src/app/entities/choiceGroup';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: RankingComponent,
    },
  ],
})
export class RankingComponent implements ControlValueAccessor {
  @Input()
  set choices(choices: ChoiceGroup) {
    this.choicesArray = choices.toArray();
    this.choicesArray.sort((first, second) => {
      if (first[1] < second[1]) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  public choicesArray: Array<[string, number]> = [];

  onChange = (choices) => {};

  onTouched = () => {};

  touched = false;

  disabled = false;

  constructor() {}

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

  drop(event: CdkDragDrop<any>) {
    moveItemInArray(this.choicesArray, event.previousIndex, event.currentIndex);
    const modified = event.previousIndex !== event.currentIndex;
    if (modified) {
      this.onChange(this.choices);
      if (!this.touched) {
        this.touched = true;
        this.onTouched();
      }
    }
    console.log(this.choicesArray);
  }
}
