import type { KeyboardEvent } from 'react';
import type { ListItem } from '../../../shared/listReducer';

type ItemListProps = {
  items: ListItem[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
};

const ItemList = ({ items, selectedIds, onToggle, onRemove }: ItemListProps) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLLIElement>, id: string) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      onToggle(id);
    }
  };

  return (
    <div className="list-box">
      <ul className="list" role="listbox" aria-label="Items" aria-multiselectable="true">
        {items.map((item) => {
          const isSelected = selectedIds.includes(item.id);

          return (
            <li
              key={item.id}
              className="list__item"
              role="option"
              tabIndex={0}
              aria-selected={isSelected}
              onClick={() => onToggle(item.id)}
              onDoubleClick={() => onRemove(item.id)}
              onKeyDown={(event) => handleKeyDown(event, item.id)}
            >
              {item.text}
            </li>
          );
        })}
      </ul>

      {items.length === 0 && (
        <p className="list-box__empty">No items yet. Click Add to create one.</p>
      )}
    </div>
  );
};

export default ItemList;
