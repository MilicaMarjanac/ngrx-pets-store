import { createSelector } from "@ngrx/store";
import { PetState } from "../reducers/pet.reducer";

export interface AppState {
  pets: PetState;
}

export const selectFeature = (state: AppState) => {
  return state.pets;
};

export const selectFeaturePets = createSelector(
  selectFeature,
  (state: PetState) => {
    return Object.keys(state.entities).map(
      (id) => state.entities[parseInt(id, 10)]
    );
  }
);
