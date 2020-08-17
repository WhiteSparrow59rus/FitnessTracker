import { Walk } from "../../types/Walk"
import { WalkActionTypes } from "../../types/actions"

// const walksReducerDefaultState: Walk[] = []

const addDays = function(date: Date, days: number): Date {
  date.setDate(date.getDate() + days);
  return date;
}

// Тестовый массив прогулок
const getTestArray = function(): Walk[]  {
  let walks: Walk[] = []
  for (let i = 0; i < 20; i++) {
    let currentDate = new Date()
    const newWalk: Walk = {
      id: i.toString(),
      date: addDays(currentDate, i),
      distance: i*303
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
    case "EDIT_WALK":
      return state.map(walk => {
        if (walk.id === action.walk.id) {
          return {
            ...walk,
            ...action.walk
          };
        } else {
          return walk;
        }
      });
    case "REMOVE_WALK":
      return state.filter(({ id }) => id !== action.id)
    default:
      return state
  }    
}

export { walkReducer }