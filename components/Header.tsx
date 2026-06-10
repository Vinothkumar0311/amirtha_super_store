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
                            <Anchor href="tel:+911234567890" c="white" size="xs" style={{ textDecoration: 'none' }}>
                                📞 +91-1234567890
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
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease'
                }}
            >
                <Container size="xl" py={scrolled ? 'sm' : 'md'}>
                    <Group 
                        justify={scrolled ? "space-between" : "center"} 
                        align="center"
                        style={{ 
                            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                            position: 'relative'
                        }}
                    >
                        {/* Left Navigation - Hidden when not scrolled */}
                        <Group 
                            gap="xl" 
                            visibleFrom="lg"
                            style={{
                                opacity: scrolled ? 1 : 0,
                                transform: scrolled ? 'translateX(0)' : 'translateX(-20px)',
                                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                pointerEvents: scrolled ? 'auto' : 'none'
                            }}
                        >
                            {NAV_LINKS.slice(0, Math.ceil(NAV_LINKS.length / 2)).map((link: NavLink) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    style={{
                                        color: '#5d0e0b',
                                        textDecoration: 'none',
                                        textTransform: 'uppercase',
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                        transition: 'color 0.3s',
                                        letterSpacing: '0.5px'
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = '#800020')}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = '#5d0e0b')}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </Group>

                        {/* Center Logo */}
                        <Link
                            to="/"
                            style={{
                                textDecoration: 'none',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                transform: scrolled ? 'scale(0.75)' : 'scale(1)',
                                transformOrigin: 'center'
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: scrolled ? '1.8rem' : '2.5rem',
                                    fontWeight: 800,
                                    color: '#5d0e0b',
                                    letterSpacing: '2px',
                                    lineHeight: 1,
                                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                    textTransform: 'uppercase'
                                }}
                            >
                                AMIRTHA
                            </Text>
                            <Text
                                style={{
                                    fontSize: scrolled ? '0.7rem' : '0.9rem',
                                    fontWeight: 500,
                                    color: '#800020',
                                    letterSpacing: '3px',
                                    marginTop: '0.2rem',
                                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                    textTransform: 'uppercase'
                                }}
                            >
                                Super Store
                            </Text>
                        </Link>

                        {/* Right Navigation */}
                        <Group 
                            gap="xl" 
                            visibleFrom="lg"
                            style={{
                                opacity: scrolled ? 1 : 0,
                                transform: scrolled ? 'translateX(0)' : 'translateX(20px)',
                                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                pointerEvents: scrolled ? 'auto' : 'none'
                            }}
                        >
                            {NAV_LINKS.slice(Math.ceil(NAV_LINKS.length / 2)).map((link: NavLink) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    style={{
                                        color: '#5d0e0b',
                                        textDecoration: 'none',
                                        textTransform: 'uppercase',
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                        transition: 'color 0.3s',
                                        letterSpacing: '0.5px'
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = '#800020')}
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
                            style={{
                                position: 'absolute',
                                right: 0
                            }}
                        />
                    </Group>

                    {/* Search Bar - Below logo when not scrolled, hidden when scrolled */}
                    {/* {!scrolled && (
                        <Box mt="md">
                            <TextInput
                                placeholder="Search for products..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                rightSection={<SearchIcon style={{ width: 20, height: 20, color: '#800020' }} />}
                                visibleFrom="md"
                                style={{ 
                                    maxWidth: 600,
                                    margin: '0 auto',
                                    opacity: scrolled ? 0 : 1,
                                    transition: 'opacity 0.3s ease'
                                }}
                                styles={{
                                    input: {
                                        borderRadius: 9999,
                                        borderColor: '#800020',
                                        borderWidth: 2
                                    }
                                }}
                            />
                        </Box>
                    )} */}
                </Container>
            </Box>

            {/* 🔹 Full Navigation Bar - Visible when not scrolled */}
            {!scrolled && (
                <Box 
                    style={{ 
                        backgroundColor: '#5d0e0b',
                        transition: 'all 0.3s ease'
                    }} 
                    visibleFrom="lg"
                >
                    <Container size="xl">
                        <Group justify="center" gap="xl" py="sm">
                            {NAV_LINKS.map((link: NavLink) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    style={{
                                        color: 'white',
                                        textDecoration: 'none',
                                        textTransform: 'uppercase',
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                        transition: 'color 0.3s',
                                        letterSpacing: '0.5px'
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = '#800020')}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = 'white')}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </Group>
                    </Container>
                </Box>
            )}

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
