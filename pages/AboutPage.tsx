import React from 'react';
import { Box, Container, Title, Text, Grid, Image, Stack } from '@mantine/core';

const AboutPage: React.FC = () => {
  return (
    <Box style={{ backgroundColor: 'white' }} py={64}>
      <Container size="xl">
        <Box maw={896} mx="auto" ta="center">
          <Title order={1} size="2.5rem" fw={700} c="#800020" mb="md">
            About Amirtha Super Store
          </Title>
          <Text size="lg" c="dimmed" mb="xl">
            Tradition Meets Modernity in Kumbakonam
          </Text>
        </Box>

        <Grid maw={1120} mx="auto" gutter="xl" align="center" mt={48}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Image
              src="/assets/home/about.png"
              alt="Amirtha Super Store"
              radius="md"
              style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="md" c="#787c83ff">
              <Title order={2} size="1.5rem" fw={700} c="#000000ff">
                Our Story
              </Title>
              <Text>
                Located in the heart of Natchar Koil, Kumbakonam, Amirtha Super Store has established itself as a premier destination for quality home needs. From the spiritual resonance of traditional bronze statues and brass lamps to the modern convenience of latest electronics and home appliances, we bridge the gap between tradition and contemporary living.
              </Text>
              <Text>
                We take pride in offering a diverse range of products including exquisite furniture that adds elegance to your home, and authentic puja items that are essential for your spiritual practices. Our commitment to quality and customer satisfaction has made us a trusted name in the region.
              </Text>
              <Title order={2} size="1.5rem" fw={700} c="#000000ff" mt="md">
                Our Mission
              </Title>
              <Text>
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
