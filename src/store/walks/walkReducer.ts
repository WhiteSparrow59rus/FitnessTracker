import { Walk } from "../../types/Walk"
import { WalkActionTypes } from "../../types/actions"

const walksReducerDefaultState: Walk[] = []

// Тестовый массив прогулок
const getTestArray = function(): Walk[]  {
  let walks: Walk[] = []
  for (let i = 0; i < 100; i++) {
    const newWalk: Walk = {
      id: i.toString(),
      date: new Date(),
      distance: i*4525
    }
    walks.push(newWalk)
  }
  return (
    walks
  )
}
const walkReducer = (state = getTestArray(), action: WalkActionTypes): Walk[] => {
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