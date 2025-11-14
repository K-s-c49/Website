import { formatCurrency } from '@/lib/utils';

export const categories = [
  { id: 'electronics', name: 'Electronics' },
  { id: 'fashion', name: 'Fashion' },
  { id: 'home', name: 'Home & Living' },
  { id: 'beauty', name: 'Beauty' },
  { id: 'sports', name: 'Sports & Outdoors' },
];

export const products = [
  {
    id: 'prod-1',
    name: 'Noise Cancelling Headphones',
    sku: 'NC-HP-001',
    description:
      'Experience immersive sound with advanced noise cancellation, 30-hour battery life, and premium comfort.',
    price: 7999,
    salePrice: 6499,
    rating: 4.8,
    reviews: 128,
    stock: 24,
    category: 'electronics',
    brand: 'SoundWave',
    images: [
      '/images/products/headphones-yellow.jpg',
      '/images/products/headphones-yellow-2.jpg',
    ],
    badges: ['Bestseller', 'Free Shipping'],
    highlights: [
      'Active noise cancellation with transparency mode',
      'Up to 30 hours of playback on a single charge',
      'Quick charge: 10 minutes for 5 hours of playback',
    ],
  },
  {
    id: 'prod-2',
    name: 'Sustainable Cotton Hoodie',
    sku: 'SC-HOOD-342',
    description:
      'Everyday comfort meets eco-friendly materials. Made with 100% organic cotton and recycled polyester.',
    price: 89,
    salePrice: null,
    rating: 4.6,
    reviews: 64,
    stock: 80,
    category: 'fashion',
    brand: 'EcoWear',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200',
    ],
    badges: ['New Arrival'],
    highlights: [
      'Soft brushed interior',
      'Made with sustainable materials',
      'Available in 6 colors',
    ],
  },
  {
    id: 'prod-3',
    name: 'Smart Home Speaker',
    sku: 'SHS-884',
    description:
      'Voice-controlled smart speaker with rich sound, integrated assistant, and multi-room audio support.',
    price: 149,
    salePrice: 129,
    rating: 4.4,
    reviews: 210,
    stock: 46,
    category: 'electronics',
    brand: 'Pulse',
    images: [
      'https://images.unsplash.com/photo-1555617117-08c5d936c9c5?q=80&w=1200',
      'https://images.unsplash.com/photo-1517511620798-cec17d428bc0?q=80&w=1200',
    ],
    badges: ['Trending'],
    highlights: [
      'Hands-free voice assistant',
      '360° room-filling sound',
      'Compatible with smart home devices',
    ],
  },
  {
    id: 'prod-4',
    name: 'Ergonomic Office Chair',
    sku: 'OC-ERG-209',
    description:
      'Adjustable mesh office chair with lumbar support, breathable fabric, and 5-point tilt locking system.',
    price: 259,
    salePrice: 219,
    rating: 4.7,
    reviews: 87,
    stock: 15,
    category: 'home',
    brand: 'ComfortLab',
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200',
      'https://images.unsplash.com/photo-1595526114035-0d45ed2145fa?q=80&w=1200',
    ],
    badges: ['Limited Stock'],
    highlights: [
      'Lumbar support with adjustable depth',
      'Breathable mesh for all-day comfort',
      '5-year warranty',
    ],
  },
  {
    id: 'prod-5',
    name: 'Premium Skincare Set',
    sku: 'SK-SET-844',
    description:
      'A complete 4-step skincare ritual with antioxidant serums, hydrating moisturizer, and mineral SPF.',
    price: 129,
    salePrice: 109,
    rating: 4.9,
    reviews: 54,
    stock: 62,
    category: 'beauty',
    brand: 'GlowLab',
    images: [
      'https://images.unsplash.com/photo-1612810806695-30ba0b38fa67?q=80&w=1200',
      'https://images.unsplash.com/photo-1612810806695-30ba0b38fa67?q=80&w=1200',
    ],
    badges: ['Limited Offer'],
    highlights: [
      'Dermatologist tested',
      'Suitable for sensitive skin',
      'Includes complimentary travel bag',
    ],
  },
  {
    id: 'prod-6',
    name: 'Adidas Continental 80 Sneakers',
    sku: 'AD-C80-001',
    description:
      'Classic retro-inspired sneakers with premium leather upper, iconic three-stripe design, and comfortable rubber outsole.',
    price: 8999,
    salePrice: 7499,
    rating: 4.7,
    reviews: 342,
    stock: 45,
    category: 'fashion',
    brand: 'Adidas',
    images: [
      '/images/products/adidas-sneakers.jpg',
      '/images/products/adidas-sneakers-2.jpg',
    ],
    badges: ['Bestseller', 'Free Shipping'],
    highlights: [
      'Premium leather upper',
      'Classic retro design',
      'Comfortable rubber outsole',
    ],
  },
  {
    id: 'prod-7',
    name: 'iPhone 13 Pro',
    sku: 'IP-13P-256',
    description:
      'Latest iPhone with A15 Bionic chip, Pro camera system, and all-day battery life. Available in stunning colors.',
    price: 99999,
    salePrice: 89999,
    rating: 4.9,
    reviews: 1256,
    stock: 28,
    category: 'electronics',
    brand: 'Apple',
    images: [
      '/images/products/iphone-back.jpg',
      '/images/products/iphone-dual.jpg',
    ],
    badges: ['New Arrival', 'Trending'],
    highlights: [
      'A15 Bionic chip',
      'Pro camera system with Night mode',
      'All-day battery life',
    ],
  },
  {
    id: 'prod-8',
    name: 'Premium Brown Leather Oxford Shoes',
    sku: 'SH-OXF-001',
    description:
      'Handcrafted brown leather Oxford shoes with classic design, perfect for formal occasions and business wear.',
    price: 12999,
    salePrice: null,
    rating: 4.6,
    reviews: 89,
    stock: 32,
    category: 'fashion',
    brand: 'London',
    images: [
      '/images/products/leather-shoes.jpg',
      '/images/products/leather-shoes-2.jpg',
    ],
    badges: ['Premium'],
    highlights: [
      'Handcrafted premium leather',
      'Classic Oxford design',
      'Comfortable fit',
    ],
  },
  {
    id: 'prod-9',
    name: 'Prada Milano Perfume',
    sku: 'PR-PRF-001',
    description:
      'Luxury fragrance from Prada Milano, featuring elegant notes and sophisticated packaging. A timeless classic.',
    price: 15999,
    salePrice: 13999,
    rating: 4.8,
    reviews: 234,
    stock: 18,
    category: 'beauty',
    brand: 'Prada',
    images: [
      '/images/products/prada-perfume.jpg',
      '/images/products/prada-perfume-2.jpg',
    ],
    badges: ['Luxury', 'Limited Stock'],
    highlights: [
      'Premium fragrance',
      'Elegant packaging',
      'Long-lasting scent',
    ],
  },
  {
    id: 'prod-10',
    name: 'Ray-Ban Classic Wayfarer Sunglasses',
    sku: 'RB-WAY-001',
    description:
      'Iconic Wayfarer sunglasses with polarized lenses, UV protection, and timeless design. The original classic.',
    price: 8999,
    salePrice: 7499,
    rating: 4.7,
    reviews: 567,
    stock: 67,
    category: 'fashion',
    brand: 'Ray-Ban',
    images: [
      '/images/products/rayban-sunglasses.jpg',
      '/images/products/rayban-sunglasses-2.jpg',
    ],
    badges: ['Bestseller', 'Classic'],
    highlights: [
      'Polarized lenses',
      '100% UV protection',
      'Timeless design',
    ],
  },
  {
    id: 'prod-11',
    name: 'Nikon FG Film Camera',
    sku: 'NK-FG-001',
    description:
      'Vintage Nikon FG 35mm film camera with 50mm f/1.8 lens. Perfect for photography enthusiasts and collectors.',
    price: 24999,
    salePrice: 21999,
    rating: 4.9,
    reviews: 123,
    stock: 12,
    category: 'electronics',
    brand: 'Nikon',
    images: [
      '/images/products/nikon-camera.jpg',
      '/images/products/nikon-camera-2.jpg',
    ],
    badges: ['Vintage', 'Collector Item'],
    highlights: [
      '35mm film camera',
      '50mm f/1.8 lens included',
      'Classic design',
    ],
  },
  {
    id: 'prod-12',
    name: 'Midnight Madness Marathon T-Shirt',
    sku: 'TS-MMM-001',
    description:
      'Comfortable cotton t-shirt featuring the Midnight Madness Marathon design. Perfect for runners and sports enthusiasts.',
    price: 1299,
    salePrice: 999,
    rating: 4.5,
    reviews: 78,
    stock: 95,
    category: 'fashion',
    brand: 'Customize_23',
    images: [
      '/images/products/marathon-tshirt.jpg',
      '/images/products/marathon-tshirt-2.jpg',
    ],
    badges: ['New Arrival'],
    highlights: [
      '100% cotton',
      'Comfortable fit',
      'Unique design',
    ],
  },
  {
    id: 'prod-13',
    name: 'Miss Dior Eau de Toilette',
    sku: 'MD-PRF-001',
    description:
      'Elegant floral fragrance from Dior. A feminine and sophisticated scent with notes of rose and jasmine.',
    price: 8999,
    salePrice: 7499,
    rating: 4.8,
    reviews: 456,
    stock: 34,
    category: 'beauty',
    brand: 'Dior',
    images: [
      '/images/products/miss-dior-perfume.jpg',
      '/images/products/miss-dior-perfume-2.jpg',
    ],
    badges: ['Luxury', 'Bestseller'],
    highlights: [
      'Floral fragrance',
      'Elegant packaging',
      'Long-lasting scent',
    ],
  },
  {
    id: 'prod-14',
    name: 'Premium Wireless Headphones',
    sku: 'HP-WL-001',
    description:
      'High-quality wireless headphones with noise cancellation, premium sound, and comfortable over-ear design.',
    price: 7999,
    salePrice: 6499,
    rating: 4.6,
    reviews: 289,
    stock: 52,
    category: 'electronics',
    brand: 'SoundWave',
    images: [
      '/images/products/headphones-yellow.jpg',
      '/images/products/headphones-yellow-2.jpg',
    ],
    badges: ['Wireless', 'Noise Cancelling'],
    highlights: [
      'Active noise cancellation',
      '30-hour battery life',
      'Premium sound quality',
    ],
  },
  {
    id: 'prod-15',
    name: 'Designer Logo T-Shirt',
    sku: 'TS-DLG-001',
    description:
      'Stylish white cotton t-shirt with modern graphic design. Perfect for casual wear and everyday comfort.',
    price: 1499,
    salePrice: 1199,
    rating: 4.4,
    reviews: 156,
    stock: 78,
    category: 'fashion',
    brand: 'Customize_23',
    images: [
      '/images/products/designer-tshirt.jpg',
      '/images/products/designer-tshirt-2.jpg',
    ],
    badges: ['New Arrival'],
    highlights: [
      '100% cotton',
      'Modern design',
      'Comfortable fit',
    ],
  },
];

export const featuredProducts = products.slice(0, 3);

export const formatProductPrice = (product) => {
  if (product.salePrice) {
    return `${formatCurrency(product.salePrice)} (was ${formatCurrency(product.price)})`;
  }
  return formatCurrency(product.price);
};




