import { createInitialState, listReducer } from '../shared/listReducer';

const listEl = document.getElementById('item-list');
const emptyEl = document.getElementById('empty-message');
const undoBtn = document.getElementById('undo-btn');
const deleteBtn = document.getElementById('delete-btn');
const addBtn = document.getElementById('add-btn');

const modalEl = document.getElementById('add-modal');
const formEl = document.getElementById('add-form');
const inputEl = document.getElementById('item-input');
const confirmAddBtn = document.getElementById('confirm-add-btn');
const cancelAddBtn = document.getElementById('cancel-add-btn');

let state = createInitialState();
let renderedItems = null;

const render = () => {
  if (state.items !== renderedItems) {
    const fragment = document.createDocumentFragment();

    for (const item of state.items) {
      const li = document.createElement('li');
      li.className = 'list__item';
      li.setAttribute('role', 'option');
      li.tabIndex = 0;
      li.dataset.id = item.id;
      li.textContent = item.text;
      fragment.appendChild(li);
    }

    listEl.replaceChildren(fragment);
    renderedItems = state.items;
  }

  const selected = new Set(state.selectedIds);
  for (const li of listEl.children) {
    li.setAttribute('aria-selected', String(selected.has(li.dataset.id)));
  }

  emptyEl.hidden = state.items.length > 0;
  undoBtn.disabled = state.history.length === 0;
  deleteBtn.disabled = state.selectedIds.length === 0;
};

const dispatch = (action) => {
  const nextState = listReducer(state, action);
  if (nextState === state) return;
  state = nextState;
  render();
};

const openModal = () => {
  formEl.reset();
  confirmAddBtn.disabled = true;
  modalEl.hidden = false;
  inputEl.focus();
};

const closeModal = () => {
  if (modalEl.hidden) return;
  modalEl.hidden = true;
  addBtn.focus();
};

listEl.addEventListener('click', (event) => {
  const item = event.target.closest('.list__item');
  if (item) dispatch({ type: 'TOGGLE', id: item.dataset.id });
});

listEl.addEventListener('dblclick', (event) => {
  const item = event.target.closest('.list__item');
  if (item) dispatch({ type: 'REMOVE', id: item.dataset.id });
});

listEl.addEventListener('keydown', (event) => {
  const item = event.target.closest('.list__item');
  if (!item) return;

  if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault();
    dispatch({ type: 'TOGGLE', id: item.dataset.id });
  }
});

undoBtn.addEventListener('click', () => dispatch({ type: 'UNDO' }));
deleteBtn.addEventListener('click', () => dispatch({ type: 'REMOVE_SELECTED' }));
addBtn.addEventListener('click', openModal);

inputEl.addEventListener('input', () => {
  confirmAddBtn.disabled = inputEl.value.trim().length === 0;
});

formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = inputEl.value.trim();
  if (!text) return;

  dispatch({ type: 'ADD', text });
  listEl.lastElementChild?.scrollIntoView({ block: 'nearest' });
  closeModal();
});

cancelAddBtn.addEventListener('click', closeModal);

modalEl.addEventListener('click', (event) => {
  if (event.target === modalEl) closeModal();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modalEl.hidden) {
    closeModal();
  }
});

render();
