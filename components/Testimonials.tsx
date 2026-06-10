import React from 'react';
import { Box, Container, Title, SimpleGrid, Paper, Text } from '@mantine/core';
import { TESTIMONIALS } from '../constants';

const Testimonials: React.FC = () => {
    return (
        <Box component="section" py={{ base: 60, lg: 80 }} style={{ backgroundColor: 'white' }}>
            <Container size="xl">
                <Title
                    order={2}
                    size="2rem"
                    fw={700}
                    c="#5d0e0b"
                    ta="center"
                    mb={40}
                >
                    What Our Customers Say
                </Title>
                <SimpleGrid
                    cols={{ base: 1, md: 3 }}
                    spacing="lg"
                >
                    {TESTIMONIALS.map((testimonial) => (
                        <Paper
                            key={testimonial.id}
                            p="xl"
                            radius="md"
                            shadow="sm"
                            style={{
                                backgroundColor: '#fef3e3',
                                textAlign: 'center'
                            }}
                        >
                            <Text
                                c="#4b5563"
                                fs="italic"
                                mb="xl"
                                size="sm"
                            >
                                "{testimonial.quote}"
                            </Text>
                            <Text fw={700} c="#0a0808ff">
                                {testimonial.author}
                            </Text>
                            <Text size="sm" c="#6b7280">
                                {testimonial.location}
                            </Text>
                        </Paper>
                    ))}
                </SimpleGrid>
            </Container>
        </Box>
    );
};

export default Testimonials;
