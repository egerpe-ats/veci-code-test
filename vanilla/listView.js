export const createListView = ({ onToggle, onRemove }) => {
  const list = document.getElementById('item-list');
  const emptyMsg = document.getElementById('empty-message');
  let renderedItems = null;

  list.addEventListener('click', (event) => {
    const item = event.target.closest('.list__item');
    if (item) onToggle(item.dataset.id);
  });

  list.addEventListener('dblclick', (event) => {
    const item = event.target.closest('.list__item');
    if (item) onRemove(item.dataset.id);
  });

  list.addEventListener('keydown', (event) => {
    const item = event.target.closest('.list__item');
    if (!item) return;
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      onToggle(item.dataset.id);
    }
  });

  const render = (state) => {
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
      list.replaceChildren(fragment);
      renderedItems = state.items;
    }

    const selected = new Set(state.selectedIds);
    for (const li of list.children) {
      li.setAttribute('aria-selected', String(selected.has(li.dataset.id)));
    }

    emptyMsg.hidden = state.items.length > 0;
  };

  const scrollToLast = () => {
    list.lastElementChild?.scrollIntoView?.({ block: 'nearest' });
  };

  return { render, scrollToLast };
};
