import React from 'react';
import { Box } from '@mantine/core';
import HeaderCarousel from '../components/HeaderCarousel';
import CategoryGrid from '../components/CategoryGrid';
import CategoryShowcase from '../components/CategoryShowcase';
import Testimonials from '../components/Testimonials';
import ValueProposition from '../components/ValueProposition';
import { PRODUCTS } from '../constants';
import { CATEGORIES } from "../constants";
import NewArrivals from '../components/NewArrivals';
import { silverIdolsCategory, floralBloomCategory } from '../constants';

const HomePage: React.FC = () => {
    return (
        <Box>
            <HeaderCarousel />
            <ValueProposition />
            {/* <ProductGrid
                title="Featured Products"
                products={PRODUCTS.slice(0, 4)}
                showMoreLink="/products"
            /> */}

            <CategoryGrid
                title="Our Categories"
                categories={CATEGORIES}
                showMoreLink="/products"
                sidebarImageUrl="/assets/home/statues1.jpg"
                sidebarTitle="Timeless Craftsmanship"
                sidebarDescription="Discover exquisite handcrafted bronze statues, traditional furniture, and sacred puja items made with devotion and heritage."
            />
           <NewArrivals
  bannerImageUrl="/assets/home/sliderr.png"
  bannerTitle="New Arrivals"
  bannerSubtitle="New Arrivals Dropping Daily, Monday through Friday."
  bannerDescription="Explore the Latest Launches Now!"
  itemCount={500}
  categories={[
    silverIdolsCategory,   // Left bottom
    floralBloomCategory    // Right bottom
  ]}
/>
            <CategoryShowcase />


            <Testimonials />
        </Box>
    );
};

export default HomePage;