// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Card, Image, Text, Group, Badge, Stack } from '@mantine/core';
// import type { Product } from '../types';

// interface ProductCardProps {
//     product: Product;
// }

// const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
//     return (
//         <Card
//             shadow="sm"
//             padding="lg"
//             radius="md"
//             withBorder
//             style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 height: '100%',
//                 transition: 'box-shadow 0.3s',
//             }}
//             onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)'}
//             onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}
//         >
//             <Card.Section
//                 component={Link}
//                 to={`/products/${product.id}`}
//                 style={{ position: 'relative', overflow: 'hidden' }}
//             >
//                 <Image
//                     src={product.imageUrl}
//                     alt={product.name}
//                     height={224}
//                     style={{
//                         transition: 'transform 0.5s',
//                     }}
//                     onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
//                     onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
//                 />
//                 {product.originalPrice && (
//                     <Badge
//                         color="orange"
//                         variant="filled"
//                         style={{
//                             position: 'absolute',
//                             top: 12,
//                             left: 12,
//                         }}
//                     >
//                         SALE
//                     </Badge>
//                 )}
//             </Card.Section>

//             <Stack gap="xs" mt="md" style={{ flex: 1, textAlign: 'center' }}>
//                 <Text
//                     fw={600}
//                     size="lg"
//                     c="#3a0e0d"
//                     component={Link}
//                     to={`/products/${product.id}`}
//                     style={{
//                         textDecoration: 'none',
//                         overflow: 'hidden',
//                         textOverflow: 'ellipsis',
//                         whiteSpace: 'nowrap',
//                     }}
//                 >
//                     {product.name}
//                 </Text>
//                 <Group justify="center" gap="xs">
//                     <Text size="xl" fw={700} c="#6a1b1a">
//                         ₹{product.price.toLocaleString('en-IN')}
//                     </Text>
//                     {product.originalPrice && (
//                         <Text size="md" c="dimmed" td="line-through">
//                             ₹{product.originalPrice.toLocaleString('en-IN')}
//                         </Text>
//                     )}
//                 </Group>
//             </Stack>
//         </Card>
//     );
// };

// export default ProductCard;


import React from "react";
import { Link } from "react-router-dom";
import { Card, Image, Text, Stack } from "@mantine/core";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card
      component={Link}
      to={`/products/${product.id}`}
      shadow="sm"
      radius="md"
      padding="md"
      withBorder
      style={{
        textDecoration: "none",
        color: "inherit",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transition: "all 0.3s ease",
        cursor: "pointer",
        overflow: "hidden",
      }}
      className="premium-product-card"
    >
      {/* Product Image */}
      <Card.Section style={{ overflow: "hidden", position: "relative" }}>
        <Image
          src={product.imageUrl}
          alt={product.name}
          height={240}
          fit="cover"
          style={{
            transition: "transform 0.5s ease",
          }}
          className="product-card-image"
        />
      </Card.Section>

      {/* Product Info */}
      <Stack gap="xs" mt="md" style={{ flex: 1, justifyContent: "space-between" }}>
        <Text fw={600} size="md" c="#5d0e0b" style={{ lineHeight: 1.3 }}>
          {product.name}
        </Text>

        <Text fw={600} size="sm" c="#f7941d" style={{ letterSpacing: "0.5px" }}>
          Enquire for Price
        </Text>
      </Stack>

      <style>{`
        .premium-product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(93, 14, 11, 0.15);
          border-color: #f7941d;
        }
        .premium-product-card:hover .product-card-image {
          transform: scale(1.05);
        }
      `}</style>
    </Card>
  );
};

export default ProductCard;
