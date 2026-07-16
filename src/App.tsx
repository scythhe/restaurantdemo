import { Hero } from './sections/Hero';
import { Place } from './sections/Place';
import { Fire } from './sections/Fire';
import { Table } from './sections/Table';
import { Find } from './sections/Find';
import { Preloader } from './Preloader';
import { useLenis } from './hooks/useLenis';

export default function App() {
  useLenis();

  return (
    <>
      <Preloader />
      <main>
        <Hero />
        <Place />
        <Fire />
        <Table />
        <Find />
      </main>
    </>
  );
}
