import Header from './Header'
import Footer from './Footer'
export default function HomePage() {
  return (
    <main>
      <Header />
      <section className="p-8">
        <h2 className="text-xl">Welcome to the homepage!</h2>
        {/* More content here */}
      </section>
      <Footer/>
    </main>
    
  )
}


