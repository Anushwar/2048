import Control from './Control';
import useAppSelector from '@/hooks/useAppSelector';

const Header = () => {
  const score = useAppSelector((state) => state.app.score);
  const best = useAppSelector((state) => state.app.best);

  return (
    <>
      <div className="flex justify-between align-middle">
        <h1 className="text-5xl font-bold">2048</h1>
        <div className="flex gap-5">
          <div className="m-auto rounded-md bg-[#bbada0] p-6 text-center font-bold">
            <div className="font-bold uppercase">Score</div>
            <div>{score}</div>
          </div>
          <div className="m-auto rounded-md border-2 bg-[#bbada0] p-6 text-center font-bold">
            <div className="font-bold uppercase">Best</div>
            <div>{best}</div>
          </div>
        </div>
      </div>

      <Control />
    </>
  );
};

export default Header;
