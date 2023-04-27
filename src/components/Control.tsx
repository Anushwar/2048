import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { resetAction } from '@/store/action';

const Control = () => {
  const dispatch = useAppDispatch();
  const size = useAppSelector((state) => state.app.boardSize);
  return (
    <div className="my-2 flex w-full justify-between gap-5">
      <div className="flex flex-col gap-2">
        <p className="text-center font-bold">Board size</p>
        <div className="flex w-full flex-row justify-between gap-2">
          <button onClick={() => dispatch(resetAction(size - 1))}>-</button>
          <div>{size}</div>
          <button onClick={() => dispatch(resetAction(size + 1))}>+</button>
        </div>
      </div>
      <button>New game</button>
    </div>
  );
};

export default Control;
