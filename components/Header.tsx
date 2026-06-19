import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
    Group,
    TextInput,
    Burger,
    Drawer,
    Stack,
    Anchor,
    Box,
    Container,
    Text
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NAV_LINKS } from '../constants';
import type { NavLink } from '../types';
import HeaderCarousel from './HeaderCarousel';

const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

interface HeaderProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, setSearchTerm }) => {
    const [opened, { toggle, close }] = useDisclosure(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        if (location.pathname !== '/products' && value.trim() !== '') {
            navigate('/products');
        }
    };

    return (
        <Box component="header" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
            {/* 🔹 Top Bar */}
            <Box 
                style={{ 
                    backgroundColor: '#5d0e0bff', 
                    color: 'white', 
                    padding: '0.5rem 0',
                    transition: 'all 0.3s ease'
                }}
            >
                <Container size="xl">
                    <Group justify="space-between">
                        <Text size="xs">Welcome to Amirtha Super Store</Text>
                        <Group gap="md">
                            <Anchor href="tel:+918610349949" c="white" size="xs" style={{ textDecoration: 'none' }}>
                                📞 +91 86103 49949
                            </Anchor>
                            <Anchor
                                href="mailto:info@amirthasuperstore.com"
                                c="white"
                                size="xs"
                                visibleFrom="md"
                                style={{ textDecoration: 'none' }}
                            >
                                ✉ info@amirthasuperstore.com
                            </Anchor>
                        </Group>
                    </Group>
                </Container>
            </Box>

            {/* 🔹 Main Header with Logo and Navigation */}
            <Box 
                style={{ 
                    backgroundColor: 'white', 
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    transition: 'all 0.3s ease'
                }}
            >
                <Container size="xl" py={scrolled ? 'xs' : 'sm'}>
                    <Group 
                        justify="space-between" 
                        align="center"
                        style={{ 
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {/* Left Logo */}
                        <Link
                            to="/"
                            style={{
                                textDecoration: 'none',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: scrolled ? '1.8rem' : '2.2rem',
                                    fontWeight: 800,
                                    color: '#5d0e0b',
                                    letterSpacing: '1.5px',
                                    lineHeight: 1,
                                    transition: 'all 0.3s ease',
                                    textTransform: 'uppercase',
                                    fontFamily: '"Playfair Display", serif'
                                }}
                            >
                                AMIRTHA
                            </Text>
                            <Text
                                style={{
                                    fontSize: scrolled ? '0.65rem' : '0.75rem',
                                    fontWeight: 600,
                                    color: '#f7941d',
                                    letterSpacing: '2.5px',
                                    marginTop: '0.1rem',
                                    transition: 'all 0.3s ease',
                                    textTransform: 'uppercase',
                                    fontFamily: '"Poppins", sans-serif'
                                }}
                            >
                                Super Store
                            </Text>
                        </Link>

                        {/* Right Navigation */}
                        <Group 
                            gap="xl" 
                            visibleFrom="lg"
                            align="center"
                        >
                            {NAV_LINKS.map((link: NavLink) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    style={{
                                        color: '#5d0e0b',
                                        textDecoration: 'none',
                                        textTransform: 'uppercase',
                                        fontSize: '0.85rem',
                                        fontWeight: 700,
                                        transition: 'all 0.2s ease',
                                        letterSpacing: '0.5px',
                                        padding: '4px 0',
                                        fontFamily: '"Poppins", sans-serif'
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = '#f7941d')}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = '#5d0e0b')}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </Group>

                        {/* Mobile Burger */}
                        <Burger 
                            opened={opened} 
                            onClick={toggle} 
                            hiddenFrom="lg" 
                            size="sm" 
                            color="#5d0e0b"
                        />
                    </Group>
                </Container>
            </Box>

            {/* 🎠 Auto-Sliding Carousel */}
            {/* <HeaderCarousel /> */}

            {/* 📱 Mobile Menu */}
            <Drawer opened={opened} onClose={close} position="right" title="Menu" size="sm">
                <Stack gap="md">
                    <TextInput
                        placeholder="Search for products..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        rightSection={<SearchIcon style={{ width: 20, height: 20, color: '#800020' }} />}
                        mb="md"
                        styles={{
                            input: {
                                borderRadius: 9999,
                                borderColor: '#800020'
                            }
                        }}
                    />
                    {NAV_LINKS.map((link: NavLink) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={close}
                            style={{
                                color: '#5d0e0b',
                                textDecoration: 'none',
                                padding: '0.5rem 0',
                                borderBottom: '1px solid #e0e0e0',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                fontSize: '0.9rem'
                            }}
                        >
                            {link.name}
                        </Link>
                    ))}
                </Stack>
            </Drawer>
        </Box>
    );
};

export default Header;
