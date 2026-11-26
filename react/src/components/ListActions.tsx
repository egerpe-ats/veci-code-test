import UndoIcon from './UndoIcon';

type Props = {
  canUndo: boolean;
  hasSelection: boolean;
  onUndo: () => void;
  onDelete: () => void;
  onAdd: () => void;
};

const ListActions = ({ canUndo, hasSelection, onUndo, onDelete, onAdd }: Props) => {
  return (
    <div className="actions">
      <button
        type="button"
        className="btn btn--secondary btn--icon"
        aria-label="Undo"
        title="Undo"
        disabled={!canUndo}
        onClick={onUndo}
      >
        <UndoIcon />
      </button>

      <button
        type="button"
        className="btn btn--secondary"
        disabled={!hasSelection}
        onClick={onDelete}
      >
        Delete
      </button>

      <button type="button" className="btn btn--primary actions__end" onClick={onAdd}>
        Add
      </button>
    </div>
  );
};

export default ListActions;
