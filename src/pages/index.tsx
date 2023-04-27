import Board from '@/components/Board';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function Home() {
  return (
    <main className="mx-auto my-5 max-w-lg p-2 ">
      <Header />
      <Board />
      <Footer />
    </main>
  );
}
