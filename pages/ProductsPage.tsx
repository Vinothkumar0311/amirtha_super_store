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
} from "@mantine/core";
import ProductCard from "../components/ProductCard";
import { PRODUCTS } from "../constants";

interface ProductsPageProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const ProductsPage: React.FC<ProductsPageProps> = ({ searchTerm, setSearchTerm }) => {
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

  const categoryTotals = Object.fromEntries(
    categoriesList.map(cat => [
      cat,
      cat === "All"
        ? PRODUCTS.length
        : PRODUCTS.filter(p => p.category === cat).length,
    ])
  );

  const filteredProducts = PRODUCTS
    .filter(p => selectedCategory === "All" || p.category === selectedCategory)
    .filter(p => {
      const q = searchTerm.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    });

  return (
    <Box style={{ backgroundColor: "#fdfaf6", minHeight: "100vh" }}>
      <Container size="xl" py="xl">
        {/* Page Header */}
        <Box pt="xl" pb="md" ta="center">
          <Title order={1} fw={800} c="#5d0e0b" style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem', letterSpacing: '1px' }}>
            Our Collections
          </Title>
          <Text c="dimmed" mt="xs" size="md" style={{ letterSpacing: '0.5px' }}>
            Browse through our exquisite legacy collections of handicraft masterworks
          </Text>
          <Box style={{ width: '60px', height: '3px', backgroundColor: '#f7941d', margin: '15px auto 0 auto', borderRadius: '2px' }} />
        </Box>

        {/* Inline Search Bar */}
        <Box mt="xl" mb="sm" style={{ maxWidth: '560px', margin: '2rem auto 0.5rem auto' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by name, category or description..."
              style={{
                width: '100%',
                padding: '13px 48px 13px 20px',
                borderRadius: '9999px',
                border: '1.5px solid rgba(93,14,11,0.25)',
                fontSize: '0.95rem',
                fontFamily: "'Poppins', sans-serif",
                outline: 'none',
                backgroundColor: 'white',
                color: '#333',
                boxSizing: 'border-box',
                boxShadow: '0 4px 16px rgba(93,14,11,0.06)',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = '#5d0e0b')}
              onBlur={e => (e.currentTarget.style.borderColor = 'rgba(93,14,11,0.25)')}
            />
            {searchTerm ? (
              <button
                onClick={() => setSearchTerm('')}
                aria-label="Clear"
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#999',
                  fontSize: '1.1rem',
                  lineHeight: 1,
                  padding: 0,
                }}
              >
                ✕
              </button>
            ) : (
              <SearchIcon style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', width: 20, height: 20, color: '#5d0e0b' }} />
            )}
          </div>
        </Box>

        <Group align="flex-start" gap="xl" mt="xl">
          {/* Sidebar */}
          <Box
            component="aside"
            w={{ base: "100%", md: "25%", lg: "20%" }}
            style={{
              backgroundColor: '#fdfaf6',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid rgba(93, 14, 11, 0.12)',
              boxShadow: '0 8px 30px rgba(93, 14, 11, 0.05)',
            }}
          >
            <Stack gap="md">
              <Title order={3} fw={700} c="#5d0e0b" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem' }}>
                Categories
              </Title>
              <Stack gap="xs">
                {categoriesList.map(category => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                      textAlign: 'left',
                      padding: '12px 18px',
                      borderRadius: '8px',
                      backgroundColor: selectedCategory === category ? '#5d0e0b' : 'transparent',
                      color: selectedCategory === category ? 'white' : '#555',
                      border: 'none',
                      fontWeight: selectedCategory === category ? 700 : 500,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      fontFamily: "'Poppins', sans-serif",
                    }}
                    onMouseEnter={(e) => {
                      if (selectedCategory !== category) {
                        e.currentTarget.style.backgroundColor = 'rgba(93, 14, 11, 0.08)';
                        e.currentTarget.style.color = '#5d0e0b';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedCategory !== category) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#555';
                      }
                    }}
                  >
                    <span>{category}</span>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      backgroundColor: selectedCategory === category ? 'rgba(255,255,255,0.2)' : 'rgba(93,14,11,0.08)',
                      color: selectedCategory === category ? 'white' : '#5d0e0b',
                      borderRadius: '9999px',
                      padding: '1px 8px',
                      minWidth: '28px',
                      textAlign: 'center',
                    }}>
                      {categoryTotals[category]}
                    </span>
                  </button>
                ))}
              </Stack>
            </Stack>
          </Box>

          {/* Products Grid */}
          <Box component="main" style={{ flex: 1 }}>
            {/* Result summary */}
            <Box mb="md" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <Text size="sm" c="dimmed" style={{ fontFamily: "'Poppins', sans-serif" }}>
                {searchTerm ? (
                  <>
                    <strong style={{ color: '#5d0e0b' }}>{filteredProducts.length}</strong> result{filteredProducts.length !== 1 ? 's' : ''} for{' '}
                    <strong style={{ color: '#5d0e0b' }}>"{searchTerm}"</strong>
                    {selectedCategory !== 'All' && <> in <em>{selectedCategory}</em></>}
                  </>
                ) : (
                  <>Showing <strong style={{ color: '#5d0e0b' }}>{filteredProducts.length}</strong> item{filteredProducts.length !== 1 ? 's' : ''}{selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}</>
                )}
              </Text>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  style={{
                    background: 'none',
                    border: '1px solid rgba(93,14,11,0.2)',
                    borderRadius: '9999px',
                    padding: '4px 14px',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    color: '#5d0e0b',
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Clear search
                </button>
              )}
            </Box>

            {filteredProducts.length > 0 ? (
              <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </SimpleGrid>
            ) : (
              <Box ta="center" py={64} style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                border: '1px dashed rgba(93,14,11,0.15)',
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🔍</div>
                <Text fw={600} size="lg" c="#5d0e0b" mb="xs" style={{ fontFamily: "'Playfair Display', serif" }}>
                  No products found
                </Text>
                <Text c="dimmed" size="sm" mb="lg" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {searchTerm
                    ? `No results for "${searchTerm}"${selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}. Try a different keyword.`
                    : 'No products in this category yet.'}
                </Text>
                <Group justify="center" gap="sm">
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      style={{
                        backgroundColor: '#5d0e0b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '9999px',
                        padding: '10px 24px',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      Clear Search
                    </button>
                  )}
                  {selectedCategory !== 'All' && (
                    <button
                      onClick={() => handleCategoryChange('All')}
                      style={{
                        backgroundColor: 'transparent',
                        color: '#5d0e0b',
                        border: '1.5px solid #5d0e0b',
                        borderRadius: '9999px',
                        padding: '10px 24px',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      Browse All
                    </button>
                  )}
                </Group>
              </Box>
            )}
          </Box>
        </Group>
      </Container>
    </Box>
  );
};

export default ProductsPage;
