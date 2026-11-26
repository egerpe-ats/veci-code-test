import { useState } from 'react';
import type { KeyboardEvent, MouseEvent, SubmitEvent } from 'react';

type Props = {
  onSubmit: (text: string) => void;
  onClose: () => void;
};

const AddItemModal = ({ onSubmit, onClose }: Props) => {
  const [text, setText] = useState('');

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.stopPropagation();
      onClose();
    }
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal" onClick={handleBackdropClick} onKeyDown={handleKeyDown}>
      <div
        className="modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
      >
        <form onSubmit={handleSubmit} noValidate>
          <label className="modal__title" id="modal-title" htmlFor="new-item-input">
            Add item to list
          </label>
          <input
            autoFocus
            className="modal__input"
            id="new-item-input"
            type="text"
            placeholder="Type the text here..."
            autoComplete="off"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
          <div className="modal__actions">
            <button type="submit" className="btn btn--primary" disabled={!text.trim()}>
              Add
            </button>
            <button type="button" className="btn btn--secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;
