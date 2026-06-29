// [Old implementation commented out — preserved above line 131]

import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Box, Container, Grid, Image, Title, Text, Button,
  Stack, Anchor, Group, Breadcrumbs, Modal, TextInput, Textarea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { PRODUCTS } from "../constants";
import ProductGrid from "../components/ProductGrid";

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.523 5.845L.057 23.547a.5.5 0 0 0 .611.627l5.882-1.43A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.686-.508-5.23-1.394l-.374-.22-3.888.944.986-3.768-.243-.387A9.937 9.937 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
);

const WHATSAPP_NUMBERS = [
  { label: "Sales Manager",     sublabel: "Quick response guaranteed", number: "918610349949" },
  { label: "Store Manager",     sublabel: "For bulk & wholesale orders", number: "919443937236" },
  { label: "Customer Support",  sublabel: "Shipping & order queries",   number: "917603910145" },
];

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [submitted, setSubmitted] = useState(false);
  const [imgHovered, setImgHovered] = useState(false);

  const product = PRODUCTS.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <Box ta="center" py={80} style={{ background: "linear-gradient(160deg,#fff9f4,#fff)", minHeight: "80vh" }}>
        <Title order={1} c="#5d0e0b">Product Not Found</Title>
        <Text c="dimmed" mt="sm" mb="xl">The item you are looking for might have been moved or is out of stock.</Text>
        <Button component={Link} to="/products" radius="xl" style={{ background: "linear-gradient(135deg,#5d0e0b,#9b2226)" }}>
          Back to Collection
        </Button>
      </Box>
    );
  }

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const itemNumber = product.name.split(" ").pop() ?? product.id.toString();
  const whatsappMessage = `Hi, I am interested in *Item Number ${itemNumber}* from Amirtha Super Store. Could you please share the price and availability details?`;

  const openWhatsApp = (phone: string) => {
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(whatsappMessage)}`, "_blank", "noopener,noreferrer");
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { close(); setSubmitted(false); }, 2500);
  };

  const breadcrumbItems = [
    { title: "Home", href: "/" },
    { title: "Products", href: "/products" },
    { title: product.category, href: `/products?category=${encodeURIComponent(product.category)}` },
    { title: product.name, href: "#" },
  ].map((item, i) => (
    <Anchor
      component={item.href === "#" ? "span" : Link}
      to={item.href !== "#" ? item.href : undefined}
      key={i}
      c={i === 3 ? "#5d0e0b" : "dimmed"}
      fw={i === 3 ? 600 : 400}
      size="sm"
      style={{ textDecoration: "none" }}
    >
      {item.title}
    </Anchor>
  ));

  return (
    <Box style={{ background: "linear-gradient(160deg,#fff9f4 0%,#ffffff 60%)", minHeight: "100vh" }} pt={16}>
      <Container size="xl" py={24}>

        {/* ── Breadcrumbs ── */}
        <Breadcrumbs separator="›" mb="lg" style={{ fontSize: 13 }}>
          {breadcrumbItems}
        </Breadcrumbs>

        {/* ── Back button ── */}
        <Button
          variant="subtle"
          mb="xl"
          onClick={() => navigate(-1)}
          leftSection={
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#5d0e0b" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          }
          styles={{ root: { paddingLeft: 0, color: "#5d0e0b", "&:hover": { backgroundColor: "transparent", textDecoration: "underline" } } }}
        >
          Back to list
        </Button>

        <Grid gutter={48} align="flex-start">

          {/* ─── LEFT: Image Panel ─── */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Box
              style={{
                position: "sticky",
                top: 90,
                borderRadius: 24,
                overflow: "hidden",
                boxShadow: "0 28px 72px rgba(93,14,11,0.14)",
                border: "1px solid #f0e6d6",
                background: "#fff",
              }}
            >
              {/* Image */}
              <Box
                style={{ overflow: "hidden", borderRadius: "24px 24px 0 0" }}
                onMouseEnter={() => setImgHovered(true)}
                onMouseLeave={() => setImgHovered(false)}
              >
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fit="contain"
                  style={{
                    width: "100%",
                    maxHeight: 520,
                    backgroundColor: "#fff",
                    display: "block",
                    transform: imgHovered ? "scale(1.06)" : "scale(1)",
                    transition: "transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)",
                  }}
                />
              </Box>

              {/* Bottom item-number bar */}
              <Box
                style={{
                  background: "linear-gradient(135deg,#5d0e0b,#9b2226)",
                  padding: "12px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text size="sm" fw={700} c="white" style={{ letterSpacing: 1 }}>
                  Item No: <span style={{ fontFamily: "monospace", fontSize: 16 }}>{itemNumber}</span>
                </Text>
                <Box
                  style={{
                    background: "rgba(255,255,255,0.18)",
                    borderRadius: 50,
                    padding: "3px 12px",
                    fontSize: 11,
                    color: "white",
                    fontWeight: 700,
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                  }}
                >
                  ✦ Handcrafted
                </Box>
              </Box>
            </Box>
          </Grid.Col>

          {/* ─── RIGHT: Details Panel ─── */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="xl">

              {/* Category + Name */}
              <Box>
                <Text
                  size="xs"
                  fw={800}
                  style={{
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    background: "linear-gradient(90deg,#800020,#c0392b)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {product.category}
                </Text>
                <Title order={1} size="2.4rem" fw={800} c="#3a0c0a" mt={4} style={{ lineHeight: 1.2 }}>
                  {product.name}
                </Title>
                <Box
                  mt={8}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    background: "#fef3e3",
                    border: "1px solid #e8c99a",
                    borderRadius: 50,
                    padding: "4px 14px",
                  }}
                >
                  <Text size="xs" fw={700} c="#7c4a03" style={{ fontFamily: "monospace" }}>
                    Product ID: ASS-{product.id}
                  </Text>
                </Box>
              </Box>

              {/* Price on Enquiry */}
              <Box
                style={{
                  background: "linear-gradient(135deg,#5d0e0b,#7c1d1a)",
                  borderRadius: 16,
                  padding: "18px 22px",
                  color: "white",
                  boxShadow: "0 8px 28px rgba(93,14,11,0.22)",
                }}
              >
                <Group gap="xs" mb={4}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.8)" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z" />
                  </svg>
                  <Text size="xs" c="rgba(255,255,255,0.75)" fw={600} style={{ letterSpacing: 1, textTransform: "uppercase" }}>
                    Pricing
                  </Text>
                </Group>
                <Text size="xl" fw={800} c="white">Price on Enquiry</Text>
                <Text size="xs" c="rgba(255,255,255,0.7)" mt={4}>
                  Each piece is individually handcrafted. Enquire for price &amp; shipping.
                </Text>
              </Box>

              {/* WhatsApp Enquiry Card */}
              <Box
                style={{
                  background: "linear-gradient(145deg,#f0fff4,#e8faf0)",
                  border: "1.5px solid #a5d6a7",
                  borderRadius: 18,
                  padding: "20px 22px",
                  boxShadow: "0 6px 24px rgba(37,211,102,0.10)",
                }}
              >
                <Group gap={8} mb={14}>
                  <WhatsAppIcon />
                  <Text size="sm" fw={800} c="#1b5e20" style={{ letterSpacing: 0.5 }}>
                    Enquire via WhatsApp
                  </Text>
                </Group>

                <Box
                  style={{
                    background: "rgba(255,255,255,0.7)",
                    borderRadius: 10,
                    padding: "8px 12px",
                    marginBottom: 14,
                    border: "1px solid #c8e6c9",
                    fontSize: 12,
                    color: "#2e7d32",
                    fontWeight: 600,
                  }}
                >
                  💬 Message: "Hi, I am interested in <strong>Item Number {itemNumber}</strong> from Amirtha Super Store..."
                </Box>

                <Stack gap={8}>
                  {WHATSAPP_NUMBERS.map(({ label, sublabel, number }, idx) => (
                    <button
                      key={number}
                      onClick={() => openWhatsApp(number)}
                      style={{
                        background: idx === 0
                          ? "linear-gradient(135deg,#25D366,#1ebe5d)"
                          : idx === 1
                          ? "linear-gradient(135deg,#20b954,#128C7E)"
                          : "linear-gradient(135deg,#128C7E,#0e7b6e)",
                        border: "none",
                        borderRadius: 12,
                        padding: "13px 18px",
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        cursor: "pointer",
                        width: "100%",
                        color: "white",
                        fontWeight: 700,
                        fontSize: 14,
                        boxShadow: "0 4px 14px rgba(37,211,102,0.25)",
                        transition: "transform 0.18s ease, box-shadow 0.18s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 22px rgba(37,211,102,0.38)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 14px rgba(37,211,102,0.25)";
                      }}
                    >
                      <WhatsAppIcon />
                      <Box style={{ textAlign: "left", flex: 1 }}>
                        <Text size="sm" fw={800} c="white">{label}</Text>
                        <Text size="xs" c="rgba(255,255,255,0.75)" fw={500} style={{ lineHeight: 1.2, marginTop: 2 }}>{sublabel}</Text>
                      </Box>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.7)" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  ))}
                </Stack>
              </Box>

              {/* Request via Email */}
              {/* <Button
                variant="outline"
                size="md"
                radius="xl"
                onClick={open}
                leftSection={
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#5d0e0b" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                }
                styles={{
                  root: {
                    borderColor: "#5d0e0b",
                    borderWidth: 2,
                    color: "#5d0e0b",
                    fontWeight: 700,
                    "&:hover": { background: "#fef3e3" },
                  },
                }}
              >
                Request Price via Email
              </Button> */}

              {/* Description */}
              <Box
                style={{
                  background: "#fafafa",
                  borderRadius: 14,
                  border: "1px solid #f0e6d6",
                  padding: "18px 20px",
                }}
              >
                <Text size="sm" fw={800} c="#5d0e0b" mb={8} style={{ letterSpacing: 0.5, textTransform: "uppercase" }}>
                  About this piece
                </Text>
                <Text c="#4b5563" style={{ lineHeight: 1.75, fontSize: 14 }}>
                  {product.description}
                </Text>
              </Box>

              {/* Tags */}
              <Group gap={8}>
                <Text size="xs" fw={600} c="dimmed">Tags:</Text>
                <Anchor
                  component={Link}
                  to={`/products?category=${encodeURIComponent(product.category)}`}
                  style={{
                    display: "inline-block",
                    background: "#fef3e3",
                    border: "1px solid #f0c9a0",
                    borderRadius: 50,
                    padding: "3px 12px",
                    fontSize: 12,
                    color: "#7c4a03",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  #{product.category.replace(" ", "")}
                </Anchor>
                <Box
                  style={{
                    display: "inline-block",
                    background: "#fef3e3",
                    border: "1px solid #f0c9a0",
                    borderRadius: 50,
                    padding: "3px 12px",
                    fontSize: 12,
                    color: "#7c4a03",
                    fontWeight: 700,
                  }}
                >
                  #KumbakonamHandicrafts
                </Box>
              </Group>

            </Stack>
          </Grid.Col>
        </Grid>
      </Container>

      {/* ── Email Enquiry Modal ── */}
      <Modal
        opened={opened}
        onClose={close}
        title={
          <Text fw={700} c="#5d0e0b" size="lg">Product Pricing Enquiry</Text>
        }
        centered
        radius="lg"
        styles={{
          header: { background: "#fff9f4", borderBottom: "1px solid #f0e6d6" },
          body: { background: "#fff9f4" },
        }}
      >
        {submitted ? (
          <Box ta="center" py="xl">
            <Text size="3rem" mb={8}>✅</Text>
            <Text fw={800} c="#5d0e0b" size="lg" mb={4}>Thank You!</Text>
            <Text c="dimmed" size="sm">Your enquiry has been sent. We will get back to you shortly.</Text>
          </Box>
        ) : (
          <form onSubmit={handleEnquirySubmit}>
            <Stack gap="md">
              <Box
                style={{
                  background: "#fef3e3",
                  borderRadius: 10,
                  padding: "10px 14px",
                  border: "1px solid #e8c99a",
                }}
              >
                <Text size="xs" c="#7c4a03" fw={600}>
                  Enquiring about: <strong>{product.name}</strong> (ID: ASS-{product.id})
                </Text>
              </Box>
              <TextInput label="Your Name" placeholder="Full name" required styles={{ label: { fontWeight: 700, color: "#5d0e0b" } }} />
              <TextInput label="Email Address" placeholder="your@email.com" type="email" required styles={{ label: { fontWeight: 700, color: "#5d0e0b" } }} />
              <TextInput label="Phone Number" placeholder="Your phone number" styles={{ label: { fontWeight: 700, color: "#5d0e0b" } }} />
              <Textarea
                label="Message"
                defaultValue={`Hello, I would like to know the price, dimensions, and shipping options for "${product.name}" (Item Number: ${itemNumber}).`}
                rows={3}
                required
                styles={{ label: { fontWeight: 700, color: "#5d0e0b" } }}
              />
              <Button
                type="submit"
                radius="xl"
                size="md"
                style={{ background: "linear-gradient(135deg,#5d0e0b,#9b2226)", fontWeight: 700 }}
              >
                Submit Enquiry
              </Button>
            </Stack>
          </form>
        )}
      </Modal>

      {/* ── Related Products ── */}
      {relatedProducts.length > 0 && (
        <Box
          mt={80}
          style={{
            background: "linear-gradient(180deg,#fef3e3,#fff8f0)",
            borderTop: "1px solid #f0e6d6",
          }}
        >
          <ProductGrid
            title="You Might Also Like"
            subtitle="Explore more handcrafted masterpieces in the same category"
            products={relatedProducts}
          />
        </Box>
      )}
    </Box>
  );
};

export default ProductDetailPage;
