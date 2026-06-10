// import React, { useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { Box, Container, Title, Text, Button } from '@mantine/core';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// const HeroSection: React.FC = () => {
//   const heroRef = useRef<HTMLDivElement>(null);
//   const backgroundRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // Parallax effect: background moves slower than foreground content
//       gsap.to(backgroundRef.current, {
//         yPercent: 40, // Moves up slower than page scroll
//         ease: "none",
//         scrollTrigger: {
//           trigger: heroRef.current,
//           start: "top top",
//           end: "bottom top",
//           scrub: true, // Smooth scrubbing tied to scroll
//         },
//       });
//     }, heroRef);

//     return () => ctx.revert(); // Cleanup on unmount
//   }, []);

//   return (
//     <Box
//       ref={heroRef}
//       id="hero"
//       style={{
//         position: 'relative',
//         height: '90vh', // Slightly taller for better parallax feel
//         overflow: 'hidden',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         color: 'white',
//       }}
//     >
//       {/* Parallax Background Layer */}
//       <Box
//         ref={backgroundRef}
//         style={{
//           position: 'absolute',
//           inset: 0,
//           backgroundImage: "url('/assets/home/hero.png')",
//           backgroundSize: 'cover',
//           backgroundPosition: 'center top',
//           transform: 'translateZ(0)', // Enable GPU acceleration
//           willChange: 'transform',
//         }}
//       />

//       {/* Dark Overlay */}
//       <Box
//         style={{
//           position: 'absolute',
//           inset: 0,
//           backgroundColor: 'rgba(0, 0, 0, 0.5)',
//           zIndex: 1,
//         }}
//       />

//       {/* Foreground Content */}
//       <Container
//         style={{
//           position: 'relative',
//           zIndex: 10,
//           textAlign: 'center',
//         }}
//       >
//         <Title
//           order={1}
//           fw={400}
//           mb="md"
//           style={{
//             textShadow: '3px 3px 10px rgba(0,0,0,0.7)',
//             lineHeight: 1.1,
//           }}
//         >
//           <span style={{ color: '#800020', fontSize: "80px" }}>Amirtha </span>
//           <span style={{ color: '#f0ece9', fontSize: "70px" }}>Super Store</span>
//         </Title>

//         <Text
//           maw={900}
//           mx="auto"
//           mb="xl"
//           style={{
//             textShadow: '1px 1px 6px rgba(0,0,0,0.8)',
//             fontWeight: 500,
//           }}
//         >
//           Your trusted destination for traditional Bronze Statues, modern Electronics,
//           and premium Furniture in Kumbakonam.
//         </Text>

//         <Button
//           component={Link}
//           to="/products"
//           size="xl"
//           radius="xl"
//           style={{
//             backgroundColor: '#1a539eff',
//             color: '#eee5e5',
//             fontWeight: 700,
//             fontSize: '1.2rem',
//             padding: '1rem 2.5rem',
//             boxShadow: '0 8px 25px rgba(0,0,0,0.4)',
//             transition: 'all 0.3s ease',
//           }}
//           styles={{
//             root: {
//               '&:hover': {
//                 backgroundColor: '#d67e19',
//                 transform: 'translateY(-5px) scale(1.05)',
//                 boxShadow: '0 15px 35px rgba(214, 126, 25, 0.4)',
//               },
//             },
//           }}
//         >
//           Explore Collection
//         </Button>
//       </Container>

//       {/* Optional: Subtle scroll indicator */}
//       <Box
//         style={{
//           position: 'absolute',
//           bottom: '30px',
//           left: '50%',
//           transform: 'translateX(-50%)',
//           zIndex: 10,
//           animation: 'bounce 2s infinite',
//         }}
//       >
//         <Text size="sm" c="white" opacity={0.7}>
//           Scroll down
//         </Text>
//         <Box
//           style={{
//             width: '30px',
//             height: '50px',
//             border: '2px solid rgba(255,255,255,0.5)',
//             borderRadius: '30px',
//             margin: '10px auto 0',
//             position: 'relative',
//           }}
//         >
//           <Box
//             style={{
//               width: '6px',
//               height: '12px',
//               background: 'white',
//               borderRadius: '3px',
//               position: 'absolute',
//               top: '8px',
//               left: '50%',
//               transform: 'translateX(-50%)',
//               animation: 'scrollDot 2s infinite',
//             }}
//           />
//         </Box>
//       </Box>

//       {/* CSS Animations for scroll indicator */}
//       <style>{`
//         @keyframes bounce {
//           0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
//           40% { transform: translateY(-10px); }
//           60% { transform: translateY(-5px); }
//         }
//         @keyframes scrollDot {
//           0% { top: 8px; opacity: 0; }
//           50% { opacity: 1; }
//           100% { top: 25px; opacity: 0; }
//         }
//       `}</style>
//     </Box>
//   );
// };

// export default HeroSection;