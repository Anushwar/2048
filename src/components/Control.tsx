const Control = () => {
  return (
    <div className="my-2 flex w-full justify-between gap-5">
      <div className="flex flex-col gap-2">
        <p className="text-center font-bold">Board size</p>
        <div className="flex w-full flex-row justify-between gap-2">
          <button>-</button>
          <div>{100}</div>
          <button>+</button>
        </div>
      </div>
      <button>New game</button>
    </div>
  );
};

export default Control;
