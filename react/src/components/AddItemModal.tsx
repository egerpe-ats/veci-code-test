import { useEffect, useRef, useState } from 'react';
import type { MouseEvent, SubmitEvent } from 'react';

type AddItemModalProps = {
  onSubmit: (text: string) => void;
  onClose: () => void;
};

const AddItemModal = ({ onSubmit, onClose }: AddItemModalProps) => {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <div className="modal" onClick={handleBackdropClick}>
      <div className="modal__dialog" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <form onSubmit={handleSubmit} noValidate>
          <label className="modal__title" id="modal-title" htmlFor="new-item-input">
            Add item to list
          </label>
          <input
            ref={inputRef}
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
