import { createReducer, on } from "@ngrx/store";
import { Pet } from "src/app/models/pet";
import {
  addPetFail,
  addPetSuccess,
  loadPetsFail,
  loadPetsSuccess,
  updatePetFail,
  updatePetSuccess,
} from "../actions/pet.actions";

export interface PetState {
  entities: { [id: number]: Pet };
}
export const initialState: PetState = {
  entities: {},
};
export const petsReducer = createReducer(
  initialState,

  on(loadPetsSuccess, (state, { pets }) => {
    const entities = pets.reduce(
      (entities: { [id: number]: Pet }, pet: Pet) => {
        return {
          ...entities,
          [pet.id!.toString()]: pet,
        };
      },
      {
        ...state.entities,
      }
    );
    return {
      ...state,
      entities,
    };
  }),

  on(loadPetsFail, (state) => state),

  on(addPetSuccess, (state, { pet }) => {
    const entities = {
      ...state.entities,
      [pet.id!.toString()]: pet,
    };
    return { ...state, entities };
  }),

  on(addPetFail, (state) => state),

  on(updatePetSuccess, (state, { pet }) => {
    const entities = {
      ...state.entities,
      [pet.id!.toString()]: pet,
    };
    return { ...state, entities };
  }),
  on(updatePetFail, (state) => state)
);
