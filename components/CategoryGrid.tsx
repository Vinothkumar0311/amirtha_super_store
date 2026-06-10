// import React, { useRef, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import {
//   Box,
//   Container,
//   Title,
//   Anchor,
//   Group,
//   Grid,
//   Image,
//   Stack,
//   Text,
//   Badge,
// } from '@mantine/core';
// import type { Category } from '../types'; // Make sure Category type is imported
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// import { motion } from "framer-motion";


// const MotionGroup = motion(Group);



// gsap.registerPlugin(ScrollTrigger);

// interface CategoryGridProps {
//   title: string;
//   categories: Category[]; // Now accepts categories instead of products
//   showMoreLink?: string;
//   sidebarImageUrl: string;
//   sidebarTitle?: string;
//   sidebarDescription?: string;
// }

// const CategoryGrid: React.FC<CategoryGridProps> = ({
//   title,
//   categories,
//   showMoreLink,
//   sidebarImageUrl,
//   sidebarTitle,
//   sidebarDescription,
// }) => {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const sidebarImageRef = useRef<HTMLDivElement>(null);
//   const sidebarBoxRef = useRef<HTMLDivElement>(null);
//   const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // Parallax effect on sidebar image
//       if (sidebarImageRef.current) {
//         gsap.to(sidebarImageRef.current, {
//           y: -80,
//           scrollTrigger: {
//             trigger: sectionRef.current,
//             start: 'top bottom',
//             end: 'bottom top',
//             scrub: 1.5,
//           },
//         });
//       }

//       // Floating animation on sidebar
//       if (sidebarBoxRef.current) {
//         gsap.to(sidebarBoxRef.current, {
//           y: -15,
//           duration: 3.5,
//           ease: 'power1.inOut',
//           repeat: -1,
//           yoyo: true,
//         });
//       }

//       // Animate categories with zigzag effect
//       categoryRefs.current.forEach((card, index) => {
//         if (!card) return;

//         const isEven = index % 2 === 0;

//         gsap.fromTo(
//           card,
//           {
//             x: isEven ? -80 : 80,
//             opacity: 0,
//             scale: 0.9,
//           },
//           {
//             x: 0,
//             opacity: 1,
//             scale: 1,
//             duration: 1,
//             ease: 'power3.out',
//             scrollTrigger: {
//               trigger: card,
//               start: 'top 75%',
//               end: 'top 50%',
//               toggleActions: 'play none none reverse',
//             },
//           }
//         );
//       });
//     }, sectionRef);

//     return () => ctx.revert();
//   }, [categories]);

//   return (
//     <Box
//       ref={sectionRef}
//       py={140}
//       style={{
//         background: 'white',
//         backgroundSize: '400% 400%',
//         position: 'relative',
//         overflow: 'hidden',
//       }}
//     >


//       {/* Header */}
//       <Group
//         justify="space-between"
//         mb="xl"
//         pos="sticky"
//         top={0}
//         style={{
//           backgroundColor: 'transparent',
//           backdropFilter: 'blur(10px)',
//           zIndex: 10,
//           padding: '10px 0px  3% 0',
//           borderBottom: '2px solid rgba(128, 0, 32, 0.3)',
//           borderRadius: '8px',
//         }}
//       >
//         <Title order={2} size="2.6rem" fw={700} c="#5d0e0b" style={{
//           borderBottom: '5px solid rgba(247, 250, 253, 1)',
//         }}>
//           {title}
//         </Title>

//       </Group>
//       {/* <MotionGroup
//   justify="space-between"
//   mb="xl"
//   pos="sticky"
//   top={0}
//   initial={{ x: 120, opacity: 0 }}
//   whileInView={{ x: 50, opacity: 1 }}
//   transition={{ duration: 3, ease: "easeOut" }}
//   viewport={{ once: true, amount: 0.3 }}
//   style={{
//     backgroundColor: "transparent",
//     backdropFilter: "blur(10px)",
//     zIndex: 10,
//     padding: "10px 0px 3% 0",
//     borderBottom: "2px solid rgba(66, 165, 245, 0.3)",
//     borderRadius: "8px",
//   }}
// >
//   <Title
//     order={2}
//     size="2.6rem"
//     fw={700}
//     c="#0d47a1"
//     style={{
//       borderBottom: "5px solid rgba(247, 250, 253, 1)",
//     }}
//   >
//     {title}
//   </Title>
// </MotionGroup> */}


//       <Container size="xl">
//         <Grid gutter="xl" align="flex-start" >
//           {/* Fixed Left Sidebar with Parallax & Float */}
//           <Grid.Col span={{ base: 12, md: 5 }} >
//             <Stack pos="sticky" top={100} h="90vh" justify="center" align="center" style={{ maxWidth: 500, textAlign: 'center', marginRight: '30%', }}>
//               <Box ref={sidebarBoxRef} style={{ maxWidth: 500, textAlign: 'center', marginTop: '50%', }}>
//                 {sidebarTitle && (
//                   <Title
//                     size="3rem"
//                     fw={500}
//                     c="#050505ff"
//                     style={{
//                       textShadow: '0 2px 10px rgba(93, 14, 11, 0.2)',
//                       marginBottom: '20%',
//                     }}
//                   >
//                     {sidebarTitle}
//                   </Title>
//                 )}
//                 <Box ref={sidebarImageRef}>
//                   <Image
//                     radius="xl"
//                     src={sidebarImageUrl}
//                     alt={sidebarTitle || title}
//                     fit="cover"
//                     height={500}
//                     style={{
//                       boxShadow: '0 30px 60px rgba(93, 14, 11, 0.25)',
//                       borderRadius: '20px',
//                       border: '3px solid rgba(255, 255, 255, 0.5)',
//                     }}
//                   />
//                 </Box>
//                 {sidebarDescription && (
//                   <Text size="lg" c="#800020" lh={1.8} fw={500}>
//                     {sidebarDescription}
//                   </Text>
//                 )}
//               </Box>
//             </Stack>
//           </Grid.Col>

//           {/* Right Side: Zigzag Category Cards */}
//           <Grid.Col span={{ base: 12, md: 7 }}>
//             <Stack spacing={100} mt={40}>
//               {categories.map((category, index) => {
//                 const isEven = index % 2 === 0;

//                 return (
//                   <Box
//                     key={category.id}
//                     ref={(el) => (categoryRefs.current[index] = el)}
//                     style={{
//                       display: 'flex',
//                       flexDirection: isEven ? 'row' : 'row-reverse',
//                       gap: '2rem',
//                       alignItems: 'center',
//                       backgroundColor: 'rgba(255, 255, 255, 0.9)',
//                       backdropFilter: 'blur(10px)',
//                       borderRadius: '20px',
//                       padding: '2rem',
//                       boxShadow: '0 10px 40px rgba(93, 14, 11, 0.15)',
//                       border: '2px solid rgba(128, 0, 32, 0.2)',
//                       transition: 'all 0.4s ease',
//                       cursor: 'pointer',
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
//                       e.currentTarget.style.boxShadow = '0 15px 50px rgba(93, 14, 11, 0.25)';
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.transform = 'translateY(0) scale(1)';
//                       e.currentTarget.style.boxShadow = '0 10px 40px rgba(93, 14, 11, 0.15)';
//                     }}
//                   >
//                     {/* Category Image */}
//                     <Box
//                       style={{
//                         flex: '0 0 45%',
//                         borderRadius: '16px',
//                         overflow: 'hidden',
//                         boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
//                       }}
//                     >
//                       <Link to={`/products?category=${encodeURIComponent(category.name)}`} style={{ textDecoration: 'none' }}>
//                         <Image
//                           src={category.imageUrl}
//                           alt={category.name}
//                           height={300}
//                           fit="cover"
//                           style={{
//                             transition: 'transform 0.5s ease',
//                           }}
//                           onMouseEnter={(e) => {
//                             e.currentTarget.style.transform = 'scale(1.1)';
//                           }}
//                           onMouseLeave={(e) => {
//                             e.currentTarget.style.transform = 'scale(1)';
//                           }}
//                         />
//                       </Link>
//                     </Box>

//                     {/* Category Content */}
//                     <Box style={{ flex: '1', padding: '0 1rem' }}>
//                       <Link to={`/products?category=${encodeURIComponent(category.name)}`} style={{ textDecoration: 'none' }}>
//                         <Title
//                           order={3}
//                           size="2rem"
//                           fw={700}
//                           c="#5d0e0b"
//                           mb="md"
//                           style={{
//                             transition: 'color 0.3s ease',
//                           }}
//                           onMouseEnter={(e) => (e.currentTarget.style.color = '#800020')}
//                           onMouseLeave={(e) => (e.currentTarget.style.color = '#5d0e0b')}
//                         >
//                           {category.name}
//                         </Title>
//                       </Link>

//                       <Text size="md" c="#800020" lh={1.7} fw={500} mb="lg">
//                         {category.description}
//                       </Text>

//                       <Group gap="xs" mb="lg">
//                         <Badge color="red" variant="light" size="lg">
//                           {category.productCount} Items
//                         </Badge>
//                         <Text size="sm" c="#A0522D" fw={500}>
//                           • Handcrafted with Care
//                         </Text>
//                       </Group>

//                       <Anchor
//                         component={Link}
//                         to={`/products?category=${encodeURIComponent(category.name)}`}
//                         size="md"
//                         c="#800020"
//                         fw={600}
//                         style={{
//                           display: 'inline-block',
//                           transition: 'all 0.3s ease',
//                         }}
//                         onMouseEnter={(e) => (e.currentTarget.style.color = '#5d0e0b')}
//                         onMouseLeave={(e) => (e.currentTarget.style.color = '#800020')}
//                       >
//                         Explore Collection →
//                       </Anchor>
//                     </Box>
//                   </Box>
//                 );
//               })}
//             </Stack>
//           </Grid.Col>
//         </Grid>
//       </Container>
//     </Box>
//   );
// };

// export default CategoryGrid;



import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Title,
  Text,
  Grid,
  Image,
  Stack,
} from '@mantine/core';
import type { Category } from '../types';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CategoryGridProps {
  title?: string; // Optional now, as in the image it's the subtitle only
  subtitle: string;
  categories: Category[]; // Exactly 3: [large left, small top right, small bottom right]
}

const CategoryGrid: React.FC<CategoryGridProps> = ({
  title,
  subtitle,
  categories,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            delay: index * 0.15,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [categories]);

  const [large, small1, small2] = categories.slice(0, 3);

  if (!large || !small1 || !small2) {
    return null;
  }

  return (
    <Box ref={sectionRef} py={{ base: 40, lg: 70 }} style={{ background: '#ffffff' }}>
      <Container size="xl">
        {/* Subtitle only, centered - Exact match to image */}
        <Stack align="center" mb={{ base: 40, lg: 80 }}>
          {title && (
            <Title
              order={1}
              fw={100}
              c="#5d0e0b"
              ta="center"
            >
              {title}
            </Title>
          )}
          <Text c="#555" ta="center" fw={400} italic>
            {subtitle}
          </Text>
        </Stack>

        {/* Grid: Large left spans full height, right two stacked with equal gap and size */}
        <Grid gutter={{ base: 16, lg: 20 }} >
          {/* Large Left Card - Tall to match the combined height of the two right cards + gap */}
          <Grid.Col span={{ base: 12, lg: 6 }} style={{
            marginBottom: '10%',
          }}>
            <Box
              ref={(el) => (cardRefs.current[0] = el)}
              style={{
                position: 'relative',
                height: '110%', // Adjusted taller to align perfectly with right side
                // width:'120%',

                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 25px 70px rgba(93, 14, 11, 0.2)',
                transition: 'all 0.5s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 35px 90px rgba(93, 14, 11, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 25px 70px rgba(93, 14, 11, 0.2)';
              }}
            >
              <Link to={`/products`} style={{ textDecoration: 'none' }}>
                <Image
                  src={large.imageUrl}
                  alt={large.name}
                  fit="cover"
                  height="100%"
                  radius={0}
                  style={{ transition: 'transform 0.8s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />

                {/* Bottom-left cursive title */}
                <Box style={{ position: 'absolute', bottom: '50px', left: '50px', zIndex: 2 }}>
                  <Title
                    order={2}
                    size={{ base: '3.2rem', lg: '5rem' }}
                    fw={400}
                    c="white"
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      textShadow: '4px 4px 20px rgba(0,0,0,0.7)',
                      lineHeight: 1,
                    }}
                  >
                    {large.name}
                  </Title>
                </Box>

                {/* Bottom dark gradient */}
                <Box
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '70%',
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.55))',
                  }}
                />
              </Link>
            </Box>
          </Grid.Col>

          {/* Right Column - Two identical smaller cards with gap */}
          <Grid.Col span={{ base: 12, lg: 4.5 }}>
            <Stack h="92%" w="120%">
              {/* Top Small Card */}
              <Box
                ref={(el) => (cardRefs.current[1] = el)}
                style={{
                  position: 'relative',
                  flex: '1 1 0',
                  minHeight: { base: '360px', lg: '370px' },
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 60px rgba(93, 14, 11, 0.18)',
                  transition: 'all 0.5s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.03)';
                  e.currentTarget.style.boxShadow = '0 30px 80px rgba(93, 14, 11, 0.28)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(93, 14, 11, 0.18)';
                }}
              >
                <Link to={`/products?category=${encodeURIComponent(small1.name)}`} style={{ textDecoration: 'none' }}>
                  <Image
                    src={small1.imageUrl}
                    alt={small1.name}
                    fit="cover"
                    height="100%"
                    radius={0}
                    style={{ transition: 'transform 0.8s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.12)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />

                  {/* Right-aligned multi-line title */}
                  <Box
                    style={{
                      position: 'absolute',
                      top: '50%',
                      right: '30px',
                      transform: 'translateY(-50%)',
                      textAlign: 'right',
                      zIndex: 2,
                      maxWidth: '70%',
                    }}
                  >
                    <Title
                      size={{ base: '2rem', lg: '2.6rem' }}
                      fw={800}
                      c="white"
                      style={{
                        fontFamily: '"Playfair Display", serif',
                        textShadow: '3px 3px 15px rgba(0,0,0,0.8)',
                        lineHeight: 1.2,
                      }}
                    >
                      {small1.name}
                    </Title>
                  </Box>

                  <Box
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(0,0,0,0.15)',
                    }}
                  />
                </Link>
              </Box>

              {/* Bottom Small Card */}
              <Box
                ref={(el) => (cardRefs.current[2] = el)}
                style={{
                  position: 'relative',
                  flex: '1 1 0',
                  minHeight: { base: '360px', lg: '370px' },
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 60px rgba(93, 14, 11, 0.18)',
                  transition: 'all 0.5s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.03)';
                  e.currentTarget.style.boxShadow = '0 30px 80px rgba(93, 14, 11, 0.28)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(93, 14, 11, 0.18)';
                }}
              >
                <Link to={`/products?category=${encodeURIComponent(small2.name)}`} style={{ textDecoration: 'none' }}>
                  <Image
                    src={small2.imageUrl}
                    alt={small2.name}
                    fit="cover"
                    height="100%"
                    radius={0}
                    style={{ transition: 'transform 0.8s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.12)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />

                  {/* Right-aligned single-line title */}
                  <Box
                    style={{
                      position: 'absolute',
                      top: '50%',
                      right: '30px',
                      transform: 'translateY(-50%)',
                      textAlign: 'right',
                      zIndex: 2,
                    }}
                  >
                    <Title
                      order={3}
                      size={{ base: '2rem', lg: '2.6rem' }}
                      fw={800}
                      c="white"
                      style={{
                        fontFamily: '"Playfair Display", serif',
                        textShadow: '3px 3px 15px rgba(0,0,0,0.8)',
                        lineHeight: 1.2,
                      }}
                    >
                      {small2.name}
                    </Title>
                  </Box>

                  <Box
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(0,0,0,0.25)',
                    }}
                  />
                </Link>
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
};

export default CategoryGrid;