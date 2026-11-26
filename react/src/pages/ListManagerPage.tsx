import { useCallback, useReducer, useState } from 'react';
import { INITIAL_ITEMS, createInitialState, listReducer } from '../../../shared/listReducer';
import AddItemModal from '../components/AddItemModal';
import ItemList from '../components/ItemList';
import ListActions from '../components/ListActions';

const ListManagerPage = () => {
  const [state, dispatch] = useReducer(listReducer, INITIAL_ITEMS, createInitialState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const canUndo = state.history.length > 0;
  const hasSelection = state.selectedIds.length > 0;

  const handleAdd = useCallback((text: string) => {
    dispatch({ type: 'ADD', text });
    setIsModalOpen(false);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <section className="card" aria-labelledby="app-title">
      <h1 className="card__title" id="app-title">
        This is a technical proof
      </h1>
      <p className="card__text">
        Lorem ipsum dolor sit amet consectetur adipiscing, elit mus primis nec inceptos. Lacinia
        habitasse arcu molestie maecenas cursus quam nunc, hendrerit posuere augue fames dictumst
        placerat porttitor, dis mi pharetra vestibulum venenatis phasellus.
      </p>

      <ItemList
        items={state.items}
        selectedIds={state.selectedIds}
        onToggle={(id) => dispatch({ type: 'TOGGLE', id })}
        onRemove={(id) => dispatch({ type: 'REMOVE', id })}
      />

      <ListActions
        canUndo={canUndo}
        hasSelection={hasSelection}
        onUndo={() => dispatch({ type: 'UNDO' })}
        onDelete={() => dispatch({ type: 'REMOVE_SELECTED' })}
        onAdd={() => setIsModalOpen(true)}
      />

      {isModalOpen && <AddItemModal onSubmit={handleAdd} onClose={handleCloseModal} />}
    </section>
  );
};

export default ListManagerPage;
