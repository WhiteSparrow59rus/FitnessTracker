import { Walk } from './Walk'

export const SET_WALKS = "SET_WALKS"
export const ADD_WALK = "ADD_WALK"
export const EDIT_WALK = "EDIT_WALK"
export const REMOVE_WALK = "REMOVE_WALK"

export interface SetWalksAction {
  type: typeof SET_WALKS,
  walks: Walk[]
}

export interface AddWalkAction {
  type: typeof ADD_WALK,
  walk: Walk
}

export interface EditWalkAction {
  type: typeof EDIT_WALK,
  walk: Walk
}

export interface RemoveWalkAction {
  type: typeof REMOVE_WALK,
  id: string
}

export type WalkActionTypes = SetWalksAction | AddWalkAction | EditWalkAction | RemoveWalkAction

export type AppActions = WalkActionTypes