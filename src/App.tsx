import { Hero } from './sections/Hero';
import { Place } from './sections/Place';
import { Fire } from './sections/Fire';
import { Table } from './sections/Table';
import { Voices } from './sections/Voices';
import { Reserve } from './sections/Reserve';
import { Find } from './sections/Find';
import { Footer } from './sections/Footer';
import { Nav } from './components/Nav';
import { Marquee } from './components/Marquee';
import { Preloader } from './Preloader';
import { useLenis } from './hooks/useLenis';

export default function App() {
  useLenis();

  return (
    <>
      <Preloader />
      <Nav />
      <main>
        <Hero />
        <Place />
        <Fire />
        <Marquee />
        <Table />
        <Voices />
        <Reserve />
        <Find />
      </main>
      <Footer />
      <div className="grain" aria-hidden="true" />
    </>
  );
}
