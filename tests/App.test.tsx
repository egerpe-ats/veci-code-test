import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../react/src/App';

describe('App', () => {
  it('renders the initial list with delete and undo disabled', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'This is a technical proof' })).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(4);
    expect(screen.getByRole('button', { name: /delete/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /undo/i })).toBeDisabled();
  });

  it('adds a new item through the modal', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /^add$/i }));
    const dialog = screen.getByRole('dialog');

    await user.type(within(dialog).getByRole('textbox'), 'Item 5');
    await user.click(within(dialog).getByRole('button', { name: /^add$/i }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Item 5' })).toBeInTheDocument();
  });

  it('prevents adding empty strings', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /^add$/i }));
    const dialog = screen.getByRole('dialog');
    const submitBtn = within(dialog).getByRole('button', { name: /^add$/i });

    expect(submitBtn).toBeDisabled();
    await user.type(within(dialog).getByRole('textbox'), '   ');
    expect(submitBtn).toBeDisabled();
  });

  it('closes the modal with Cancel or Escape', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /^add$/i }));
    await user.click(screen.getByRole('button', { name: /cancel/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /^add$/i }));
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('selects multiple items and deletes them', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('option', { name: 'Item 1' }));
    await user.click(screen.getByRole('option', { name: 'Item 3' }));

    const deleteBtn = screen.getByRole('button', { name: /delete/i });
    expect(deleteBtn).toBeEnabled();
    await user.click(deleteBtn);

    const remaining = screen.getAllByRole('option').map((el) => el.textContent);
    expect(remaining).toEqual(['Item 2', 'Item 4']);
    expect(deleteBtn).toBeDisabled();
  });

  it('deletes an item on double click', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.dblClick(screen.getByRole('option', { name: 'Item 2' }));

    const remaining = screen.getAllByRole('option').map((el) => el.textContent);
    expect(remaining).toEqual(['Item 1', 'Item 3', 'Item 4']);
  });

  it('undoes previous changes', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.dblClick(screen.getByRole('option', { name: 'Item 4' }));
    expect(screen.getAllByRole('option')).toHaveLength(3);

    await user.click(screen.getByRole('button', { name: /undo/i }));
    expect(screen.getAllByRole('option')).toHaveLength(4);
    expect(screen.getByRole('option', { name: 'Item 4' })).toBeInTheDocument();
  });
});
