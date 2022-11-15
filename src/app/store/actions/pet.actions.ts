import { createAction, props } from "@ngrx/store";
import { Pet } from "src/app/models/pet";

export const loadPets = createAction("[Pet List] Load Pet");
export const loadPetsSuccess = createAction(
  "[Pet List] Load Pet Success",
  props<{ pets: Pet[] }>()
);
export const loadPetsFail = createAction(
  "[Pet List] Load Pet Fail",
  props<{ error: any }>()
);

export const addPet = createAction("[Pet List] Add Pet", props<{ pet: Pet }>());
export const addPetSuccess = createAction(
  "[Pet List] Add Pet Success",
  props<{ pet: Pet }>()
);
export const addPetFail = createAction(
  "[Pet List] Add Pet Fail",
  props<{ error: any }>()
);

export const updatePet = createAction(
  "[Pet List] Update Pet",
  props<{ pet: Pet }>()
);
export const updatePetSuccess = createAction(
  "[Pet List] Update Pet Success",
  props<{ pet: Pet }>()
);
export const updatePetFail = createAction(
  "[Pet List] Update Pet Fail",
  props<{ error: any }>()
);
