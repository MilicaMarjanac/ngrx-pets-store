import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { PetService } from "src/app/services/pet.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  addPet,
  addPetFail,
  addPetSuccess,
  loadPets,
  loadPetsFail,
  loadPetsSuccess,
  updatePet,
  updatePetFail,
  updatePetSuccess,
} from "../actions/pet.actions";

@Injectable({
  providedIn: "root",
})
export class PetEffects {
  constructor(private petService: PetService, private actions$: Actions) {}
  loadPets$ = createEffect(() =>
    this.actions$.pipe(ofType(loadPets)).pipe(
      switchMap(() => {
        return this.petService.getPets().pipe(
          map((pets) => loadPetsSuccess({ pets })),
          catchError((error) => of(loadPetsFail(error)))
        );
      })
    )
  );

  addPets$ = createEffect(() =>
    this.actions$.pipe(ofType(addPet)).pipe(
      switchMap((action) => {
        return this.petService.createPet(action.pet).pipe(
          map((pet) => {
            return addPetSuccess({ pet });
          }),
          catchError((error) => of(addPetFail(error)))
        );
      })
    )
  );
  updatePets$ = createEffect(() =>
    this.actions$.pipe(ofType(updatePet)).pipe(
      switchMap((action) => {
        return this.petService.editPet(action.pet).pipe(
          map((pet) => {
            return updatePetSuccess({ pet });
          }),
          catchError((error) => of(updatePetFail(error)))
        );
      })
    )
  );
}
