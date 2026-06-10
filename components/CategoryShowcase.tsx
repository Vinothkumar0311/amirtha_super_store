// import React, { useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import {
//   Box,
//   Container,
//   Title,
//   Text,
//   Stack,
//   Group,
// } from '@mantine/core';
// import { Gallery } from '../constants';
// import type { Category } from '../types';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);



// const CategoryCard: React.FC<{ category: Category }> = ({ category }) => (
//   <Link to={`/products?category=${encodeURIComponent(category.name)}`} style={{ textDecoration: 'none', flex: '0 0 auto' }}>
//     <Box
//       w={380}
//       h={420}
//       style={{
//         position: 'relative',
//         borderRadius: 12,
//         overflow: 'hidden',
//         cursor: 'pointer',
//         boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
//       }}
//     >
//       <img
//         src={category.imageUrl}
//         alt={category.name}
//         style={{
//           width: '100%',
//           height: '100%',
//           objectFit: 'cover',
//           transition: 'transform 0.8s ease',
//         }}
//         onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.12)')}
//         onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
//       />
//       <Box
//         style={{
//           position: 'absolute',
//           inset: 0,
//           background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
//           display: 'flex',
//           alignItems: 'flex-end',
//           padding: '2rem',
//         }}
//       >

//       </Box>
//     </Box>
//   </Link>
// );

// const CategoryShowcase: React.FC = () => {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const stripRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     // Only run horizontal scroll on large screens
//     const mq = window.matchMedia('(min-width: 992px)');

//     if (!mq.matches || !sectionRef.current || !stripRef.current) return;

//     const section = sectionRef.current;
//     const strip = stripRef.current;

//     // Calculate the total scroll distance
//     const getScrollAmount = () => {
//       const stripWidth = strip.scrollWidth;
//       const viewportWidth = window.innerWidth;
//       return -(stripWidth - viewportWidth);
//     };

//     // Create the horizontal scroll animation
//     const tween = gsap.to(strip, {
//       x: getScrollAmount,
//       ease: 'none',
//       scrollTrigger: {
//         trigger: section,
//         pin: true,
//         scrub: 1,
//         start: 'center center',
//         end: () => `+=${Math.abs(getScrollAmount())}`,
//         invalidateOnRefresh: true,
//         anticipatePin: 1,
//       },
//     });

//     // Cleanup function
//     return () => {
//       tween.kill();
//       ScrollTrigger.getAll().forEach(st => {
//         if (st.trigger === section) {
//           st.kill();
//         }
//       });
//     };
//   }, []);

//   return (
//     <Box
//       component="section"
//       py={{ base: 60, lg: 0 }}
//       style={{  overflow: 'hidden' }}
//     >
//       {/* Title - Outside the pinned section */}
//       <Container size="xl" py={{ base: 40, lg: 80 }}>
//   <Box style={{ textAlign: 'center' }}>
//     <Title

//       fw={200}
//       c="#5d0e0b"
//       style={{
//         position: 'relative',
//         display: 'inline-block',
//         paddingBottom: '12px',
//       }}
//     >
//      Our Gallery
//       {/* Static Underline */}
//       <Box
//         style={{
//           position: 'absolute',
//           left: '50%',
//           bottom: 0,
//           width: '80px',
//           height: '4px',
//           backgroundColor: '#3a0e0d', // Rich brown/red to match your theme
//           transform: 'translateX(-50%)',
//           borderRadius: '2px',
//         }}
//       />
//     </Title>
//   </Box>
// </Container>

//       {/* Horizontal Scroll Section - Desktop Only */}
//       <Box
//         ref={sectionRef}
//         visibleFrom="lg"
//         style={{
//           height: '550px',
//           position: 'relative',
//         }}
//       >
//         <Box
//           ref={stripRef}
//           style={{
//             display: 'flex',
//             gap: '2rem',
//             paddingLeft: '4vw',
//             paddingRight: '4vw',
//             paddingTop: '3rem',
//             paddingBottom: '3rem',
//             width: 'max-content',
//             willChange: 'transform',
//             height: '100%',
//             alignItems: 'center',
//           }}
//         >
//           {Gallery.map((category) => (
//             <CategoryCard key={category.id} category={category} />
//           ))}
//         </Box>
//       </Box>

//       {/* Fallback Grid - Mobile/Tablet */}
//       <Container size="xl" hiddenFrom="lg" pb={60}>
//         <Stack spacing="lg" align="center">
//           <Group justify="center" gap="lg">
//             {Gallery.map((category) => (
//               <Box key={category.id} w={{ base: '100%', sm: 380 }}>
//                 <CategoryCard category={category} />
//               </Box>
//             ))}
//           </Group>
//         </Stack>
//       </Container>
//     </Box>
//   );
// };

// export default CategoryShowcase;

import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Title, Text } from '@mantine/core';
import { Gallery } from '../constants';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';

const CategoryShowcase: React.FC = () => {
  const navigate = useNavigate();
  // Start from the middle index of the Gallery array
  const middleIndex = Math.floor(Gallery.length / 2);
  const [activeIndex, setActiveIndex] = useState(middleIndex);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const updateCards = (index: number) => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      // Logic to handle the "loop" distance so cards transition smoothly
      let diff = i - index;
      
      // Infinite Loop calculation: if distance is more than half the array, 
      // wrap it around to the other side
      const total = Gallery.length;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;

      const isCenter = diff === 0;
      const xPercent = diff * 55; // Horizontal spread
      const z = Math.abs(diff) * -150; // Depth
      const rotateY = diff * -18; // 3D Tilt
      const opacity = Math.abs(diff) > 2 ? 0 : 1 - Math.abs(diff) * 0.35;
      const zIndex = 100 - Math.abs(diff);

      gsap.to(card, {
        duration: 0.8,
        xPercent: xPercent,
        z: z,
        rotateY: rotateY,
        opacity: opacity,
        zIndex: zIndex,
        scale: isCenter ? 1 : 0.82,
        filter: isCenter ? 'blur(0px)' : 'blur(2px)',
        ease: 'power3.out',
      });
    });
  };

  useEffect(() => {
    updateCards(activeIndex);

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % Gallery.length);
    }, 4000); // 4 seconds interval for smoother transition

    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <Box 
      py={80}
      style={{ 
        overflow: 'hidden', 
        backgroundColor: '#fff',
        perspective: '1500px'
      }}
    >
      <Container size="xl" style={{ textAlign: 'center', marginBottom: '60px' }}>
        <Title fw={200} c="#5d0e0b" style={{ fontSize: '2.5rem', letterSpacing: '1px' }}>
          Our Craft Gallery
        </Title>
        <Text c="dimmed" mt="sm">
          A showcase of traditional South Indian bronze idols, elegant wooden furniture, and sacred puja items.
        </Text>
      </Container>

      <Box
        style={{
          position: 'relative',
          height: '550px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transformStyle: 'preserve-3d',
        }}
      >
        {Gallery.map((category, index) => (
          <Box
            key={category.id}
            ref={(el) => (cardsRef.current[index] = el!)}
            style={{
              position: 'absolute',
              width: '320px',
              height: '480px',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.3)',
              backgroundColor: '#fff',
              cursor: 'pointer',
              // Initially hide cards not near the center to prevent flash
              opacity: 0 
            }}
            onClick={() => {
              if (index === activeIndex) {
                // Navigate to product filter page for this category
                navigate(`/products?category=${encodeURIComponent(category.name)}`);
              } else {
                setActiveIndex(index);
              }
            }}
          >
            <img
              src={category.imageUrl}
              alt={category.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            
            {/* Floating Info Card */}
            <Box
              style={{
                position: 'absolute',
                bottom: 20,
                left: 15,
                right: 15,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                padding: '14px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
              }}
            >
              <img 
                src={category.imageUrl} 
                width={42} height={42} 
                style={{ borderRadius: 6, objectFit: 'cover' }} 
              />
              <Box>
                <Text fw={700} size="xs" c="#222" style={{ lineHeight: 1.2 }}>
                  {category.name}
                </Text>
                <Text size="9px" fw={600} c="#888" mt={3} style={{ letterSpacing: '0.5px' }}>
                  VIEW DETAILS ›
                </Text>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Pagination Dots */}
      <Box style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '50px' }}>
        {Gallery.map((_, i) => (
          <Box
            key={i}
            onClick={() => setActiveIndex(i)}
            style={{
              width: i === activeIndex ? '30px' : '8px',
              height: '8px',
              borderRadius: '4px',
              backgroundColor: i === activeIndex ? '#5d0e0b' : '#e0e0e0',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              cursor: 'pointer'
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CategoryShowcase;