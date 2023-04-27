import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { resetAction } from '@/store/action';
import { useCallback } from 'react';

const Control = () => {
  const dispatch = useAppDispatch();
  const size = useAppSelector((state) => state.app.boardSize);
  const reset = useCallback(
    () => dispatch(resetAction(size)),
    [dispatch, size],
  );
  return (
    <div className="my-2 flex w-full justify-between gap-5">
      <div className="flex flex-col gap-2">
        <p className="text-center font-bold">Board size</p>
        <div className="flex w-full flex-row justify-between gap-2">
          <button
            onClick={() => dispatch(resetAction(size - 1))}
            disabled={size === 4}
          >
            -
          </button>
          <div>{size}</div>
          <button onClick={() => dispatch(resetAction(size + 1))}>+</button>
        </div>
      </div>
      <div className="flex gap-5">
        <button onClick={() => dispatch(reset())}>New game</button>
      </div>
    </div>
  );
};

export default Control;
