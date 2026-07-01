import Header from './Header/Header';
import Hero from './Hero/Hero';
import About from './Aboutus/Aboutus';
import Services from './Services/Services';
import Contact from './Contact/Contact';
import Testimonials from './Testimonial/Testimonial';
import Footer from './Footer/Footer';
import BlogPreview from './Blog/Blogpreview';
import Drive from './Drive';


import Reveal from '../components/Reveal';

function Homepage() {
  return (
    <>
      <Reveal><Header /></Reveal>
      <Reveal><Hero /></Reveal>
      <Reveal><About /></Reveal>
      <Reveal><Services /></Reveal>
      <Reveal><Drive/></Reveal>
      <Reveal><Testimonials /></Reveal>
      <Reveal><Contact /></Reveal>
      <Reveal><BlogPreview /></Reveal>
      <Reveal><Footer /></Reveal>
    </>
  );
}

export default Homepage;