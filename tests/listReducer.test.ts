import { createInitialState, listReducer } from '../shared/listReducer';
import type { ListState } from '../shared/listReducer';

const getTexts = (state: ListState) => state.items.map((item) => item.text);

describe('listReducer', () => {
  it('adds a trimmed item to the list', () => {
    const state = createInitialState(['Item 1', 'Item 2']);
    const next = listReducer(state, { type: 'ADD', text: '  Item 3  ' });

    expect(getTexts(next)).toEqual(['Item 1', 'Item 2', 'Item 3']);
    expect(next.history).toHaveLength(1);
  });

  it('ignores empty or whitespace-only entries', () => {
    const state = createInitialState(['Item 1']);

    expect(listReducer(state, { type: 'ADD', text: '' })).toBe(state);
    expect(listReducer(state, { type: 'ADD', text: '   ' })).toBe(state);
  });

  it('toggles single and multiple selections', () => {
    const state = createInitialState(['Item 1', 'Item 2']);
    const [first, second] = state.items;

    let next = listReducer(state, { type: 'TOGGLE', id: first.id });
    next = listReducer(next, { type: 'TOGGLE', id: second.id });
    expect(next.selectedIds).toEqual([first.id, second.id]);

    next = listReducer(next, { type: 'TOGGLE', id: first.id });
    expect(next.selectedIds).toEqual([second.id]);
  });

  it('does not delete anything when nothing is selected', () => {
    const state = createInitialState(['Item 1', 'Item 2']);
    expect(listReducer(state, { type: 'REMOVE_SELECTED' })).toBe(state);
  });

  it('removes all selected items at once', () => {
    const state = createInitialState(['Item 1', 'Item 2', 'Item 3']);
    const [first, , third] = state.items;

    let next = listReducer(state, { type: 'TOGGLE', id: first.id });
    next = listReducer(next, { type: 'TOGGLE', id: third.id });
    next = listReducer(next, { type: 'REMOVE_SELECTED' });

    expect(getTexts(next)).toEqual(['Item 2']);
    expect(next.selectedIds).toEqual([]);
  });

  it('removes a single item by id', () => {
    const state = createInitialState(['Item 1', 'Item 2']);
    const next = listReducer(state, { type: 'REMOVE', id: state.items[0].id });

    expect(getTexts(next)).toEqual(['Item 2']);
  });

  it('undoes previous changes in order', () => {
    const initial = createInitialState(['Item 1', 'Item 2']);
    let state = listReducer(initial, { type: 'ADD', text: 'Item 3' });
    state = listReducer(state, { type: 'TOGGLE', id: state.items[0].id });
    state = listReducer(state, { type: 'REMOVE_SELECTED' });

    expect(getTexts(state)).toEqual(['Item 2', 'Item 3']);

    state = listReducer(state, { type: 'UNDO' });
    expect(getTexts(state)).toEqual(['Item 1', 'Item 2', 'Item 3']);
    expect(state.selectedIds).toEqual([]);

    state = listReducer(state, { type: 'UNDO' });
    expect(getTexts(state)).toEqual(['Item 1', 'Item 2']);
    expect(state.history).toHaveLength(0);
  });

  it('keeps valid selection and drops removed ids when undoing an add', () => {
    const initial = createInitialState(['Item 1']);
    let state = listReducer(initial, { type: 'ADD', text: 'Item 2' });
    const [first, added] = state.items;

    state = listReducer(state, { type: 'TOGGLE', id: first.id });
    state = listReducer(state, { type: 'TOGGLE', id: added.id });
    state = listReducer(state, { type: 'UNDO' });

    expect(getTexts(state)).toEqual(['Item 1']);
    expect(state.selectedIds).toEqual([first.id]);
  });
});
