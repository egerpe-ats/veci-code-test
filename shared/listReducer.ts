export type ListItem = {
  id: string;
  text: string;
};

export type ListState = {
  items: ListItem[];
  selectedIds: string[];
  history: ListItem[][];
};

export type ListAction =
  | { type: 'ADD'; text: string }
  | { type: 'TOGGLE'; id: string }
  | { type: 'REMOVE'; id: string }
  | { type: 'REMOVE_SELECTED' }
  | { type: 'UNDO' };

export const INITIAL_ITEMS = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

export const createInitialState = (initialTexts: string[] = INITIAL_ITEMS): ListState => {
  return {
    items: initialTexts
      .map((text) => text.trim())
      .filter(Boolean)
      .map((text) => ({ id: crypto.randomUUID(), text })),
    selectedIds: [],
    history: [],
  };
};

const getNextStateWithHistory = (
  state: ListState,
  nextItems: ListItem[],
  nextSelectedIds: string[] = state.selectedIds,
): ListState => ({
  items: nextItems,
  selectedIds: nextSelectedIds,
  history: [...state.history, state.items],
});

export const listReducer = (state: ListState, action: ListAction): ListState => {
  switch (action.type) {
    case 'ADD': {
      const text = action.text.trim();
      if (!text) return state;
      const nextItems = [...state.items, { id: crypto.randomUUID(), text }];
      return getNextStateWithHistory(state, nextItems);
    }

    case 'TOGGLE': {
      const exists = state.items.some((item) => item.id === action.id);
      if (!exists) return state;
      const isSelected = state.selectedIds.includes(action.id);
      const selectedIds = isSelected
        ? state.selectedIds.filter((id) => id !== action.id)
        : [...state.selectedIds, action.id];
      return { ...state, selectedIds };
    }

    case 'REMOVE': {
      const exists = state.items.some((item) => item.id === action.id);
      if (!exists) return state;
      const nextItems = state.items.filter((item) => item.id !== action.id);
      const nextSelected = state.selectedIds.filter((id) => id !== action.id);
      return getNextStateWithHistory(state, nextItems, nextSelected);
    }

    case 'REMOVE_SELECTED': {
      if (state.selectedIds.length === 0) return state;
      const toRemove = new Set(state.selectedIds);
      const nextItems = state.items.filter((item) => !toRemove.has(item.id));
      return getNextStateWithHistory(state, nextItems, []);
    }

    case 'UNDO': {
      if (state.history.length === 0) return state;
      const previousItems = state.history[state.history.length - 1];
      const validIds = new Set(previousItems.map((item) => item.id));
      return {
        items: previousItems,
        selectedIds: state.selectedIds.filter((id) => validIds.has(id)),
        history: state.history.slice(0, -1),
      };
    }

    default:
      return state;
  }
};
