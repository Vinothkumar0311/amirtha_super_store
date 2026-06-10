import React, { useState, useEffect } from 'react';
import { Box, Container } from '@mantine/core';

interface CarouselImage {
    src: string;
    alt: string;
}

const CAROUSEL_IMAGES: CarouselImage[] = [
    { src: '/assets/home/hero.png', alt: 'Hero Banner' },
    { src: '/assets/home/hero.png', alt: 'Bronze Statues' },
    { src: '/assets/home/hero.png.jpg', alt: 'Traditional Statues' },
    { src: '/assets/home/hero.png', alt: 'Gallery' },
    { src: '/assets/home/hero.png', alt: 'Products' },
];

/**
 * TRANSITION TYPES - Change this value to try different transitions:
 * 
 * 1. 'slide-left' - Slides from right to left
 * 2. 'slide-right' - Slides from left to right
 * 3. 'slide-up' - Slides from bottom to top
 * 4. 'slide-down' - Slides from top to bottom
 * 5. 'fade' - Simple fade in/out (current default)
 * 6. 'zoom-in' - Zooms in while fading
 * 7. 'zoom-out' - Zooms out while fading
 * 8. 'slide-fade-left' - Slides left with fade
 * 9. 'slide-fade-right' - Slides right with fade
 * 10. 'rotate-slide' - Rotates while sliding
 */
type TransitionType =
    | 'slide-left'
    | 'slide-right'
    | 'slide-up'
    | 'slide-down'
    | 'fade'
    | 'zoom-in'
    | 'zoom-out'
    | 'slide-fade-left'
    | 'slide-fade-right'
    | 'rotate-slide';

const TRANSITION_TYPE: TransitionType = 'slide-left'; // <-- CHANGE THIS VALUE TO TRY DIFFERENT TRANSITIONS

const HeaderCarousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [direction, setDirection] = useState<'next' | 'prev'>('next');

    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 4000); // Auto-slide every 4 seconds

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

    // Get transition styles based on transition type
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

        // Common transition duration
        const transitionDuration = '0.8s';
        const easing = 'cubic-bezier(0.4, 0, 0.2, 1)';

        const transitionType: TransitionType = TRANSITION_TYPE;

        switch (transitionType) {
            case 'slide-left':
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

            // case 'slide-right':
            //     return {
            //         ...baseStyle,
            //         transform: !isTransitioning
            //             ? 'translateX(0)'
            //             : isCurrent
            //                 ? 'translateX(100%)'
            //                 : isNext
            //                     ? 'translateX(0)'
            //                     : 'translateX(-100%)',
            //         transition: `transform ${transitionDuration} ${easing}`,
            //         zIndex: isNext ? 2 : 1,
            //     };

            // case 'slide-up':
            //     return {
            //         ...baseStyle,
            //         transform: !isTransitioning
            //             ? 'translateY(0)'
            //             : isCurrent
            //                 ? 'translateY(-100%)'
            //                 : isNext
            //                     ? 'translateY(0)'
            //                     : 'translateY(100%)',
            //         transition: `transform ${transitionDuration} ${easing}`,
            //         zIndex: isNext ? 2 : 1,
            //     };

            // case 'slide-down':
            //     return {
            //         ...baseStyle,
            //         transform: !isTransitioning
            //             ? 'translateY(0)'
            //             : isCurrent
            //                 ? 'translateY(100%)'
            //                 : isNext
            //                     ? 'translateY(0)'
            //                     : 'translateY(-100%)',
            //         transition: `transform ${transitionDuration} ${easing}`,
            //         zIndex: isNext ? 2 : 1,
            //     };

            // case 'fade':
            //     return {
            //         ...baseStyle,
            //         opacity: isCurrent && !isTransitioning ? 1 : isNext && isTransitioning ? 1 : 0,
            //         transition: `opacity ${transitionDuration} ease-in-out`,
            //         zIndex: isNext ? 2 : 1,
            //     };

            // case 'zoom-in':
            //     return {
            //         ...baseStyle,
            //         opacity: isCurrent && !isTransitioning ? 1 : isNext && isTransitioning ? 1 : 0,
            //         transform: isNext && isTransitioning ? 'scale(1)' : isNext ? 'scale(0.8)' : 'scale(1)',
            //         transition: `opacity ${transitionDuration} ease-in-out, transform ${transitionDuration} ${easing}`,
            //         zIndex: isNext ? 2 : 1,
            //     };

            // case 'zoom-out':
            //     return {
            //         ...baseStyle,
            //         opacity: isCurrent && !isTransitioning ? 1 : isNext && isTransitioning ? 1 : 0,
            //         transform: isCurrent && isTransitioning ? 'scale(1.2)' : 'scale(1)',
            //         transition: `opacity ${transitionDuration} ease-in-out, transform ${transitionDuration} ${easing}`,
            //         zIndex: isNext ? 2 : 1,
            //     };

            // case 'slide-fade-left':
            //     return {
            //         ...baseStyle,
            //         transform: !isTransitioning
            //             ? 'translateX(0)'
            //             : isCurrent
            //                 ? 'translateX(-50%)'
            //                 : isNext
            //                     ? 'translateX(0)'
            //                     : 'translateX(50%)',
            //         opacity: isCurrent && !isTransitioning ? 1 : isNext && isTransitioning ? 1 : 0,
            //         transition: `transform ${transitionDuration} ${easing}, opacity ${transitionDuration} ease-in-out`,
            //         zIndex: isNext ? 2 : 1,
            //     };

            // case 'slide-fade-right':
            //     return {
            //         ...baseStyle,
            //         transform: !isTransitioning
            //             ? 'translateX(0)'
            //             : isCurrent
            //                 ? 'translateX(50%)'
            //                 : isNext
            //                     ? 'translateX(0)'
            //                     : 'translateX(-50%)',
            //         opacity: isCurrent && !isTransitioning ? 1 : isNext && isTransitioning ? 1 : 0,
            //         transition: `transform ${transitionDuration} ${easing}, opacity ${transitionDuration} ease-in-out`,
            //         zIndex: isNext ? 2 : 1,
            //     };

            // case 'rotate-slide':
            //     return {
            //         ...baseStyle,
            //         transform: !isTransitioning
            //             ? 'translateX(0) rotate(0deg)'
            //             : isCurrent
            //                 ? 'translateX(-100%) rotate(-5deg)'
            //                 : isNext
            //                     ? 'translateX(0) rotate(0deg)'
            //                     : 'translateX(100%) rotate(5deg)',
            //         transition: `transform ${transitionDuration} ${easing}`,
            //         zIndex: isNext ? 2 : 1,
            //     };

            // default:
            //     return {
            //         ...baseStyle,
            //         opacity: isCurrent ? 1 : 0,
            //         transition: `opacity ${transitionDuration} ease-in-out`,
            //     };
        }
    };

    return (
        <Box
            style={{
                position: 'relative',
                width: '100%',
                height: '750px',
                overflow: 'hidden',
                backgroundColor: '#f5f5f5',
            }}
            sx={{
                '@media (max-width: 768px)': {
                    height: '400px',
                },
                '@media (max-width: 480px)': {
                    height: '300px',
                }
            }}
        >
            {/* Carousel Images */}
            <Box
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                }}
            >
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
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        zIndex: 5,
                    }}
                />
            </Box>

            {/* Navigation Arrows */}
            <button
                onClick={handlePrevious}
                disabled={isTransitioning}
                style={{
                    position: 'absolute',
                    left: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 10,
                    backgroundColor: 'rgba(93, 14, 11, 0.8)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    fontSize: '24px',
                    cursor: isTransitioning ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    opacity: isTransitioning ? 0.5 : 1,
                }}
                onMouseEnter={(e) => {
                    if (!isTransitioning) {
                        e.currentTarget.style.backgroundColor = 'rgba(128, 0, 32, 0.9)';
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                    }
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(93, 14, 11, 0.8)';
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
                    right: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 10,
                    backgroundColor: 'rgba(93, 14, 11, 0.8)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    fontSize: '24px',
                    cursor: isTransitioning ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    opacity: isTransitioning ? 0.5 : 1,
                }}
                onMouseEnter={(e) => {
                    if (!isTransitioning) {
                        e.currentTarget.style.backgroundColor = 'rgba(128, 0, 32, 0.9)';
                        e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                    }
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(93, 14, 11, 0.8)';
                    e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                }}
            >
                ›
            </button>

            {/* Navigation Dots */}
            <Box
                style={{
                    position: 'absolute',
                    bottom: '20px',
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
                            width: index === currentIndex ? '40px' : '12px',
                            height: '12px',
                            borderRadius: '6px',
                            border: 'none',
                            backgroundColor: index === currentIndex
                                ? '#800020'
                                : 'rgba(255, 255, 255, 0.6)',
                            cursor: isTransitioning ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s ease',
                            opacity: isTransitioning ? 0.5 : 1,
                        }}
                        onMouseEnter={(e) => {
                            if (index !== currentIndex && !isTransitioning) {
                                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (index !== currentIndex) {
                                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
                            }
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default HeaderCarousel;
