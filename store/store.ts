import {useMemo} from 'react'
import {createStore, applyMiddleware, Store, AnyAction} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'

let store: Store | undefined;

export type CustomState = {
  metamask: {
    init: boolean;
    accounts: string[];
  },
}

const initialState: CustomState = {
  metamask: {
    init: false,
    accounts: [],
  },
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'SET_MM_INIT':
      return {
        ...state,
        metamask: {...state.metamask, init: action.payload}
      };
    case 'SET_ACCOUNTS':
      return {
        ...state,
        accounts: action.payload.accounts,
      };
    default:
      return state
  }
};

function initStore(preloadedState = initialState) {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  )
}

export const initializeStore = (preloadedState: CustomState) => {
  let _store = store || initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store
};

export function useStore(initialState: any) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}