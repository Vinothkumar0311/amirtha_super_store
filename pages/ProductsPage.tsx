// import React from 'react';
// import { useSearchParams } from 'react-router-dom';
// import { Box, Container, Title, Text, Group, Stack, SimpleGrid, Button } from '@mantine/core';
// import ProductCard from '../components/ProductCard';
// import { PRODUCTS } from '../constants';

// interface ProductsPageProps {
//   searchTerm: string;
// }

// const ProductsPage: React.FC<ProductsPageProps> = ({ searchTerm }) => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const selectedCategory = searchParams.get('category') || 'All';

//   const handleCategoryChange = (category: string) => {
//     const newSearchParams = new URLSearchParams(searchParams);
//     if (category === 'All') {
//       newSearchParams.delete('category');
//     } else {
//       newSearchParams.set('category', category);
//     }
//     setSearchParams(newSearchParams, { replace: true });
//   };

//   // Dynamically generate categories from product data
//   const Gallery = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];

//   const filteredProducts = PRODUCTS
//     .filter(p => selectedCategory === 'All' || p.category === selectedCategory)
//     .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

//   return (
//     <Box style={{ backgroundColor: 'white', minHeight: '100vh' }}>
//       <Container size="xl" py="xl">
//         <Box pt="xl" pb="md" ta="center">
//           <Title order={1} size="2.5rem" ff="Georgia, serif" fw={700} c="#3a0e0d">
//             Our Collection
//           </Title>
//           <Text c="dimmed" mt="xs">
//             Browse through our exquisite collection of handcrafted items.
//           </Text>
//         </Box>

//         <Group align="flex-start" gap="xl" mt="xl">
//           {/* Sidebar for filters */}
//           <Box
//             component="aside"
//             w={{ base: '100%', md: '25%', lg: '20%' }}
//           >
//             <Stack gap="md">
//               <Title order={2} size="1.5rem" ff="Georgia, serif" fw={700} c="#3a0e0d">
//                 Categories
//               </Title>
//               <Stack gap="xs">
//                 {categories.map(category => (
//                   <Button
//                     key={category}
//                     onClick={() => handleCategoryChange(category)}
//                     variant={selectedCategory === category ? 'filled' : 'subtle'}
//                     color={selectedCategory === category ? 'brand' : 'gray'}
//                     fullWidth
//                     justify="flex-start"
//                     radius="md"
//                     styles={{
//                       root: {
//                         fontWeight: selectedCategory === category ? 600 : 400,
//                       }
//                     }}
//                   >
//                     {category}
//                   </Button>
//                 ))}
//               </Stack>
//             </Stack>
//           </Box>

//           {/* Product Grid */}
//           <Box
//             component="main"
//             style={{ flex: 1 }}
//           >
//             {filteredProducts.length > 0 ? (
//               <SimpleGrid
//                 cols={{ base: 1, sm: 2, lg: 3 }}
//                 spacing="lg"
//               >
//                 {filteredProducts.map(product => (
//                   <ProductCard key={product.id} product={product} />
//                 ))}
//               </SimpleGrid>
//             ) : (
//               <Box ta="center" py={64}>
//                 <Text c="dimmed">No products found matching your criteria.</Text>
//               </Box>
//             )}
//           </Box>
//         </Group>
//       </Container>
//     </Box>
//   );
// };

// export default ProductsPage;

import React from "react";
import { useSearchParams } from "react-router-dom";
import {
  Box,
  Container,
  Title,
  Text,
  Group,
  Stack,
  SimpleGrid,
  Button,
} from "@mantine/core";
import ProductCard from "../components/ProductCard";
import { PRODUCTS } from "../constants";

interface ProductsPageProps {
  searchTerm: string;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ searchTerm }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "All";

  const handleCategoryChange = (category: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (category === "All") {
      newSearchParams.delete("category");
    } else {
      newSearchParams.set("category", category);
    }
    setSearchParams(newSearchParams, { replace: true });
  };

  const categoriesList = [
    "All",
    ...Array.from(new Set(PRODUCTS.map(p => p.category))),
  ];

  const filteredProducts = PRODUCTS
    .filter(p => selectedCategory === "All" || p.category === selectedCategory)
    .filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <Box style={{ backgroundColor: "white", minHeight: "100vh", marginTop: "50px" }}>
      <Container size="xl" py="xl">
        <Box pt="xl" pb="md" ta="center">
          <Title order={1} fw={700} c="#5d0e0b">
            Our Collection
          </Title>
        </Box>

        <Group align="flex-start" gap="xl" mt="xl">
          {/* Sidebar */}
          <Box component="aside" w={{ base: "100%", md: "25%", lg: "20%" }}>
            <Stack gap="md">
              <Title order={3} fw={700} c="#5d0e0b">
                Categories
              </Title>
              <Stack gap="xs">
                {categoriesList.map(category => (
                  <Button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    variant={
                      selectedCategory === category ? "filled" : "subtle"
                    }
                    color={selectedCategory === category ? "brand.8" : "gray"}
                    fullWidth
                    justify="flex-start"
                  >
                    {category}
                  </Button>
                ))}
              </Stack>
            </Stack>
          </Box>

          {/* Products Grid */}
          <Box component="main" style={{ flex: 1 }}>
            {filteredProducts.length > 0 ? (
              <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </SimpleGrid>
            ) : (
              <Box ta="center" py={64}>
                <Text c="dimmed">No products found.</Text>
              </Box>
            )}
          </Box>
        </Group>
      </Container>
    </Box>
  );
};

export default ProductsPage;
