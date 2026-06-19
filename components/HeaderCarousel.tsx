import React, { useState, useEffect } from 'react';
import { Box, Container, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

interface CarouselImage {
    src: string;
    alt: string;
    title: string;
    subtitle: string;
    link: string;
    buttonLabel: string;
}

const CAROUSEL_IMAGES: CarouselImage[] = [
    { 
        src: '/assets/home/hero.png', 
        alt: 'Bronze Statues',
        title: 'Exquisite Bronze Statues',
        subtitle: 'Experience authentic, temple-grade traditional bronze idols handcrafted by master artisans.',
        link: '/products?category=Bronze Statues',
        buttonLabel: 'Explore Collection'
    },
    { 
        src: '/assets/categories/furniture/furniture_hero.png', 
        alt: 'Teak Furniture',
        title: 'Teak & Rosewood Furniture',
        subtitle: 'Premium traditional furniture pieces crafted with heritage, time-honored techniques, and luxury teak.',
        link: '/products?category=Furniture',
        buttonLabel: 'View Masterpieces'
    },
    { 
        src: '/assets/home/pooja.png', 
        alt: 'Pooja Items',
        title: 'Sacred Pooja Essentials',
        subtitle: 'Traditional puja items, bells, and brass lamps that bring divine grace to your sacred home space.',
        link: '/products?category=Puja Items',
        buttonLabel: 'Discover Sacred Items'
    },
];

const HeaderCarousel: React.FC = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [, setDirection] = useState<'next' | 'prev'>('next');

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 6000); // 6 seconds auto-slide

        return () => clearInterval(interval);
    }, [currentIndex]);

    const handleNext = () => {
        if (isTransitioning) return;
        setDirection('next');
        setIsTransitioning(true);
        const next = (currentIndex + 1) % CAROUSEL_IMAGES.length;
        setNextIndex(next);

        setTimeout(() => {
            setCurrentIndex(next);
            setIsTransitioning(false);
        }, 800);
    };

    const handlePrevious = () => {
        if (isTransitioning) return;
        setDirection('prev');
        setIsTransitioning(true);
        const prev = currentIndex === 0 ? CAROUSEL_IMAGES.length - 1 : currentIndex - 1;
        setNextIndex(prev);

        setTimeout(() => {
            setCurrentIndex(prev);
            setIsTransitioning(false);
        }, 800);
    };

    const goToSlide = (index: number) => {
        if (isTransitioning || index === currentIndex) return;
        setDirection(index > currentIndex ? 'next' : 'prev');
        setIsTransitioning(true);
        setNextIndex(index);

        setTimeout(() => {
            setCurrentIndex(index);
            setIsTransitioning(false);
        }, 800);
    };

    const getTransitionStyle = (index: number, isCurrent: boolean, isNext: boolean): React.CSSProperties => {
        const baseStyle: React.CSSProperties = {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${CAROUSEL_IMAGES[index].src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        };

        const transitionDuration = '0.8s';
        const easing = 'cubic-bezier(0.4, 0, 0.2, 1)';

        return {
            ...baseStyle,
            transform: !isTransitioning
                ? 'translateX(0)'
                : isCurrent
                    ? 'translateX(-100%)'
                    : isNext
                        ? 'translateX(0)'
                        : 'translateX(100%)',
            transition: `transform ${transitionDuration} ${easing}`,
            zIndex: isNext ? 2 : 1,
        };
    };

    return (
        <Box
            style={{
                position: 'relative',
                width: '100%',
                height: '750px',
                overflow: 'hidden',
                backgroundColor: '#120101',
            }}
        >
            {/* Carousel Images */}
            <Box style={{ position: 'relative', width: '100%', height: '100%' }}>
                {CAROUSEL_IMAGES.map((image, index) => (
                    <Box
                        key={index}
                        style={getTransitionStyle(
                            index,
                            index === currentIndex,
                            index === nextIndex && isTransitioning
                        )}
                    />
                ))}

                {/* Dark Overlay */}
                <Box
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, rgba(18,1,1,0.85) 0%, rgba(18,1,1,0.4) 50%, rgba(18,1,1,0.2) 100%)',
                        zIndex: 5,
                    }}
                />
            </Box>

            {/* Carousel Content Overlay */}
            <Container
                size="xl"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    zIndex: 6,
                    pointerEvents: 'none',
                }}
            >
                <Box 
                    style={{ 
                        maxWidth: '650px', 
                        pointerEvents: 'auto',
                        padding: '0 20px',
                    }}
                >
                    <Text
                        style={{
                            color: '#f7941d',
                            fontSize: '1.2rem',
                            fontWeight: 700,
                            letterSpacing: '3px',
                            textTransform: 'uppercase',
                            marginBottom: '1rem',
                        }}
                    >
                        Amirtha Heritage
                    </Text>
                    <h1
                        style={{
                            color: 'white',
                            fontSize: '4.2rem',
                            fontWeight: 800,
                            lineHeight: 1.1,
                            margin: 0,
                            marginBottom: '1.5rem',
                            textShadow: '0 4px 15px rgba(0,0,0,0.5)',
                            fontFamily: "'Playfair Display', serif",
                        }}
                    >
                        {CAROUSEL_IMAGES[currentIndex].title}
                    </h1>
                    <Text
                        style={{
                            color: 'rgba(255, 255, 255, 0.95)',
                            fontSize: '1.2rem',
                            lineHeight: 1.6,
                            margin: 0,
                            marginBottom: '2.5rem',
                            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                        }}
                    >
                        {CAROUSEL_IMAGES[currentIndex].subtitle}
                    </Text>
                    <button
                        onClick={() => navigate(CAROUSEL_IMAGES[currentIndex].link)}
                        style={{
                            backgroundColor: '#f7941d',
                            color: '#120101',
                            border: 'none',
                            padding: '16px 42px',
                            fontSize: '1rem',
                            fontWeight: 700,
                            borderRadius: '50px',
                            cursor: 'pointer',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            boxShadow: '0 8px 24px rgba(247, 148, 29, 0.3)',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'white';
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.boxShadow = '0 12px 30px rgba(255, 255, 255, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#f7941d';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 8px 24px rgba(247, 148, 29, 0.3)';
                        }}
                    >
                        {CAROUSEL_IMAGES[currentIndex].buttonLabel}
                    </button>
                </Box>
            </Container>

            {/* Navigation Arrows */}
            <button
                onClick={handlePrevious}
                disabled={isTransitioning}
                style={{
                    position: 'absolute',
                    left: '30px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 10,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(5px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    fontSize: '28px',
                    cursor: isTransitioning ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    opacity: isTransitioning ? 0.5 : 1,
                }}
                onMouseEnter={(e) => {
                    if (!isTransitioning) {
                        e.currentTarget.style.backgroundColor = '#f7941d';
                        e.currentTarget.style.color = '#120101';
                        e.currentTarget.style.borderColor = '#f7941d';
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                    }
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                }}
            >
                ‹
            </button>

            <button
                onClick={handleNext}
                disabled={isTransitioning}
                style={{
                    position: 'absolute',
                    right: '30px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 10,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(5px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    fontSize: '28px',
                    cursor: isTransitioning ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    opacity: isTransitioning ? 0.5 : 1,
                }}
                onMouseEnter={(e) => {
                    if (!isTransitioning) {
                        e.currentTarget.style.backgroundColor = '#f7941d';
                        e.currentTarget.style.color = '#120101';
                        e.currentTarget.style.borderColor = '#f7941d';
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                    }
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                }}
            >
                ›
            </button>

            {/* Navigation Dots */}
            <Box
                style={{
                    position: 'absolute',
                    bottom: '30px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 10,
                    display: 'flex',
                    gap: '12px',
                }}
            >
                {CAROUSEL_IMAGES.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        disabled={isTransitioning}
                        style={{
                            width: index === currentIndex ? '50px' : '14px',
                            height: '8px',
                            borderRadius: '4px',
                            border: 'none',
                            backgroundColor: index === currentIndex
                                ? '#f7941d'
                                : 'rgba(255, 255, 255, 0.4)',
                            cursor: isTransitioning ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s ease',
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default HeaderCarousel;
