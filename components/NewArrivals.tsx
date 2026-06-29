import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Title,
  Text,
  Badge,
  Grid,
  Image,
  Group,
} from '@mantine/core';
import type { Category } from '../types';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface NewArrivalsProps {
  bannerImageUrl: string;
  bannerTitle: string;
  bannerSubtitle: string;
  bannerDescription: string;
  itemCount?: number;
  categories: Category[];
}

const NewArrivals: React.FC<NewArrivalsProps> = ({
  bannerImageUrl,
  bannerTitle,
  bannerSubtitle,
  bannerDescription,
  itemCount = 500,
  categories,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (bannerRef.current) {
        gsap.fromTo(
          bannerRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bannerRef.current,
              start: 'top 85%',
            },
          }
        );
      }

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const [leftCategory, rightCategory] = categories;

  return (
    <Box ref={sectionRef} py={{ base: 40, lg: 80 }} bg="#f8f5f0">
      <Container size="xxl" px={0}>
        {/* ===== TOP BANNER ===== */}
        <Box
          ref={bannerRef}
          pos="relative"
          h={{ base: 300, sm: 400, lg: 500 }}
          style={{
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0,0,0,0.12)',
          }}
        >
          <Image
            src={bannerImageUrl}
            alt={bannerTitle}
            fit="cover"
            h="100%"
            style={{ transition: 'transform 0.8s ease' }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = 'scale(1.05)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = 'scale(1)')
            }
          />

          {/* Text Overlay Card */}
          <Box
            pos="absolute"
            top="50%"
            left={{ base: 20, lg: 60 }}
            style={{
              transform: 'translateY(-50%)',
              maxWidth: 600,
              zIndex: 2,
              backgroundColor: 'rgba(253, 250, 246, 0.85)',
              backdropFilter: 'blur(10px)',
              padding: '2.5rem',
              borderRadius: '16px',
              border: '1px solid rgba(93, 14, 11, 0.15)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            }}
          >
            <Group gap="md" mb="md">
              <Title
                order={1}
                size={{ base: '2.2rem', lg: '3.2rem' }}
                fw={800}
                c="#5d0e0b"
                style={{ fontFamily: "'Playfair Display', serif", margin: 0 }}
              >
                {bannerTitle}
              </Title>

              <Badge
                size="lg"
                radius="xl"
                bg="#f7941d"
                c="white"
                style={{ padding: '6px 16px', height: 'auto' }}
              >
                <Text fw={700} size="xs" style={{ letterSpacing: '1px' }}>
                  {itemCount}+ NEW ITEMS
                </Text>
              </Badge>
            </Group>

            <Text fw={500} c="#555" mb="md" size="lg">
              {bannerSubtitle}
            </Text>
            <Text fw={700} c="#5d0e0b" size="md" style={{ letterSpacing: '0.5px' }}>
              {bannerDescription}
            </Text>
          </Box>

          {/* Right Gradient */}
          <Box
            pos="absolute"
            top={0}
            right={0}
            w="50%"
            h="100%"
            style={{
              background:
                'linear-gradient(to left, rgba(0,0,0,0.15), transparent)',
            }}
          />
        </Box>

        {/* ===== FLOATING CARDS ===== */}
       <Grid
  justify="center"
  gutter={{ base: 24, lg: 48 }}
  mt={{ base: -90, lg: -140 }}
  style={{ zIndex: 3 }}
>
  {[leftCategory, rightCategory].map((cat, index) => (
    <Grid.Col key={cat.name} span={{ base: 10, md: 4 }}>
      {/* WHITE BACKGROUND FRAME */}
      <Box
        ref={(el) => (cardRefs.current[index] = el)}
        bg="white"
        radius="18px"
        p="md"
        style={{
          borderRadius: '12px',
          boxShadow: '0 22px 55px rgba(0,0,0,0.15)',
        }}
      >
        {/* IMAGE HOLDER – SAME WIDTH AS CARD */}
        <Box
          pos="relative"
          radius="14px"
          style={{
            borderRadius: '12px',
            aspectRatio: '12 / 6',
            overflow: 'hidden',
            boxShadow: '0 14px 35px rgba(93,14,11,0.25)',
          }}
        >
          <Link
            to={`/products?category=${encodeURIComponent(cat.name)}`}
            style={{ textDecoration: 'none' }}
          >
            {/* IMAGE */}
            <Image
              src={cat.imageUrl}
              alt={cat.name}
              fit="cover"
              w="100%"
              h="100%"
              style={{
                position: 'absolute',
                inset: 0,
                transition: 'transform 0.8s ease',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = 'scale(1.06)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = 'scale(1)')
              }
            />

            {/* TITLE */}
            <Box
              pos="absolute"
              bottom={20}
              left={24}
              style={{ zIndex: 2 }}
            >
              <Title
                order={3}
                size={{ base: '1.6rem', lg: '2.4rem' }}
                fw={700}
                c="white"
                style={{
                  textShadow:
                    '2px 2px 12px rgba(0,0,0,0.85)',
                }}
              >
                {cat.name}
              </Title>
            </Box>

            {/* GRADIENT */}
            <Box
              pos="absolute"
              bottom={0}
              left={0}
              w="100%"
              h="60%"
              style={{
                background:
                  'linear-gradient(transparent, rgba(0,0,0,0.65))',
              }}
            />
          </Link>
        </Box>
      </Box>
    </Grid.Col>
  ))}
</Grid>

      </Container>
    </Box>
  );
};

export default NewArrivals;
