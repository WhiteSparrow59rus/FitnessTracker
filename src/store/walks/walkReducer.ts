import { Walk } from "../../types/Walk"
import { WalkActionTypes } from "../../types/actions"

const walksReducerDefaultState: Walk[] = []

const walkReducer = (state = walksReducerDefaultState, action: WalkActionTypes): Walk[] => {
  switch (action.type) {
    case "SET_WALKS": 
      return action.walks
    case "ADD_WALK":
      return [...state, action.walk]
    case "REMOVE_WALK":
      return state.filter(({ id }) => id !== action.id)
    default:
      return state
  }    
}

export { walkReducer }