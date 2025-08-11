'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const images = [
  {
    src: '/watergarden.jpg',
    title: 'Water Gardens',
    description: 'Ancient water gardens of Sigiriya'
  },
  {
    src: '/topview.jpg',
    title: 'Aerial View',
    description: 'Breathtaking view from above'
  },
  {
    src: '/watergarden.jpg',
    title: 'Ancient Paintings',
    description: 'Frescoes of Sigiriya'
  },
  {
    src: '/watergarden.jpg',
    title: 'Lion Gate',
    description: 'The majestic entrance'
  },
  {
    src: '/watergarden.jpg',
    title: 'Sigiriya Rock',
    description: 'The iconic rock fortress'
  },
  {
    src: '/watergarden.jpg',
    title: 'Sunrise',
    description: 'Dawn over Sigiriya'
  }
];

export default function ModernGallery() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial animation - stagger the images in
    const tl = gsap.timeline();
    
    tl.from(imageRefs.current, {
      duration: 0.8,
      y: 100,
      opacity: 0,
      scale: 0.8,
      stagger: 0.1,
      ease: "power3.out"
    });

    // Hover animations
    imageRefs.current.forEach((img, index) => {
      if (!img) return;
      
      img.addEventListener('mouseenter', () => {
        gsap.to(img, {
          duration: 0.3,
          scale: 1.05,
          y: -10,
          ease: "power2.out"
        });
      });
      
      img.addEventListener('mouseleave', () => {
        gsap.to(img, {
          duration: 0.3,
          scale: 1,
          y: 0,
          ease: "power2.out"
        });
      });
    });
  }, []);

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
    setIsExpanded(true);
    
    // Animate overlay in
    gsap.fromTo(overlayRef.current,
      { opacity: 0 },
      { duration: 0.4, opacity: 1, ease: "power2.out" }
    );
  };

  const handleClose = () => {
    gsap.to(overlayRef.current, {
      duration: 0.3,
      opacity: 0,
      ease: "power2.out",
      onComplete: () => setIsExpanded(false)
    });
  };

  const nextImage = () => {
    const next = (selectedImage + 1) % images.length;
    setSelectedImage(next);
  };

  const prevImage = () => {
    const prev = selectedImage === 0 ? images.length - 1 : selectedImage - 1;
    setSelectedImage(prev);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
            Sigiriya Gallery
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover the ancient wonders of Sigiriya through our curated collection of stunning imagery
          </p>
        </div>

        {/* Gallery Grid */}
        <div 
          ref={galleryRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {images.map((image, index) => (
            <div
              key={index}
              ref={(el) => {
                imageRefs.current[index] = el;
              }}
              onClick={() => handleImageClick(index)}
              className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer"
            >
              <div className="aspect-[4/2] relative overflow-hidden">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-semibold mb-2">{image.title}</h3>
                  <p className="text-sm opacity-90">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleImageClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === selectedImage 
                  ? 'bg-slate-800 scale-125' 
                  : 'bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Fullscreen Overlay */}
      {isExpanded && (
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <div className="relative max-w-6xl max-h-full">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors duration-200"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="relative">
              <img
                src={images[selectedImage].src}
                alt={images[selectedImage].title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {images[selectedImage].title}
                </h3>
                <p className="text-white/90">
                  {images[selectedImage].description}
                </p>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors duration-200"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors duration-200"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
