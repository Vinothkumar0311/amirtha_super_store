// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Box, Container, Grid, Stack, Text, Anchor, Group } from '@mantine/core';

// const SocialIcon: React.FC<{ href: string, children: React.ReactNode }> = ({ href, children }) => (
//     <Anchor href={href} target="_blank" rel="noopener noreferrer" c="white" style={{ transition: 'color 0.3s' }}>
//         {children}
//     </Anchor>
// );

// const Footer: React.FC = () => {
//     return (
//         <Box component="footer" style={{ backgroundColor: '#3a0e0d', color: '#d1d5db' }}>
//             <Container size="xl" py={48}>
//                 <Grid gutter="xl">
//                     {/* About Section */}
//                     <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
//                         <Stack gap="md">
//                             <Text size="xl" fw={700} c="white" ff="Georgia, serif">
//                                 Amirtha<span style={{ color: '#f7941d' }}> Super Store</span>
//                             </Text>
//                             <Text size="sm">
//                                 Your one-stop destination for authentic Bronze Statues, Electronics, Furniture, and Puja Items in Kumbakonam. Quality and tradition since establishment.
//                             </Text>
//                             <Group gap="md" mt="md">
//                                 <SocialIcon href="#">
//                                     <svg style={{ width: 24, height: 24 }} fill="currentColor" viewBox="0 0 24 24">
//                                         <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.494v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.323-1.325z" />
//                                     </svg>
//                                 </SocialIcon>
//                                 <SocialIcon href="#">
//                                     <svg style={{ width: 24, height: 24 }} fill="currentColor" viewBox="0 0 24 24">
//                                         <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.298 1.634 4.212 3.793 4.649-.65.177-1.354.23-2.067.087.616 1.9 2.396 3.281 4.5 3.315-2.053 1.6-4.573 2.541-7.24 2.182 2.118 1.365 4.633 2.162 7.34 2.162 8.807 0 13.61-7.277 13.61-13.61 0-.207-.005-.414-.014-.621.936-.676 1.742-1.52 2.384-2.471z" />
//                                     </svg>
//                                 </SocialIcon>
//                                 <SocialIcon href="#">
//                                     <svg style={{ width: 24, height: 24 }} fill="currentColor" viewBox="0 0 24 24">
//                                         <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.85s.012-3.584.07-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" />
//                                     </svg>
//                                 </SocialIcon>
//                                 <SocialIcon href="https://wa.me/911234567890">
//                                     <svg style={{ width: 24, height: 24 }} fill="currentColor" viewBox="0 0 24 24">
//                                         <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zM17.16 14.2c-.28-.14-1.64-.81-1.9-.9s-.45-.14-.64.14c-.19.27-.72.9-.88 1.08-.16.19-.32.21-.6.07-.27-.14-1.14-.42-2.17-1.34-.81-.71-1.36-1.59-1.52-1.86s-.02-.42.12-.56c.13-.13.28-.34.42-.5.14-.17.19-.28.28-.47.1-.19.05-.36-.02-.5s-.64-1.54-.88-2.1c-.24-.56-.49-.48-.64-.49-.16 0-.36-.01-.54-.01s-.46.07-.69.36c-.23.29-.92 1.02-.92 2.49s.94 2.9 1.07 3.1c.13.2 1.86 2.96 4.54 4.03.65.26 1.23.42 1.66.53.71.19 1.36.16 1.86-.09.57-.29 1.64-1.05 1.88-1.42.24-.37.24-.69.17-.83-.07-.13-.26-.22-.54-.36z" />
//                                     </svg>
//                                 </SocialIcon>
//                             </Group>
//                         </Stack>
//                     </Grid.Col>

//                     {/* Quick Links */}
//                     <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
//                         <Stack gap="md">
//                             <Text size="lg" fw={600} c="white">Quick Links</Text>
//                             <Stack gap="xs">
//                                 <Link to="/about" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.875rem' }}>
//                                     About Us
//                                 </Link>
//                                 <Link to="/contact" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.875rem' }}>
//                                     Contact Us
//                                 </Link>
//                                 <Link to="/faq" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.875rem' }}>
//                                     FAQ
//                                 </Link>
//                                 <Link to="/privacy" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.875rem' }}>
//                                     Privacy Policy
//                                 </Link>
//                             </Stack>
//                         </Stack>
//                     </Grid.Col>

//                     {/* Shop */}
//                     <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
//                         <Stack gap="md">
//                             <Text size="lg" fw={600} c="white">Shop</Text>
//                             <Stack gap="xs">
//                                 <Link to="/products?category=Bronze Statues" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.875rem' }}>
//                                     Bronze Statues
//                                 </Link>
//                                 <Link to="/products?category=Electronics" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.875rem' }}>
//                                     Electronics
//                                 </Link>
//                                 <Link to="/products?category=Furniture" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.875rem' }}>
//                                     Furniture
//                                 </Link>
//                                 <Link to="/products?category=Puja Items" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '0.875rem' }}>
//                                     Puja Items
//                                 </Link>
//                             </Stack>
//                         </Stack>
//                     </Grid.Col>

//                     {/* Contact Info */}
//                     <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
//                         <Stack gap="md">
//                             <Text size="lg" fw={600} c="white">Contact Us</Text>
//                             <Stack gap="sm" component="address" style={{ fontStyle: 'normal' }}>
//                                 <Text size="sm">No6/135, Opposite to City Union Bank, North Street, Natchar Koil, Kumbakonam-612602, Tamil Nadu</Text>
//                                 <Text size="sm">
//                                     Email: <Anchor href="mailto:info@amirthasuperstore.com" c="#d1d5db">info@amirthasuperstore.com</Anchor>
//                                 </Text>
//                                 <Text size="sm">
//                                     Phone: <Anchor href="tel:+911234567890" c="#d1d5db">+91-1234567890</Anchor>
//                                 </Text>
//                             </Stack>
//                         </Stack>
//                     </Grid.Col>
//                 </Grid>
//             </Container>
//             <Box style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', padding: '1rem 0' }}>
//                 <Container size="xl">
//                     <Text ta="center" size="sm" c="#9ca3af">
//                         &copy; {new Date().getFullYear()} Amirtha Super Store. All Rights Reserved.
//                     </Text>
//                 </Container>
//             </Box>
//         </Box>
//     );
// };

// export default Footer;





import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Grid, Stack, Text, Anchor, Group, Divider } from '@mantine/core';

const SocialIcon: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <Anchor
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    c="white"
    style={{
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
    }}
    className="social-icon"
  >
    {children}
  </Anchor>
);

const Footer: React.FC = () => {
  return (
    <Box component="footer" style={{ backgroundColor: '#5d0e0b', color: 'white' }}>
      <Container size="xl" py={{ base: 40, md: 60 }}>
        <Grid gutter={{ base: 'xl', md: '2xl' }}>
          {/* Brand & About */}
          <Grid.Col span={{ base: 12, sm: 6, lg: 4 }}>
            <Stack gap="md">
              <Text
                size="xl"
                fw={800}
                style={{
                  fontSize: '1.8rem',
                  letterSpacing: '-0.5px',
                  color: 'white'
                }}
              >
                Amirtha <span style={{ color: '#f7941d' }}>Super Store</span>
              </Text>

              <Text size="sm" opacity={0.8} lh={1.7}>
                Your trusted destination in Kumbakonam for authentic Bronze Statues, Puja Items, Furniture,
                Electronics, and traditional essentials. Quality meets tradition.
              </Text>

              <Group gap="md" mt="sm">
                {/* <SocialIcon href="#">
                  <svg width={20} height={20} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.494v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.323-1.325z" />
                  </svg>
                </SocialIcon> */}

                <SocialIcon href="https://www.instagram.com/amirthasuperstore.official?igsh=MW80ZmI4dmVuaXJ4bg%3D%3D&utm_source=qr">
                  <svg width={20} height={20} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.85s.012-3.584.07-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/>
                  </svg>
                </SocialIcon>

                <SocialIcon href="https://wa.me/918610349949">
                  <svg width={20} height={20} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zM17.16 14.2c-.28-.14-1.64-.81-1.9-.9s-.45-.14-.64.14c-.19.27-.72.9-.88 1.08-.16.19-.32.21-.6.07-.27-.14-1.14-.42-2.17-1.34-.81-.71-1.36-1.59-1.52-1.86s-.02-.42.12-.56c.13-.13.28-.34.42-.5.14-.17.19-.28.28-.47.1-.19.05-.36-.02-.5s-.64-1.54-.88-2.1c-.24-.56-.49-.48-.64-.49-.16 0-.36-.01-.54-.01s-.46.07-.69.36c-.23.29-.92 1.02-.92 2.49s.94 2.9 1.07 3.1c.13.2 1.86 2.96 4.54 4.03.65.26 1.23.42 1.66.53.71.19 1.36.16 1.86-.09.57-.29 1.64-1.05 1.88-1.42.24-.37.24-.69.17-.83-.07-.13-.26-.22-.54-.36z" />
                  </svg>
                </SocialIcon>
              </Group>
            </Stack>
          </Grid.Col>

          {/* Quick Links */}
          <Grid.Col span={{ base: 6, sm: 3, lg: 2 }}>
            <Stack gap="md">
              <Text size="lg" fw={700} c="white" style={{ letterSpacing: '0.3px' }}>
                Quick Links
              </Text>
              <Stack gap="sm">
                {['About Us', 'Contact Us', 'FAQ', 'Privacy Policy'].map((item) => (
                  <Link
                    key={item}
                    to={
                      item === 'About Us' ? '/about' :
                      item === 'Contact Us' ? '/contact' :
                      item === 'Privacy Policy' ? '/privacy' :
                      item === 'FAQ' ? '/faq' :
                      '/'
                    }
                    style={{
                      color: 'rgba(255,255,255,0.75)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'all 0.2s ease',
                    }}
                    className="footer-link"
                  >
                    {item}
                  </Link>
                ))}
              </Stack>
            </Stack>
          </Grid.Col>

          {/* Shop Categories */}
          <Grid.Col span={{ base: 6, sm: 3, lg: 3 }}>
            <Stack gap="md">
              <Text size="lg" fw={700} c="white" style={{ letterSpacing: '0.3px' }}>
                Shop
              </Text>
              <Stack gap="sm">
                {['Bronze Statues', 'Furniture', 'Puja Items'].map((cat) => (
                  <Link
                    key={cat}
                    to={`/products?category=${encodeURIComponent(cat)}`}
                    style={{
                      color: 'rgba(255,255,255,0.75)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'all 0.2s ease',
                    }}
                    className="footer-link"
                  >
                    {cat}
                  </Link>
                ))}
              </Stack>
            </Stack>
          </Grid.Col>

          {/* Contact Info */}
          <Grid.Col span={{ base: 12, lg: 3 }}>
            <Stack gap="md">
              <Text size="lg" fw={700} c="white" style={{ letterSpacing: '0.3px' }}>
                Contact Us
              </Text>
              <Stack gap="sm" component="address" style={{ fontStyle: 'normal' }}>
                <Text size="sm" lh={1.6} opacity={0.8}>
                  6/135, North Street,<br />
                  Nachiyarkovil - 612 602.
                </Text>

                <Group gap="xs" align="center" style={{ marginTop: '4px' }}>
                  <Text size="sm" fw={600} c="#f7941d">Email:</Text>
                  <Anchor href="mailto:info@amirthasuperstore.com" c="white" size="sm" className="footer-contact-link">
                    info@amirthasuperstore.com
                  </Anchor>
                </Group>

                <Group gap="xs" align="center">
                  <Text size="sm" fw={600} c="#f7941d">Phone:</Text>
                  <Anchor href="tel:+918610349949" c="white" size="sm" className="footer-contact-link">
                    +91 86103 49949
                  </Anchor>
                </Group>
              </Stack>
            </Stack>
          </Grid.Col>
        </Grid>

        <Divider my="xl" color="rgba(255,255,255,0.08)" />

        <Text ta="center" size="xs" c="rgba(255,255,255,0.5)">
          © {new Date().getFullYear()} Amirtha Super Store. All Rights Reserved.
        </Text>
      </Container>

      <style>{`
        .footer-link {
          position: relative;
          display: inline-block;
          transition: all 0.2s ease;
        }
        .footer-link:hover {
          color: #f7941d !important;
          transform: translateX(4px);
        }
        .footer-contact-link {
          transition: color 0.2s ease;
          text-decoration: none;
        }
        .footer-contact-link:hover {
          color: #f7941d !important;
          text-decoration: underline;
        }
        .social-icon:hover {
          transform: translateY(-4px);
          background-color: #f7941d !important;
          border-color: #f7941d !important;
          color: #120101 !important;
        }
      `}</style>
    </Box>
  );
};

export default Footer;  