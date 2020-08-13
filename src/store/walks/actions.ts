import { Walk } from '../../types/Walk'
import { AppActions } from '../../types/actions'
import { Dispatch } from 'redux'
import { AppState } from '..'

export const setWalks = (walks: Walk[]): AppActions => ({
  type: "SET_WALKS",
  walks
})

export const addWalk = (walk: Walk): AppActions => ({
  type: "ADD_WALK",
  walk
})

export const removeWalk = (id: string): AppActions => ({
  type: "REMOVE_WALK",
  id
})

export const startSetWalks = ( walks: Walk[] ) => {
  return ( dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(
      setWalks(walks)
    )
  }
}

export const startAddWalk = ( walk: Walk ) => {
  return ( dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(
      addWalk(walk)
    )
  }
}

export const startRemoveWalk = ( id: string ) => {
  return ( dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(
      removeWalk(id)
    )
  }
}
