import { useReveal } from '@/hooks/useReveal'
import './landing.css'
import Nav from './Nav'
import Hero from './Hero'
import Proof from './Proof'
import HowItWorks from './HowItWorks'
import Tools from './Tools'
import Niches from './Niches'
import Compare from './Compare'
import Pricing from './Pricing'
import Faq from './Faq'
import FinalCta from './FinalCta'
import Footer from './Footer'
import StickyCta from './StickyCta'

export default function Landing() {
  useReveal()
  return (
    <div className="landing">
      <Nav />
      <main>
        <Hero />
        <Proof />
        <HowItWorks />
        <Tools />
        <Niches />
        <Compare />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <StickyCta />
    </div>
  )
}
