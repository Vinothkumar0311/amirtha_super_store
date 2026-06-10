import React from 'react';
import { Box, Container, Title, Text, Accordion } from '@mantine/core';

const FAQPage: React.FC = () => {
  return (
    <Box style={{ backgroundColor: 'white' }} py={64}>
      <Container size="xl">
        <Box ta="center" mb={48}>
          <Title order={1} size="2.5rem"  fw={700} c="#3a0e0d">
            Frequently Asked Questions
          </Title>
          <Text size="lg" c="dimmed" mt="xs">
            Find answers to common questions about our products and services.
          </Text>
        </Box>

        <Box maw={768} mx="auto">
          <Accordion
            variant="separated"
            styles={{
              item: {
                borderColor: '#e0e0e0',
              },
              control: {
                '&:hover': {
                  backgroundColor: '#fef3e3',
                }
              },
              label: {
                fontSize: '1.125rem',
                fontWeight: 600,
                color: '#3a0e0d',
              },
              content: {
                color: '#6b7280',
              }
            }}
          >
            <Accordion.Item value="materials">
              <Accordion.Control>What materials are used in your handicrafts?</Accordion.Control>
              <Accordion.Panel>
                Our products are made from authentic, high-quality materials. We specialize in Panchaloha (an alloy of five metals) for bronze statues, aged teakwood and rosewood for wooden sculptures, and pure brass for our lamps and pooja items. Our Tanjore paintings use 22-karat gold foil and semi-precious stones.
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="authenticity">
              <Accordion.Control>How do you ensure the authenticity of the products?</Accordion.Control>
              <Accordion.Panel>
                We work directly with traditional artisan families and co-operatives in South India who have been practicing their craft for generations. Each piece comes with a certificate of authenticity detailing its origin and the materials used.
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="shipping">
              <Accordion.Control>Do you ship internationally?</Accordion.Control>
              <Accordion.Panel>
                Yes, we ship our handicrafts worldwide. We use trusted courier partners and provide robust packaging to ensure your order arrives safely. Shipping costs and delivery times vary by destination.
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="care">
              <Accordion.Control>How should I care for my handicraft?</Accordion.Control>
              <Accordion.Panel>
                Care instructions vary by material. For bronze and brass, regular dusting and occasional polishing with a soft cloth is recommended. Wooden items should be kept away from direct sunlight and moisture. Detailed care instructions are provided with every purchase.
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="returns">
              <Accordion.Control>What is your return policy?</Accordion.Control>
              <Accordion.Panel>
                We offer a 15-day return policy for any item that is damaged upon arrival or does not match its description. Please contact our customer service team with photos of the issue to initiate a return or exchange. Custom-made items are non-refundable.
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Box>
      </Container>
    </Box>
  );
};

export default FAQPage;
