import { createActions } from './actions.js';
import { createListView } from './listView.js';
import { createAddItemModal } from './modal.js';
import { createListStore } from './store.js';

const store = createListStore();

const listView = createListView({
  onToggle: (id) => store.dispatch({ type: 'TOGGLE', id }),
  onRemove: (id) => store.dispatch({ type: 'REMOVE', id }),
});

const modal = createAddItemModal({
  onSubmit: (text) => {
    store.dispatch({ type: 'ADD', text });
    listView.scrollToLast();
  },
});

const actions = createActions({
  onUndo: () => store.dispatch({ type: 'UNDO' }),
  onDelete: () => store.dispatch({ type: 'REMOVE_SELECTED' }),
  onAdd: modal.open,
});

const render = (state) => {
  listView.render(state);
  actions.render(state);
};

store.subscribe(render);
render(store.getState());
