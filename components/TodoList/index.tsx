import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../apps/hooks';
import {
  removeTodo,
  selectTotos,
  toggleDoneTodo,
} from '../../features/todosSlice';

type Props = {
  searchText: string;
  todoType: string;
};

const TodoList = (props: Props) => {
  const { searchText, todoType } = props;
  const todosList = useAppSelector(selectTotos);
  const dispatch = useAppDispatch();

  const filteredTodoList = (() => {
    const filteredList = todosList.filter((e) =>
      e.title.toLowerCase().includes(searchText.toLowerCase())
    );
    if (todoType !== 'all') {
      const isDone = todoType === 'done';
      return filteredList.filter((e) => e.isDone === isDone);
    }
    return filteredList;
  })();

  const handleClickRemove = useCallback((id: string) => {
    dispatch(removeTodo(id));
  }, [dispatch]);

  const handleClickTodo = useCallback((id: string) => {
    dispatch(toggleDoneTodo(id));
  }, [dispatch]);

  return (
    <ul className='list-group'>
      {filteredTodoList.map((e) => (
        <li
          key={e.id}
          className='list-group-item list-group-item-action'
          style={{ cursor: 'pointer' }}
        >
          <div className='d-flex align-items-center gap-2'>
            <span
              className={`flex-grow-1${
                e.isDone ? ' text-decoration-line-through' : ''
              }`}
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              onClick={() => handleClickTodo(e.id)}
            >
              {e.title}
            </span>
            <button
              className='btn btn-outline-secondary btn-sm'
              onClick={() => handleClickRemove(e.id)}
            >
              <i className='bi bi-trash3' />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
