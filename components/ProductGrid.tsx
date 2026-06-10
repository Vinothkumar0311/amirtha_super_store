import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Title, Text, SimpleGrid, Button, Stack } from '@mantine/core';
import ProductCard from './ProductCard';
import type { Product } from '../types';

interface ProductGridProps {
  title?: string;
  subtitle?: string;
  products: Product[];
  showMoreLink?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ title, subtitle, products, showMoreLink }) => {
  return (
    <Box py={{ base: 40, lg: 60 }}>
      <Container size="xl">
        {(title || subtitle) && (
          <Stack align="center" mb={{ base: 30, lg: 50 }} gap="xs">
            {title && (
              <Title
                order={2}
                size={{ base: '1.75rem', lg: '2.5rem' }}
                fw={600}
                c="#5d0e0b"
                ta="center"
              >
                {title}
              </Title>
            )}
            {subtitle && (
              <Text c="dimmed" ta="center" size="sm" max-width="600px">
                {subtitle}
              </Text>
            )}
          </Stack>
        )}

        <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </SimpleGrid>

        {showMoreLink && (
          <Box ta="center" mt={{ base: 30, lg: 50 }}>
            <Button
              component={Link}
              to={showMoreLink}
              variant="outline"
              color="brand.8"
              size="lg"
              radius="xl"
              styles={{
                root: {
                  borderColor: '#5d0e0b',
                  color: '#5d0e0b',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#5d0e0b',
                    color: 'white',
                    transform: 'translateY(-2px)',
                  },
                },
              }}
            >
              View Full Collection
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ProductGrid;
