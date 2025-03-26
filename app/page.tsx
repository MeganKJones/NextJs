import Breadcrumbs from './components/Breadcrumbs'
import NavCard from './components/NavCard'

export default function Home() {
  return (
   <main>
    <Breadcrumbs></Breadcrumbs>
    <div className='flex justify-center mt-20 gap-4'>
      <NavCard name="Collections" path="/collections" desc="Take a look at collections new and old."></NavCard>
      <NavCard name="Products" path="/products" desc="Your one-stop look at all LUSH products, past and present."></NavCard>
      <NavCard name="Product Types" path="/productTypes" desc="Browse by type — bombs, bubbles, bars & more.."></NavCard>
    </div>
    </main>
  )
}
