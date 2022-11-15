import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Pet } from "./models/pet";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { addPet, loadPets, updatePet } from "./store/actions/pet.actions";
import { AppState, selectFeaturePets } from "./store/selectors/pet.selector";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  public form: FormGroup;
  public petsData: Pet[] = [];
  public pets$: Observable<Pet[]>;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      pets: this.formBuilder.array([""]),
    });

    this.pets$ = this.store.select(selectFeaturePets);
    this.pets$.subscribe((pets) => {
      this.petsData = pets;
      this.petsFormArray.clear();

      this.loadForm();
    });
    this.store.dispatch(loadPets());
  }

  private loadForm() {
    this.petsData.forEach((pet) => {
      this.petsFormArray.push(
        this.formBuilder.group({ name: [pet.name], type: [pet.type] })
      );
    });
  }

  private onAdd(pet: Pet) {
    this.store.dispatch(addPet({ pet }));
  }

  private onEdit(pet: Pet) {
    this.store.dispatch(updatePet({ pet }));
  }

  public get petsFormArray() {
    return this.form.controls["pets"] as FormArray;
  }

  public addPetFormField() {
    const petsForm = this.formBuilder.group({
      name: ["Add your pet name here", Validators.required],
      type: ["Add your pet type here", Validators.required],
    });
    this.petsFormArray.push(petsForm);
  }

  public getControl(index: number, field: string): FormControl {
    return this.petsFormArray.at(index).get(field) as FormControl;
  }

  public getValue(index: number, field: string) {
    return this.getControl(index, field).value;
  }

  public updateField(index: number) {
    if (index >= this.petsData.length) {
      const newPet = {
        ...this.form.value.pets[index],
      };
      this.onAdd(newPet);
    }

    this.petsData.map((pet, i) => {
      if (index === i) {
        const editedPet = { id: pet.id, ...this.form.value.pets[index] };
        this.onEdit(editedPet);
      }
    });
  }
}
