import React from 'react';
import { Box, Container, Title, Text, Grid, Image, Stack } from '@mantine/core';

const AboutPage: React.FC = () => {
  return (
    <Box style={{ backgroundColor: '#fdfaf6' }} py={80}>
      <Container size="xl">
        <Box maw={896} mx="auto" ta="center">
          <Title order={1} size="3rem" fw={800} c="#5d0e0b" mb="md" style={{ fontFamily: "'Playfair Display', serif" }}>
            About Amirtha Super Store
          </Title>
          <Text size="lg" c="dimmed" mb="xl" style={{ letterSpacing: '0.5px' }}>
            Tradition Meets Quality in Nachiyarkovil, Kumbakonam
          </Text>
          <Box style={{ width: '60px', height: '3px', backgroundColor: '#f7941d', margin: '0 auto 2.5rem auto', borderRadius: '2px' }} />
        </Box>

        <Grid maw={1120} mx="auto" gutter="xl" align="center" mt={48}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Box
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(93, 14, 11, 0.15)',
                border: '4px solid white',
              }}
            >
              <Image
                src="/assets/home/about.png"
                alt="Amirtha Super Store"
                radius="0"
                style={{ display: 'block' }}
              />
            </Box>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="lg" c="#444">
              <Title order={2} size="1.8rem" fw={700} c="#5d0e0b" style={{ fontFamily: "'Playfair Display', serif" }}>
                Our Story
              </Title>
              <Text style={{ lineHeight: 1.7 }}>
                Located in the heart of Nachiyarkovil, Kumbakonam, Amirtha Super Store has established itself as a premier destination for quality home needs. From the spiritual resonance of traditional bronze statues and brass lamps to the modern convenience of the latest electronics and home appliances, we bridge the gap between tradition and contemporary living.
              </Text>
              <Text style={{ lineHeight: 1.7 }}>
                We take pride in offering a diverse range of products including exquisite furniture that adds elegance to your home, and authentic puja items that are essential for your spiritual practices. Our commitment to quality and customer satisfaction has made us a trusted name in the region.
              </Text>
              <Title order={2} size="1.8rem" fw={700} c="#5d0e0b" style={{ fontFamily: "'Playfair Display', serif" }} mt="md">
                Our Mission
              </Title>
              <Text style={{ lineHeight: 1.7 }}>
                Our mission is to provide our customers with the best selection of products at competitive prices, all under one roof. Whether you are looking for a divine idol for your prayer room, a new television for your living room, or a comfortable sofa set, Amirtha Super Store is dedicated to serving your needs with integrity and excellence.
              </Text>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutPage;
