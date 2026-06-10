import Header from './Header/Header';
import Hero from './Hero/Hero';
import About from './Aboutus/Aboutus';
import Services from './Services/Services';
import Contact from './Contact/Contact';
import Testimonials from './Testimonial/Testimonial';
import Footer from './Footer/Footer';
import BlogPreview from './Blog/Blogpreview';

function Homepage() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <Contact />
    <BlogPreview />
    <Footer />

    </>
  );
}

export default Homepage;