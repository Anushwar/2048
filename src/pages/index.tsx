import Board from '@/components/Board';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Play 2048!</title>
      </Head>
      <main className="mx-auto my-5 max-w-lg p-2 ">
        <Header />
        <Board />
        <Footer />
      </main>
    </>
  );
}
