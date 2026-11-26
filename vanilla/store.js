import { INITIAL_ITEMS, createInitialState, listReducer } from '../shared/listReducer';

export const createListStore = (initialTexts = INITIAL_ITEMS) => {
  let state = createInitialState(initialTexts);
  const listeners = new Set();

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const dispatch = (action) => {
    const nextState = listReducer(state, action);
    if (nextState === state) return;
    state = nextState;
    for (const listener of listeners) {
      listener(state);
    }
  };

  return { getState, dispatch, subscribe };
};
