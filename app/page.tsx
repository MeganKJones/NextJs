import NavBar from './components/NavBar'
import NavCard from './components/NavCard'

export default function Home() {
  return (
   <main>
    <NavBar></NavBar>
    <div className='flex justify-center mt-20 gap-4'>
      <NavCard name="Products" path="/products" desc="Your one-stop look at all LUSH products, past and present."></NavCard>
      <NavCard name="Collections" path="/collections" desc="Take a look at collections new and old."></NavCard>
      <NavCard name="Product Types" path="/productTypes" desc="Browse by type — bombs, bubbles, bars & more.."></NavCard>
    </div>
    </main>
  )
}
