import Control from './Control';

const Header = () => {
  return (
    <>
      <div className="flex justify-between align-middle">
        <h1 className="text-7xl font-bold">2048</h1>
        <div className="flex gap-5">
          <div className="m-auto rounded-md bg-[#bbada0] p-5 text-center font-bold">
            <div className="font-bold uppercase">Score</div>
            <div>{200}</div>
          </div>
          <div className="m-auto rounded-md border-2 bg-[#bbada0] p-5 text-center font-bold">
            <div className="font-bold uppercase">Best</div>
            <div>{20000}</div>
          </div>
        </div>
      </div>

      <Control />
    </>
  );
};

export default Header;
