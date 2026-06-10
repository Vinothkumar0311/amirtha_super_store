import React from 'react';
import { Box, Container, Title, Text, List, Stack } from '@mantine/core';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <Box style={{ backgroundColor: 'white' }} py={64}>
      <Container size="md">
        <Stack gap="lg">
          <Title order={1} size="2.5rem" ff="Georgia, serif" fw={700} c="#3a0e0d">
            Privacy Policy
          </Title>
          <Text c="dimmed">Last updated: {new Date().toLocaleDateString()}</Text>

          <Text>
            Amirtha Super Store ("us", "we", or "our") operates this website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
          </Text>

          <div>
            <Title order={2} size="1.5rem" fw={700} c="#3a0e0d" mb="sm">
              Information Collection and Use
            </Title>
            <Text>
              We collect several different types of information for various purposes to provide and improve our Service to you.
            </Text>
          </div>

          <div>
            <Title order={3} size="1.25rem" fw={600} c="#3a0e0d" mb="xs">
              Types of Data Collected
            </Title>
            <Title order={4} size="1.125rem" fw={600} c="#3a0e0d" mb="xs" mt="sm">
              Personal Data
            </Title>
            <Text mb="sm">
              While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:
            </Text>
            <List>
              <List.Item>Email address</List.Item>
              <List.Item>First name and last name</List.Item>
              <List.Item>Phone number</List.Item>
              <List.Item>Address, State, Province, ZIP/Postal code, City</List.Item>
              <List.Item>Cookies and Usage Data</List.Item>
            </List>
          </div>

          <div>
            <Title order={2} size="1.5rem" fw={700} c="#3a0e0d" mb="sm">
              Use of Data
            </Title>
            <Text mb="sm">We use the collected data for various purposes:</Text>
            <List>
              <List.Item>To provide and maintain our Service</List.Item>
              <List.Item>To notify you about changes to our Service</List.Item>
              <List.Item>To provide customer support</List.Item>
              <List.Item>To gather analysis or valuable information so that we can improve our Service</List.Item>
              <List.Item>To monitor the usage of our Service</List.Item>
              <List.Item>To detect, prevent and address technical issues</List.Item>
            </List>
          </div>

          <div>
            <Title order={2} size="1.5rem" fw={700} c="#3a0e0d" mb="sm">
              Security of Data
            </Title>
            <Text>
              The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
            </Text>
          </div>

          <div>
            <Title order={2} size="1.5rem" fw={700} c="#3a0e0d" mb="sm">
              Changes to This Privacy Policy
            </Title>
            <Text>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
            </Text>
          </div>

          <div>
            <Title order={2} size="1.5rem" fw={700} c="#3a0e0d" mb="sm">
              Contact Us
            </Title>
            <Text mb="sm">If you have any questions about this Privacy Policy, please contact us:</Text>
            <List>
              <List.Item>By email: privacy@amirthasuperstore.com</List.Item>
            </List>
          </div>
        </Stack>
      </Container>
    </Box>
  );
};

export default PrivacyPolicyPage;
