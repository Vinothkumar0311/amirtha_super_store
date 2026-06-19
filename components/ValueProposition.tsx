import React from 'react';
import { Box, Container, Text, SimpleGrid, Group } from '@mantine/core';

// Custom SVG Icons matching the golden design
const HammerIcon = () => (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="60" height="60" rx="8" fill="url(#gold-gradient-1)" />
        <path d="M40 20H32V30H28V20H20C18.9 20 18 20.9 18 22V28C18 29.1 18.9 30 20 30H28V45H32V30H40C41.1 30 42 29.1 42 28V22C42 20.9 41.1 20 40 20ZM24 25C22.9 25 22 24.1 22 23C22 21.9 22.9 21 24 21C25.1 21 26 21.9 26 23C26 24.1 25.1 25 24 25Z" fill="white" />
        <circle cx="21" cy="24" r="3" fill="white" />
        <path d="M38 22H40V28H38V22Z" fill="white" />
        <defs>
            <linearGradient id="gold-gradient-1" x1="0" y1="0" x2="60" y2="60" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#E6B980" />
                <stop offset="50%" stopColor="#C6934B" />
                <stop offset="100%" stopColor="#AD7F3D" />
            </linearGradient>
        </defs>
    </svg>
);

const HeartIcon = () => (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 52.5C29.6 52.5 29.2 52.3 28.9 52C16.8 41 8 33 8 22.5C8 16.2 12.9 11.2 19 11.2C22.4 11.2 25.7 12.8 27.9 15.4L30 17.8L32.1 15.4C34.3 12.8 37.6 11.2 41 11.2C47.1 11.2 52 16.2 52 22.5C52 33 43.2 41 31.1 52C30.8 52.3 30.4 52.5 30 52.5Z" fill="url(#gold-gradient-2)" />
        <path d="M30 25V30H35" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <defs>
            <linearGradient id="gold-gradient-2" x1="0" y1="0" x2="60" y2="60" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#E6B980" />
                <stop offset="50%" stopColor="#C6934B" />
                <stop offset="100%" stopColor="#AD7F3D" />
            </linearGradient>
        </defs>
    </svg>
);

const DiamondIcon = () => (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 8L8 24L30 52L52 24L30 8Z" fill="url(#gold-gradient-3)" />
        <path d="M30 8V52M8 24H52M19 16L41 32M41 16L19 32" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
        <path d="M22 24L30 42L38 24" stroke="white" strokeWidth="1" />
        <defs>
            <linearGradient id="gold-gradient-3" x1="0" y1="0" x2="60" y2="60" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#E6B980" />
                <stop offset="50%" stopColor="#C6934B" />
                <stop offset="100%" stopColor="#AD7F3D" />
            </linearGradient>
        </defs>
    </svg>
);

const ValueProposition: React.FC = () => {
    const items = [
        {
            icon: <HammerIcon />,
            title: 'Quality',
            subtitle: 'Craftsmanship'
        },
        {
            icon: <HeartIcon />,
            title: 'Ethically',
            subtitle: 'Sourced'
        },
        {
            icon: <DiamondIcon />,
            title: '100%',
            subtitle: 'Transparency'
        }
    ];

    return (
        <Box py={{ base: 40, lg: 60 }} style={{ backgroundColor: '#fdfaf6', borderBottom: '1px solid #f0e6d6' }}>
            <Container size="lg">
                <SimpleGrid
                    cols={{ base: 1, sm: 3 }}
                    spacing={40}
                >
                    {items.map((item, index) => (
                        <Box
                            key={index}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center'
                            }}
                        >
                            <Box mb={20} className="hover-scale">
                                {item.icon}
                            </Box>
                            <Text
                                style={{
                                    fontFamily: '"Playfair Display", serif',
                                    fontSize: '24px',
                                    fontWeight: 400,
                                    color: '#4A2C2A', // Dark brown from design
                                    lineHeight: 1.2,
                                }}
                            >
                                {item.title}
                            </Text>
                            <Text
                                style={{
                                    fontFamily: '"Playfair Display", serif',
                                    fontSize: '24px',
                                    fontWeight: 400,
                                    color: '#4A2C2A', // Dark brown from design
                                    lineHeight: 1.2,
                                }}
                            >
                                {item.subtitle}
                            </Text>
                        </Box>
                    ))}
                </SimpleGrid>

                <style>
                    {`
                        .hover-scale {
                            transition: transform 0.3s ease;
                        }
                        .hover-scale:hover {
                            transform: scale(1.1);
                        }
                    `}
                </style>
            </Container>
        </Box>
    );
};

export default ValueProposition;
