import Board from '@/components/Board';
import Header from '@/components/Header';

export default function Home() {
  return (
    <main className="mx-auto my-10 max-w-md p-2 ">
      <Header />
      <Board />
    </main>
  );
}
