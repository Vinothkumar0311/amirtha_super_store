import React, { useEffect, useState, useRef } from 'react';
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
import { NAV_LINKS, PRODUCTS } from '../constants';
import type { NavLink, Product } from '../types';

const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

interface HeaderProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

interface SearchBarProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    onSuggestionClick: (product: Product) => void;
    onClear: () => void;
    placeholder?: string;
    autoFocus?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
    searchTerm,
    onSearchChange,
    onSuggestionClick,
    onClear,
    placeholder = 'Search products...',
    autoFocus = false,
}) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const suggestions = searchTerm.trim().length >= 2
        ? PRODUCTS.filter(p =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.category.toLowerCase().includes(searchTerm.toLowerCase())
          ).slice(0, 6)
        : [];

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const highlightMatch = (text: string, query: string) => {
        if (!query.trim()) return text;
        const idx = text.toLowerCase().indexOf(query.toLowerCase());
        if (idx === -1) return text;
        return (
            <>
                {text.slice(0, idx)}
                <strong style={{ color: '#5d0e0b' }}>{text.slice(idx, idx + query.length)}</strong>
                {text.slice(idx + query.length)}
            </>
        );
    };

    return (
        <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
            <div style={{ position: 'relative' }}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={e => {
                        onSearchChange(e.target.value);
                        setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    placeholder={placeholder}
                    autoFocus={autoFocus}
                    style={{
                        width: '100%',
                        padding: '10px 40px 10px 16px',
                        borderRadius: '9999px',
                        border: '1.5px solid rgba(93,14,11,0.25)',
                        fontSize: '0.9rem',
                        fontFamily: "'Poppins', sans-serif",
                        outline: 'none',
                        backgroundColor: '#fdfaf6',
                        color: '#333',
                        boxSizing: 'border-box',
                        transition: 'border-color 0.2s ease',
                    }}
                    onFocusCapture={e => (e.currentTarget.style.borderColor = '#5d0e0b')}
                    onBlurCapture={e => (e.currentTarget.style.borderColor = 'rgba(93,14,11,0.25)')}
                />
                <div style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                }}>
                    {searchTerm && (
                        <button
                            onClick={onClear}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 0,
                                display: 'flex',
                                color: '#999',
                            }}
                            aria-label="Clear search"
                        >
                            <CloseIcon style={{ width: 16, height: 16 }} />
                        </button>
                    )}
                    <SearchIcon style={{ width: 18, height: 18, color: '#5d0e0b' }} />
                </div>
            </div>

            {showSuggestions && suggestions.length > 0 && (
                <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 6px)',
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                    border: '1px solid rgba(93,14,11,0.1)',
                    zIndex: 500,
                    overflow: 'hidden',
                }}>
                    <div style={{
                        padding: '8px 14px',
                        fontSize: '0.75rem',
                        color: '#999',
                        borderBottom: '1px solid #f0f0f0',
                        fontFamily: "'Poppins', sans-serif",
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                    }}>
                        {suggestions.length} suggestion{suggestions.length !== 1 ? 's' : ''}
                    </div>
                    {suggestions.map(product => (
                        <div
                            key={product.id}
                            onMouseDown={() => {
                                onSuggestionClick(product);
                                setShowSuggestions(false);
                            }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '10px 14px',
                                cursor: 'pointer',
                                transition: 'background-color 0.15s ease',
                                borderBottom: '1px solid #fafafa',
                            }}
                            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#fdfaf6')}
                            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'white')}
                        >
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                style={{
                                    width: 40,
                                    height: 40,
                                    objectFit: 'cover',
                                    borderRadius: '6px',
                                    flexShrink: 0,
                                }}
                            />
                            <div style={{ minWidth: 0 }}>
                                <div style={{
                                    fontSize: '0.88rem',
                                    fontWeight: 600,
                                    color: '#333',
                                    fontFamily: "'Poppins', sans-serif",
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}>
                                    {highlightMatch(product.name, searchTerm)}
                                </div>
                                <div style={{
                                    fontSize: '0.75rem',
                                    color: '#f7941d',
                                    fontFamily: "'Poppins', sans-serif",
                                    marginTop: '2px',
                                }}>
                                    {product.category}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

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

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        if (location.pathname !== '/products' && value.trim() !== '') {
            navigate('/products');
        }
    };

    const handleSuggestionClick = (product: Product) => {
        setSearchTerm('');
        navigate(`/products/${product.id}`);
    };

    const handleClear = () => {
        setSearchTerm('');
    };

    return (
        <Box component="header" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
            {/* Top Bar */}
            <Box style={{ backgroundColor: '#5d0e0bff', color: 'white', padding: '0.5rem 0' }}>
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

            {/* Main Header */}
            <Box style={{ backgroundColor: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <Container size="xl" py={scrolled ? 'xs' : 'sm'}>
                    <Group justify="space-between" align="center" style={{ gap: '1rem' }}>
                        {/* Logo */}
                        <Link
                            to="/"
                            style={{
                                textDecoration: 'none',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                flexShrink: 0,
                            }}
                        >
                            <Text style={{
                                fontSize: scrolled ? '1.8rem' : '2.2rem',
                                fontWeight: 800,
                                color: '#5d0e0b',
                                letterSpacing: '1.5px',
                                lineHeight: 1,
                                transition: 'font-size 0.3s ease',
                                textTransform: 'uppercase',
                                fontFamily: '"Playfair Display", serif'
                            }}>
                                AMIRTHA
                            </Text>
                            <Text style={{
                                fontSize: scrolled ? '0.65rem' : '0.75rem',
                                fontWeight: 600,
                                color: '#f7941d',
                                letterSpacing: '2.5px',
                                marginTop: '0.1rem',
                                transition: 'font-size 0.3s ease',
                                textTransform: 'uppercase',
                                fontFamily: '"Poppins", sans-serif'
                            }}>
                                Super Store
                            </Text>
                        </Link>

                        {/* Desktop: Nav + Search */}
                        <Group gap="lg" visibleFrom="lg" align="center" style={{ flex: 1, justifyContent: 'flex-end' }}>
                            {NAV_LINKS.map((link: NavLink) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    style={{
                                        color: '#5d0e0b',
                                        textDecoration: 'none',
                                        textTransform: 'uppercase',
                                        fontSize: '0.82rem',
                                        fontWeight: 700,
                                        transition: 'color 0.2s ease',
                                        letterSpacing: '0.5px',
                                        whiteSpace: 'nowrap',
                                        fontFamily: '"Poppins", sans-serif'
                                    }}
                                    onMouseEnter={e => (e.currentTarget.style.color = '#f7941d')}
                                    onMouseLeave={e => (e.currentTarget.style.color = '#5d0e0b')}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            {/* Desktop Search */}
                            <div style={{ width: '220px', flexShrink: 0 }}>
                                <SearchBar
                                    searchTerm={searchTerm}
                                    onSearchChange={handleSearchChange}
                                    onSuggestionClick={handleSuggestionClick}
                                    onClear={handleClear}
                                    placeholder="Search products..."
                                />
                            </div>
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

            {/* Mobile Menu */}
            <Drawer opened={opened} onClose={close} position="right" title="Menu" size="sm">
                <Stack gap="md">
                    <SearchBar
                        searchTerm={searchTerm}
                        onSearchChange={value => {
                            handleSearchChange(value);
                        }}
                        onSuggestionClick={product => {
                            handleSuggestionClick(product);
                            close();
                        }}
                        onClear={handleClear}
                        placeholder="Search for products..."
                        autoFocus={false}
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
