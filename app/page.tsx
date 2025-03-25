import NavBar from './components/NavBar'
import NavCard from './components/NavCard'

export default function Home() {
  return (
   <main>
    <NavBar></NavBar>
    <div className='flex justify-center mt-20'>
      <NavCard name="All Products" path="/products"></NavCard>
    </div>
    </main>
  )
}
