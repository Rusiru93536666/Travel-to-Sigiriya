'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/navbar';
import Gallery from './components/Gallery';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const importantSectionRef = useRef<HTMLElement>(null);
  const paintingSectionRef = useRef<HTMLDivElement>(null);
  const lionGateSectionRef = useRef<HTMLDivElement>(null);

  // Animate hero text
  useLayoutEffect(() => {
    if (!headingRef.current) return;

    gsap.fromTo(
      headingRef.current,
      { x: -200, opacity: 0 },
      {
        x: 320,
        opacity: 1,
        duration: 2,
        ease: 'power3.out',
      }
    );
  }, []);

  // Animate About Section on scroll
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!aboutSectionRef.current) return;

      const heading = aboutSectionRef.current.querySelector('h2');
      const paragraph = aboutSectionRef.current.querySelector('p');

      if (heading && paragraph) {
        gsap.from(heading, {
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          y: 100,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        });

        gsap.from(paragraph, {
          scrollTrigger: {
            trigger: paragraph,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          y: 50,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
        });
      }
    });

    return () => ctx.revert();
  }, []);

  // Animate plane on scroll
  useLayoutEffect(() => {
    if (!planeRef.current || !importantSectionRef.current) return;

    const planeImage = planeRef.current.querySelector('img');

    if (!planeImage) return;

    gsap.fromTo(
      planeImage,
      { x: '100%' }, // Start offscreen right
      {
        x: '-500%', // Fly fully left offscreen
        ease: 'power2.out',
        scrollTrigger: {
          trigger: importantSectionRef.current,
          start: 'top 40%',
          end: 'bottom 10%',
          scrub: 1,
          // markers: true,
        },
      }
    );
  }, []);

  // Animate Painting of Sigiriya Section
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!paintingSectionRef.current) return;
      const image = paintingSectionRef.current.querySelector('img');

      if (image) {
        gsap.from(image, {
          scrollTrigger: {
            trigger: image,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          x: -100,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
        });
      }
    });
    return () => ctx.revert();
  }, []);

  // Animate Lion Gate Section
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!lionGateSectionRef.current) return;
      const image = lionGateSectionRef.current.querySelector('img');

      if (image) {
        gsap.from(image, {
          scrollTrigger: {
            trigger: image,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          x: 100,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full bg-white">
      <Navbar />

      {/* Hero Section */}
      <div id="about" className="w-full h-screen relative overflow-hidden">
        <Image
          src="/sigiriyabg.png"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
          <h1
            ref={headingRef}
            className="lg:text-[180px] md:text-[100px] sm:text-[80px] font-bold drop-shadow-2xl">
            SIGIRIYA
          </h1>
        </div>

        <div className="absolute top-0 left-0 w-full h-full z-10">
          <Image
            src="/sigiriyarock.png"
            alt="Sigiriya Rock"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Static Heading */}
      <div id="history" className="text-black text-7xl flex items-center justify-center font-bold h-[20vh]">
        About Sigiriya
      </div>

      {/* Blurred Card Section */}
      <div ref={aboutSectionRef} id="lionrock" className="relative w-[100vw] h-[100vh]">
        <Image
          src="/sunrise.jpg"
          alt="Sigiriya Rock"
          fill
          className="object-cover"
          priority
        />

        <div className="absolute top-1/2 right-10 transform -translate-y-1/2 bg-white/30 backdrop-blur-md shadow-xl rounded-xl p-6 w-[50vw] z-10 text-black">
          <h2 className="text-2xl font-bold mb-2">Lion Rock</h2>
          <p className="text-sm">
            Sigiriya, also known as Lion Rock, is a world-famous ancient rock fortress located in the Matale
            District near Dambulla in the Central Province of Sri Lanka. Rising 200 meters (660 feet) above the
            surrounding plains, this massive rock formation is one of the country’s most iconic landmarks and
            is often referred to as the “Eighth Wonder of the World” due to its incredible combination of history,
            architecture, and engineering. Built by King Kashyapa in the 5th century AD, Sigiriya features
            sophisticated water gardens, ancient frescoes, and the remnants of a royal palace on its summit.
          </p>
        </div>
      </div>

      {/* Important of Sigiriya Section */}
      <section
        ref={importantSectionRef}
        className="w-full py-20 px-6 md:px-20 bg-white text-black"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text on Left */}
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold mb-6">The History Behind Sigiriya Lion Rock</h2>
            <p className="text-lg leading-8">
            Sigiriya, also known as Lion Rock, is one of Sri Lanka’s most iconic landmarks with a rich and dramatic 
            history. Rising 200 meters above the jungle, this ancient rock fortress was transformed into a royal 
            palace by King Kashyapa in the 5th century AD. After seizing the throne, Kashyapa chose Sigiriya as his 
            stronghold, building elaborate gardens, water systems, and a grand palace on top of the rock.The name 
            “Lion Rock” comes from the giant lion-shaped gateway that once stood at the entrance. The site is also 
            famous for its ancient frescoes and the mirror wall, which still bears centuries-old inscriptions. 
            After Kashyapa's fall, Sigiriya became a Buddhist monastery before being abandoned and later rediscovered
             by British explorers.Today, it stands as a UNESCO World Heritage Site and a powerful symbol of ancient
              Sri Lankan art, architecture, and engineering.
            </p>
          </div>

          {/* Image on Right */}
          <div className="md:w-1/2">
            <Image
              src="/topview.jpg"
              alt="Water Gardens of Sigiriya"
              width={600}
              height={400}
              className="rounded-xl shadow-lg object-cover w-full h-auto"
            />
          </div>

          {/* Plane animation above Important section */}
      <div
        ref={planeRef}
        className="absolute w-full h-[100vh] overflow-hidden mb-10"
      >
        <Image
          src="/plane.png"
          alt="Flying Plane"
          width={500}
          height={400}
          className="absolute top-1/2 transform -translate-y-1/2"
          style={{ left: '100%' }}
        />
      </div>
        </div>
      </section>

      {/* painting of sigiriya */}
      <section
        ref={paintingSectionRef}
        className="w-full py-20 px-6 md:px-20 bg-white text-black"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Image on Right */}
          <div className="md:w-1/2">
            <Image
              src="/painting.jpg"
              alt="painting of sigiriya"
              width={600}
              height={400}
              className="rounded-xl shadow-lg object-cover w-full h-auto"
            />
          </div>

          {/* Text on Left */}
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold mb-6">The artistic thinking</h2>
            <p className="text-lg leading-8">
            The fresco paintings in Sri Lanka strongly bear resemblance to the “Gupta Style” 
            of painting common to India’s Ajanta Caves. The frescoes at Sigiriya are, however,
             more vibrant and fluid compared to those found in the Ajanta Caves. From an artistic 
             perspective, they represent ancient Sinhala art at its prime. They are also the only known 
             open display of female sensuality to have ever been depicted in local art in a form that isn’t
              strictly stylised and are the sole secular antique art pieces in existence in Sri Lanka today
            </p>
          </div>
        </div>
      </section>

       {/* lion gate in sigiriya */}
       <section
        ref={lionGateSectionRef}
        id="liongate"
        className="w-full py-20 px-6 md:px-20 bg-white text-black">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">

          {/* Text on Left */}
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold mb-6">The Lion Gate of Sigiriya</h2>
            <p className="text-lg leading-8">
            The famed Mirror Wall ends at a courtyard that was once dominated by the Lion Gate. 
            All that remains of the structure now are two massive paws that flank a staircase.
             The stairs once led through the open mouth of the head of a lion that lay crouched 
             between the paws. There sits an outcropping where a squatting guard may have had to 
             stay awake at his post or fall to his death. The rock was in the process of being raised 
             on splints, with this massive boulder being poised to be dropped on armies that decided 
             to invade. An apparent weakness of this strategy is that it did not really overhang any 
             of the paths that one would use to enter the Lion Gate. There are very few defensive structure
              that were built to surround this inner sanctum. It is suspected that they perhaps collapsed
               a long time ago with the lion head or maybe never even existed in the first place.
            </p>
          </div>

          {/* Image on Right */}
          <div className="md:w-1/2">
            <Image
              src="/liongate.jpg"
              alt="liongate of sigiriya"
              width={600}
              height={400}
              className="rounded-xl shadow-lg object-cover w-full h-auto"
            />
          </div>
        </div>
      </section>

      <div id="painting"><Gallery /></div>
      
    </div>
  );
}
