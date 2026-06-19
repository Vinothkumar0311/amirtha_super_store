import React from 'react';
import { Box, Container, Title, Text, Grid, TextInput, Textarea, Button, Stack, Anchor } from '@mantine/core';

const ContactPage: React.FC = () => {
  return (
    <Box style={{ backgroundColor: '#fdfaf6' }} py={80}>
      <Container size="xl">
        <Box ta="center" mb={64}>
          <Title order={1} size="3rem" fw={800} c="#5d0e0b" style={{ fontFamily: "'Playfair Display', serif" }}>
            Get In Touch
          </Title>
          <Text size="lg" c="dimmed" mt="xs" style={{ letterSpacing: '0.5px' }}>
            We'd love to hear from you. Visit our store or contact us for any queries.
          </Text>
          <Box style={{ width: '60px', height: '3px', backgroundColor: '#f7941d', margin: '15px auto 0 auto', borderRadius: '2px' }} />
        </Box>

        <Grid
          maw={1120}
          mx="auto"
          gutter={48}
          style={{
            backgroundColor: 'white',
            padding: '3.5rem 3rem',
            borderRadius: 16,
            boxShadow: '0 20px 50px rgba(93, 14, 11, 0.08)',
            border: '1px solid rgba(93, 14, 11, 0.12)',
          }}
        >
          {/* Contact Form */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="md">
              <Title order={2} size="1.8rem" fw={700} c="#5d0e0b" style={{ fontFamily: "'Playfair Display', serif" }} mb="md">
                Send us a Message
              </Title>
              <form onSubmit={(e) => e.preventDefault()}>
                <Stack gap="md">
                  <TextInput
                    label="Full Name"
                    placeholder="Your name"
                    required
                    styles={{ input: { borderRadius: '8px' } }}
                  />
                  <TextInput
                    label="Email Address"
                    placeholder="your@email.com"
                    type="email"
                    required
                    styles={{ input: { borderRadius: '8px' } }}
                  />
                  <Textarea
                    label="Message"
                    placeholder="Your message"
                    rows={4}
                    required
                    styles={{ input: { borderRadius: '8px' } }}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    radius="xl"
                    size="md"
                    style={{ 
                      backgroundColor: '#5d0e0b',
                      backgroundImage: 'linear-gradient(135deg, #5d0e0b 0%, #800020 100%)',
                      boxShadow: '0 8px 20px rgba(93, 14, 11, 0.2)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    Submit Message
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Grid.Col>

          {/* Contact Information */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="xl" c="#444">
              <Title order={2} size="1.8rem" fw={700} c="#5d0e0b" style={{ fontFamily: "'Playfair Display', serif" }} mb="md">
                Contact Information
              </Title>
              <div>
                <Text fw={700} c="#5d0e0b" mb={4}>Address:</Text>
                <Text>6/135, North Street, Nachiyarkovil - 612 602.</Text>
              </div>
              <div>
                <Text fw={700} c="#5d0e0b" mb={4}>Email:</Text>
                <Anchor href="mailto:info@amirthasuperstore.com" c="#f7941d" fw={600} style={{ textDecoration: 'none' }}>
                  info@amirthasuperstore.com
                </Anchor>
              </div>
              <div>
                <Text fw={700} c="#5d0e0b" mb={4}>Phone Contacts:</Text>
                <Stack gap="xs" mt="xs">
                  <Anchor href="tel:+918610349949" c="#f7941d" fw={600} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#444', fontWeight: 500 }}>Sales Manager:</span> +91 86103 49949
                  </Anchor>
                  <Anchor href="tel:+919443937236" c="#f7941d" fw={600} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#444', fontWeight: 500 }}>Store Manager:</span> +91 94439 37236
                  </Anchor>
                  <Anchor href="tel:+917603910145" c="#f7941d" fw={600} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#444', fontWeight: 500 }}>Customer Support:</span> +91 76039 10145
                  </Anchor>
                </Stack>
              </div>
              <div>
                <Text fw={700} c="#5d0e0b" mb={4}>Business Hours:</Text>
                <Text>Monday - Saturday: 9:00 AM - 9:00 PM</Text>
                <Text>Sunday: Closed</Text>
              </div>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactPage;
