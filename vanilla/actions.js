export const createActions = ({ onUndo, onDelete, onAdd }) => {
  const undoBtn = document.getElementById('undo-btn');
  const deleteBtn = document.getElementById('delete-btn');
  const addBtn = document.getElementById('add-btn');

  undoBtn.addEventListener('click', onUndo);
  deleteBtn.addEventListener('click', onDelete);
  addBtn.addEventListener('click', onAdd);

  const render = (state) => {
    undoBtn.disabled = state.history.length === 0;
    deleteBtn.disabled = state.selectedIds.length === 0;
  };

  return { render };
};
