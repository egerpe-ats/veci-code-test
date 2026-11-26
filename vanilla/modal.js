export const createAddItemModal = ({ onSubmit }) => {
  const modal = document.getElementById('add-modal');
  const form = document.getElementById('add-form');
  const input = document.getElementById('item-input');
  const confirmBtn = document.getElementById('confirm-add-btn');
  const cancelBtn = document.getElementById('cancel-add-btn');

  const open = () => {
    form.reset();
    confirmBtn.disabled = true;
    modal.hidden = false;
    input.focus();
  };

  const close = () => {
    if (modal.hidden) return;
    modal.hidden = true;
  };

  input.addEventListener('input', () => {
    confirmBtn.disabled = input.value.trim().length === 0;
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    onSubmit(text);
    close();
  });

  cancelBtn.addEventListener('click', close);

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      close();
    }
  });

  modal.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      close();
    }
  });

  return { open, close };
};
