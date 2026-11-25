import { useReducer, useState } from 'react';
import { INITIAL_ITEMS, createInitialState, listReducer } from '../../shared/listReducer';
import ItemList from './components/ItemList';
import AddItemModal from './components/AddItemModal';

const App = () => {
  const [state, dispatch] = useReducer(listReducer, INITIAL_ITEMS, createInitialState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const canUndo = state.history.length > 0;
  const hasSelection = state.selectedIds.length > 0;

  const handleAdd = (text: string) => {
    dispatch({ type: 'ADD', text });
    setIsModalOpen(false);
  };

  return (
    <>
      <nav className="switcher" aria-label="Implementation">
        <a className="switcher__link" href="./index.html" aria-current="page">
          React
        </a>
        <a className="switcher__link" href="./vanilla/index.html">
          Vanilla JS
        </a>
      </nav>

      <main className="page">
        <section className="card" aria-labelledby="app-title">
          <h1 className="card__title" id="app-title">
            This is a technical proof
          </h1>
          <p className="card__text">
            Lorem ipsum dolor sit amet consectetur adipiscing, elit mus primis nec inceptos. Lacinia
            habitasse arcu molestie maecenas cursus quam nunc, hendrerit posuere augue fames
            dictumst placerat porttitor, dis mi pharetra vestibulum venenatis phasellus.
          </p>

          <ItemList
            items={state.items}
            selectedIds={state.selectedIds}
            onToggle={(id) => dispatch({ type: 'TOGGLE', id })}
            onRemove={(id) => dispatch({ type: 'REMOVE', id })}
          />

          <div className="actions">
            <button
              type="button"
              className="btn btn--secondary btn--icon"
              aria-label="Undo"
              title="Undo"
              disabled={!canUndo}
              onClick={() => dispatch({ type: 'UNDO' })}
            >
              <svg
                className="btn__icon"
                viewBox="0 0 21 19"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                aria-hidden="true"
              >
                <path d="M3.5 13.4A8.9 8.9 0 1 0 2.6 9.2" />
                <path d="M0.6 5.2L2.6 9.2L6.4 7.3" />
              </svg>
            </button>

            <button
              type="button"
              className="btn btn--secondary"
              disabled={!hasSelection}
              onClick={() => dispatch({ type: 'REMOVE_SELECTED' })}
            >
              Delete
            </button>

            <button
              type="button"
              className="btn btn--primary actions__end"
              onClick={() => setIsModalOpen(true)}
            >
              Add
            </button>
          </div>
        </section>
      </main>

      {isModalOpen && (
        <AddItemModal onSubmit={handleAdd} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default App;
