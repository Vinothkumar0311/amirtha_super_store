// import React from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { Box, Container, Grid, Image, Title, Text, Group, Button, Stack, Anchor } from '@mantine/core';
// import { PRODUCTS } from '../constants';
// import ProductGrid from '../components/ProductGrid';

// const ArrowLeftIcon = (props: React.ComponentProps<'svg'>) => (
//   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
//     <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
//   </svg>
// );

// const ProductDetailPage: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const product = PRODUCTS.find(p => p.id === Number(id));

//   if (!product) {
//     return (
//       <Box style={{ backgroundColor: 'white', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//         <Box ta="center">
//           <Title order={1} size="2.5rem" fw={700} c="#3a0e0d" mb="md">
//             Product Not Found
//           </Title>
//           <Text c="dimmed" mb="xl">
//             Sorry, we couldn't find the product you're looking for.
//           </Text>
//           <Button
//             component={Link}
//             to="/products"
//             radius="xl"
//             size="md"
//             style={{ backgroundColor: '#6a1b1a' }}
//             styles={{
//               root: {
//                 '&:hover': {
//                   backgroundColor: '#3a0e0d',
//                 }
//               }
//             }}
//           >
//             Back to Collection
//           </Button>
//         </Box>
//       </Box>
//     );
//   }

//   const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

//   return (
//     <Box style={{ backgroundColor: 'white' }}>
//       <Container size="xl" py={48}>
//         <Button
//           variant="subtle"
//           c="#6a1b1a"
//           mb="lg"
//           onClick={() => navigate(-1)}
//           leftSection={<ArrowLeftIcon style={{ width: 20, height: 20 }} />}
//           styles={{
//             root: {
//               paddingLeft: 0,
//               '&:hover': {
//                 backgroundColor: 'transparent',
//                 textDecoration: 'underline'
//               }
//             }
//           }}
//         >
//           Back
//         </Button>
//         <Grid gutter="xl" align="flex-start">
//           {/* Product Image */}
//           <Grid.Col span={{ base: 12, md: 6 }}>
//             <Image
//               src={product.imageUrl.replace('400x400', '600x600')}
//               alt={product.name}
//               radius="md"
//               style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
//             />
//           </Grid.Col>

//           {/* Product Details */}
//           <Grid.Col span={{ base: 12, md: 6 }}>
//             <Stack gap="lg">
//               <Title order={1} size="2.5rem" ff="Georgia, serif" fw={700} c="#3a0e0d">
//                 {product.name}
//               </Title>
//               <Group gap="md">
//                 <Text size="2rem" fw={700} c="#6a1b1a">
//                   ₹{product.price.toLocaleString('en-IN')}
//                 </Text>
//                 {product.originalPrice && (
//                   <Text size="xl" c="dimmed" td="line-through">
//                     ₹{product.originalPrice.toLocaleString('en-IN')}
//                   </Text>
//                 )}
//               </Group>
//               <div>
//                 <Title order={2} size="1.25rem" fw={700} c="#3a0e0d" mb="xs">
//                   Description
//                 </Title>
//                 <Text c="#374151" style={{ lineHeight: 1.6 }}>
//                   {product.description}
//                 </Text>
//               </div>

//               <Box style={{ borderTop: '1px solid #e0e0e0', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
//                 <Text>
//                   <Text component="span" fw={600} c="#1f2937">Category: </Text>
//                   <Anchor component={Link} to={`/products?category=${product.category}`} c="#6a1b1a">
//                     {product.category}
//                   </Anchor>
//                 </Text>
//               </Box>
//             </Stack>
//           </Grid.Col>
//         </Grid>
//       </Container>

//       {relatedProducts.length > 0 && (
//         <Box style={{ backgroundColor: '#fef3e3' }}>
//           <ProductGrid title="You might also like" products={relatedProducts} />
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default ProductDetailPage;









import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Image,
  Title,
  Text,
  Button,
  Stack,
  Anchor,
  Group,
  Breadcrumbs,
  Modal,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { PRODUCTS } from "../constants";
import ProductGrid from "../components/ProductGrid";

const ArrowLeftIcon = (props: React.ComponentProps<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    style={{ width: 16, height: 16 }}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
    />
  </svg>
);

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [submitted, setSubmitted] = useState(false);

  const product = PRODUCTS.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <Box ta="center" py={80} style={{ backgroundColor: "#fef3e3", minHeight: "80vh" }}>
        <Title order={1} c="#5d0e0b">Product Not Found</Title>
        <Text c="dimmed" mt="sm" mb="xl">The item you are looking for might have been moved or is out of stock.</Text>
        <Button component={Link} to="/products" color="brand.8" radius="xl">
          Back to Collection
        </Button>
      </Box>
    );
  }

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const whatsappMessage = `Hi, I am interested in purchasing "${product.name}" (Product ID: ${product.id}) from Amirtha Super Store. Could you please share the price and availability details?`;
  const whatsappUrl = `https://wa.me/911234567890?text=${encodeURIComponent(whatsappMessage)}`;

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      close();
      setSubmitted(false);
    }, 2000);
  };

  const items = [
    { title: "Home", href: "/" },
    { title: "Products", href: "/products" },
    { title: product.category, href: `/products?category=${encodeURIComponent(product.category)}` },
    { title: product.name, href: "#" },
  ].map((item, index) => (
    <Anchor
      component={item.href === "#" ? "span" : Link}
      to={item.href !== "#" ? item.href : undefined}
      key={index}
      c={index === 3 ? "#5d0e0b" : "dimmed"}
      fw={index === 3 ? 600 : 400}
      size="sm"
      style={{ textDecoration: "none" }}
    >
      {item.title}
    </Anchor>
  ));

  return (
    <Box style={{ backgroundColor: "white", minHeight: "100vh" }} pt={24}>
      <Container size="xl" py={24}>
        <Breadcrumbs separator="→" mb="xl">
          {items}
        </Breadcrumbs>

        <Button
          variant="subtle"
          color="brand.8"
          onClick={() => navigate(-1)}
          mb="xl"
          leftSection={<ArrowLeftIcon />}
          styles={{
            root: {
              paddingLeft: 0,
              color: "#5d0e0b",
              "&:hover": {
                backgroundColor: "transparent",
                textDecoration: "underline",
              },
            },
          }}
        >
          Back to list
        </Button>

        <Grid gutter={40} align="flex-start">
          {/* Product Image */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Box
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 15px 35px rgba(93, 14, 11, 0.1)",
                border: "1px solid #f0e6d6",
              }}
            >
              <Image
                src={product.imageUrl}
                alt={product.name}
                radius="0"
                fit="contain"
                style={{
                  maxHeight: "500px",
                  width: "100%",
                  backgroundColor: "#fff",
                }}
              />
            </Box>
          </Grid.Col>

          {/* Product Details */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="lg">
              <Box>
                <Text size="xs" fw={700} c="#800020" style={{ letterSpacing: "1px", textTransform: "uppercase" }}>
                  {product.category}
                </Text>
                <Title order={1} size="2.2rem" fw={700} c="#5d0e0b" mt="xs">
                  {product.name}
                </Title>
                <Text size="xs" c="dimmed" mt="xs">Product ID: ASS-{product.id}</Text>
              </Box>

              <Box style={{ borderTop: "1px solid #f0e6d6", borderBottom: "1px solid #f0e6d6", padding: "16px 0" }}>
                <Text size="1.5rem" fw={700} c="#5d0e0b">
                  Price on Enquiry
                </Text>
                <Text size="sm" c="dimmed" mt="xs">
                  Each of our products is individually handcrafted by traditional artisans. Please enquire for pricing and shipping options.
                </Text>
              </Box>

              <Stack gap="sm">
                <Button
                  component="a"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                  radius="xl"
                  bg="#25D366"
                  styles={{
                    root: {
                      transition: "transform 0.2s ease",
                      "&:hover": {
                        backgroundColor: "#128C7E",
                        transform: "scale(1.02)",
                      },
                    },
                  }}
                >
                  Enquire via WhatsApp
                </Button>

                <Button
                  variant="outline"
                  color="brand.8"
                  size="lg"
                  radius="xl"
                  onClick={open}
                  styles={{
                    root: {
                      borderColor: "#5d0e0b",
                      color: "#5d0e0b",
                      "&:hover": {
                        backgroundColor: "#fef3e3",
                      },
                    },
                  }}
                >
                  Request Price via Email
                </Button>
              </Stack>

              <Box mt="md">
                <Title order={3} size="1.2rem" fw={700} c="#5d0e0b" mb="xs">
                  Description
                </Title>
                <Text c="#4b5563" style={{ lineHeight: 1.6 }}>
                  {product.description}
                </Text>
              </Box>

              <Box style={{ borderTop: "1px solid #f0e6d6", paddingTop: "16px" }}>
                <Group gap="xs">
                  <Text fw={600} size="sm" c="dimmed">Tags:</Text>
                  <Anchor
                    component={Link}
                    to={`/products?category=${encodeURIComponent(product.category)}`}
                    c="#5d0e0b"
                    size="sm"
                    fw={500}
                  >
                    #{product.category.replace(" ", "")}
                  </Anchor>
                  <Text c="dimmed" size="sm">|</Text>
                  <Text size="sm" c="dimmed">#KumbakonamHandicrafts</Text>
                </Group>
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>

      {/* Email Enquiry Modal */}
      <Modal opened={opened} onClose={close} title="Product Pricing Enquiry" centered radius="md">
        {submitted ? (
          <Box ta="center" py="xl">
            <Text fw={700} c="#5d0e0b" size="lg" mb="xs">Thank You!</Text>
            <Text c="dimmed">Your enquiry has been sent. We will get back to you shortly.</Text>
          </Box>
        ) : (
          <form onSubmit={handleEnquirySubmit}>
            <Stack gap="md">
              <Text size="sm" c="dimmed">
                Enquiring about: <strong>{product.name}</strong> (ID: ASS-{product.id})
              </Text>
              <TextInput label="Your Name" placeholder="Full name" required />
              <TextInput label="Email Address" placeholder="your@email.com" type="email" required />
              <TextInput label="Phone Number" placeholder="Your phone number" />
              <Textarea
                label="Message"
                defaultValue={`Hello, I would like to know the price, dimensions, and shipping options for "${product.name}" (Product ID: ${product.id}).`}
                rows={3}
                required
              />
              <Button type="submit" bg="#5d0e0b" radius="md" mt="sm">
                Submit Enquiry
              </Button>
            </Stack>
          </form>
        )}
      </Modal>

      {relatedProducts.length > 0 && (
        <Box bg="#fef3e3" mt={60}>
          <ProductGrid title="You Might Also Like" subtitle="Explore more handcrafted masterpieces in the same category" products={relatedProducts} />
        </Box>
      )}
    </Box>
  );
};

export default ProductDetailPage;
