import { Product, SearchTrackItem } from './types';

export const mockProducts: Product[] = [
  {
    id: 'sony-wh-1000xm5',
    name: 'Sony WH-1000XM5',
    brand: 'Sony',
    category: 'Electronics',
    rating: 4.8,
    reviewsCount: '3.2k',
    currentPrice: 299.00,
    lowestPrice: 275.00,
    highestPrice: 349.00,
    averagePrice: 315.00,
    description: 'Industry-leading noise cancelling headphones with premium sound quality, hands-free calling, and exceptionally comfortable design.',
    specifications: [
      { label: 'Battery', value: '30h Battery', icon: 'battery_full' },
      { label: 'ANC', value: 'ANC Pro', icon: 'noise_aware' },
      { label: 'Bluetooth', value: 'v5.2', icon: 'bluetooth' },
      { label: 'Weight', value: '250g', icon: 'weight' }
    ],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQsij4ZSEx5E-7dcr5LkoEep85mejKr7gi0fPqSl9f90kOtkW2TC2lHopbtbkebKnIo_c40aftx-FQPLuOFWXrdOWvBx4wgho2IW16m2ipG1qLkZvvS4ZlPxB1T2R7N_YLznEiIgEQfnT2VTPbfSwDjR0HAlCF93g2Pg-acuB3yQGN5h5XhK6RjUpIVBWkljWNPWcsGFnsdJHtuymVf1RpxdBaJIuyKmPUrn-LiQqtxVmVGzogiurwKryfDMpUlVO4dUQAKVSHJe3B',
    trendDirection: 'down',
    trendPercentage: 12,
    bestDealStore: 'Amazon',
    bestDealSavingsPercent: 14,
    bestDealSavingsAmount: 49.00,
    stores: [
      {
        name: 'Amazon',
        price: 299.00,
        inStock: true,
        rating: 4.9,
        reviewsCount: 12500,
        shippingInfo: 'Free Delivery tomorrow',
        badge: 'Lowest Price',
        isLowest: true,
        logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqVEPBI0zbwlKcUqEwFTuEwAFsPooNCvnBctZZphOiDvd-jQYc8eVjIjxvC3JX_vCYfcZdCetKy7FtH47nFIIQav2op6a8k-6YunIBTewHLSAgHOmh-js6_6RRcMo2YmwhHiypWJz9CA006NM4esOClXm3pe6YLKd5lVMOmYfLiLgVAMESxyhXhGKq2aL5w68OrKt9x-q9wppajmja4LkVA7lQfha4Qrn8KeklIoMDSPBbbuwiAmUjYvOXXX_hCczZ201lCcSbjKmH'
      },
      {
        name: 'TechWarehouse',
        price: 341.99,
        inStock: true,
        rating: 4.5,
        reviewsCount: 820,
        shippingInfo: 'Free Shipping',
        badge: 'Best Value'
      },
      {
        name: 'Best Buy',
        price: 348.00,
        inStock: true,
        rating: 4.7,
        reviewsCount: 3100,
        shippingInfo: 'Standard Shipping'
      },
      {
        name: 'B&H Photo',
        price: 349.99,
        inStock: true,
        rating: 4.8,
        reviewsCount: 5200,
        shippingInfo: 'Free Shipping'
      },
      {
        name: 'Walmart',
        price: 329.00,
        inStock: true,
        rating: 4.4,
        reviewsCount: 1800,
        shippingInfo: 'Pick up today',
        badge: 'Limited Stock'
      }
    ],
    priceHistory7d: [
      { date: 'Oct 01', price: 348 },
      { date: 'Oct 05', price: 345 },
      { date: 'Oct 10', price: 335 },
      { date: 'Oct 15', price: 348 },
      { date: 'Oct 20', price: 348 },
      { date: 'Oct 24', price: 299 },
      { date: 'Today', price: 299 }
    ],
    priceHistory30d: [
      { date: '30 days ago', price: 359 },
      { date: '25 days ago', price: 348 },
      { date: '20 days ago', price: 348 },
      { date: '15 days ago', price: 348 },
      { date: '10 days ago', price: 335 },
      { date: '5 days ago', price: 329 },
      { date: 'Today', price: 299 }
    ],
    priceHistory1y: [
      { date: 'Jan', price: 379 },
      { date: 'Mar', price: 369 },
      { date: 'May', price: 359 },
      { date: 'Jul', price: 348 },
      { date: 'Sep', price: 348 },
      { date: 'Nov', price: 315 },
      { date: 'Today', price: 299 }
    ],
    recentEvents: [
      { date: 'Oct 24', type: 'drop', title: 'Price dropped by $50 at Amazon', subtitle: 'Amazon lowered their price by 14% to $299.00.' },
      { date: 'Oct 20', type: 'stable', title: 'Price stable at Best Buy', subtitle: 'Maintained current retail price at $348.00.' },
      { date: 'Oct 15', type: 'increase', title: 'Price increased by $12 at Walmart', subtitle: 'Walmart bumped up the price slightly due to temporary high demand.' }
    ]
  },
  {
    id: 'iphone-15-pro',
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    category: 'Electronics',
    rating: 4.8,
    reviewsCount: '2.4k',
    currentPrice: 989.00,
    lowestPrice: 950.00,
    highestPrice: 1049.00,
    averagePrice: 999.00,
    description: 'Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever.',
    specifications: [
      { label: 'Chip', value: 'A17 Pro Chip', icon: 'developer_board' },
      { label: 'Camera', value: '48MP Main', icon: 'photo_camera' },
      { label: 'Display', value: 'ProMotion 120Hz', icon: 'smartphone' },
      { label: 'Weight', value: '187g', icon: 'weight' }
    ],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpCqCwlUls0yM2rhMeqCVu8W2At5jma0KGBccOP6IQYdCBclYuT9uiQyD3JC7-2klP7c-QAUqFViILJn6_bY8K2qVnAovE66lo4ah-SE9nH6hvzZOI711rMs9lOpCNQuvADyavOOWo1mW3vLRHN9fshRyyQYOVHV9M8aR9yT02iISsSknZuHlC_jAQzXbD0iMujMxh--R6ymPQYVXeUTCO2qvIvaf7Ldwu0_VYNcCrdN9kz8e8ENqPRrHYKBMRYWtlkqXLgRwSDx6E',
    trendDirection: 'down',
    trendPercentage: 5,
    bestDealStore: 'Walmart',
    bestDealSavingsPercent: 12,
    bestDealSavingsAmount: 110.00,
    stores: [
      {
        name: 'Walmart',
        price: 989.00,
        inStock: true,
        rating: 4.6,
        reviewsCount: 1200,
        shippingInfo: 'Lowest tracked price in 30 days',
        badge: 'Lowest Price',
        isLowest: true,
        logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_H29ytp_wvwkgF1dtup0To10GWUXQUH9EBc2jZ4LyqG55XV6xfo4_2dp1VyGKDHwFHjE6AIgoOk5B5L-NJFi_P-v53JY-2xL7iUuTw-tnKPLZj-q9eSPpd7Zof9s7CZbcbuEsrh7fy4qn1Iy83LWhSUdkamRTFYke1JEuoAgyM1P2baKff2Uyu5DA9Q52EBz3bCAup7b1iltGo86mSE8cUlyt2Ql1nUjwZmdzShZS6Qf7EPeUaEQUHD9irT7XuSU93VtjgTAzkTjK'
      },
      {
        name: 'Amazon',
        price: 999.00,
        inStock: true,
        rating: 4.8,
        reviewsCount: 4500,
        shippingInfo: 'Free delivery tomorrow'
      },
      {
        name: 'Best Buy',
        price: 1049.00,
        inStock: true,
        rating: 4.7,
        reviewsCount: 2200,
        shippingInfo: 'Standard shipping'
      },
      {
        name: 'eBay',
        price: 950.00,
        inStock: true,
        rating: 4.2,
        reviewsCount: 140,
        shippingInfo: 'Used • Good Condition'
      }
    ],
    priceHistory7d: [
      { date: 'Oct 01', price: 1049 },
      { date: 'Oct 05', price: 1029 },
      { date: 'Oct 10', price: 1019 },
      { date: 'Oct 15', price: 999 },
      { date: 'Oct 20', price: 999 },
      { date: 'Oct 24', price: 989 },
      { date: 'Today', price: 989 }
    ],
    priceHistory30d: [
      { date: '30 days ago', price: 1049 },
      { date: '25 days ago', price: 1049 },
      { date: '20 days ago', price: 1049 },
      { date: '15 days ago', price: 1019 },
      { date: '10 days ago', price: 999 },
      { date: '5 days ago', price: 999 },
      { date: 'Today', price: 989 }
    ],
    priceHistory1y: [
      { date: 'Jan', price: 1099 },
      { date: 'Mar', price: 1099 },
      { date: 'May', price: 1049 },
      { date: 'Jul', price: 1049 },
      { date: 'Sep', price: 1049 },
      { date: 'Nov', price: 999 },
      { date: 'Today', price: 989 }
    ],
    recentEvents: [
      { date: 'Oct 24', type: 'drop', title: 'Price dropped by $10 at Walmart', subtitle: 'Walmart set custom record promotion price.' },
      { date: 'Oct 15', type: 'drop', title: 'Amazon drops to $999', subtitle: 'Amazon matched the general carrier discount.' }
    ]
  },
  {
    id: 'ipad-pro-12-9',
    name: 'iPad Pro 12.9"',
    brand: 'Apple',
    category: 'Electronics',
    rating: 4.9,
    reviewsCount: '1.8k',
    currentPrice: 1099.00,
    lowestPrice: 1049.00,
    highestPrice: 1199.00,
    averagePrice: 1129.00,
    description: 'Astonishing performance. Incredibly advanced displays. Superfast wireless connectivity. Mind-bending capabilities with Apple Pencil.',
    specifications: [
      { label: 'Processor', value: 'M2 Apple Silicon', icon: 'developer_board' },
      { label: 'Display', value: 'Liquid Retina XDR', icon: 'tablet_mac' },
      { label: 'Camera', value: 'Pro Cameras & LiDAR', icon: 'photo_camera' },
      { label: 'Storage', value: 'Starts at 128GB', icon: 'sd_card' }
    ],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnUDzW4611zF3x9SSTO-XpgrAN6u-3fn9Lh4Ye7Lf8SZj_nsN3cjGnXBb6P9aNXyCC5rPccJ9DHT5msYqIaUwAqZbBtvCCeNm0jKswoA0jXuYOJ8oWpftVnhvnwquGWBz74qgl--RUX3SxiyokKABqCtM_YwNCX-tYymYWZPhtq9CIJVKFm-iPWQmp4naqISxXgGFsDzQnmpzJ30euw4R1t_qpuF-5UdFWxDc6131LS4Y56Z7WKK7_HoxWgJlruJaxXjO0RzsbJuI5',
    trendDirection: 'stable',
    trendPercentage: 0,
    bestDealStore: 'Apple Store',
    bestDealSavingsPercent: 3,
    bestDealSavingsAmount: 30.00,
    stores: [
      {
        name: 'Apple',
        price: 1099.00,
        inStock: true,
        rating: 4.9,
        reviewsCount: 3000,
        shippingInfo: 'Official warranty included',
        badge: 'Official Store',
        isLowest: false
      },
      {
        name: 'Amazon',
        price: 1079.00,
        inStock: true,
        rating: 4.8,
        reviewsCount: 1400,
        shippingInfo: 'Free shipping tomorrow',
        badge: 'Lowest Price',
        isLowest: true
      },
      {
        name: 'Best Buy',
        price: 1129.00,
        inStock: true,
        rating: 4.7,
        reviewsCount: 890,
        shippingInfo: 'Standard shipping'
      }
    ],
    priceHistory7d: [
      { date: 'Oct 01', price: 1129 },
      { date: 'Oct 05', price: 1129 },
      { date: 'Oct 10', price: 1099 },
      { date: 'Oct 15', price: 1099 },
      { date: 'Oct 20', price: 1099 },
      { date: 'Oct 24', price: 1099 },
      { date: 'Today', price: 1099 }
    ],
    priceHistory30d: [
      { date: '30 days ago', price: 1149 },
      { date: '25 days ago', price: 1129 },
      { date: '20 days ago', price: 1129 },
      { date: '15 days ago', price: 1129 },
      { date: '10 days ago', price: 1099 },
      { date: '5 days ago', price: 1099 },
      { date: 'Today', price: 1099 }
    ],
    priceHistory1y: [
      { date: 'Jan', price: 1199 },
      { date: 'Mar', price: 1199 },
      { date: 'May', price: 1149 },
      { date: 'Jul', price: 1129 },
      { date: 'Sep', price: 1129 },
      { date: 'Nov', price: 1099 },
      { date: 'Today', price: 1099 }
    ],
    recentEvents: [
      { date: 'Oct 10', type: 'drop', title: 'Generational Price Drop by Apple', subtitle: 'Apple Store updated MSRP to $1099.' }
    ]
  },
  {
    id: 'macbook-air-m3',
    name: 'MacBook Air M3',
    brand: 'Apple',
    category: 'Electronics',
    rating: 4.9,
    reviewsCount: '1.4k',
    currentPrice: 949.00,
    lowestPrice: 899.00,
    highestPrice: 1099.00,
    averagePrice: 999.00,
    description: 'Incredibly thin and fast MacBook Air with M3 chip. Built for both work and play, with up to 18 hours of battery life.',
    specifications: [
      { label: 'Chip', value: 'Apple M3 Chip', icon: 'developer_board' },
      { label: 'Battery', value: '18h Battery', icon: 'battery_full' },
      { label: 'Design', value: 'Sleek Aluminum', icon: 'laptop' },
      { label: 'Display', value: 'Liquid Retina', icon: 'desktop_windows' }
    ],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0Ld8zbRU5IjZch_9Ixt21qFS1blv6WU58Izjsx75ZM2Mfc_X4gNR8zajCzze6UuZ9ds7XkwBjVE5YuyAi31B1gxAJLBSXSDW9XUroLi9O3Tv9xaG6wUk_H4haYOJ_9gmpKef3fzGB1J2MEUM57rGTSGEATKofUEa256b9OFjo1EjtdKarsluFhrer6pJVdyDr68C3beLEh9dLOcTsABX81uEGLImq-7egrwLMCnsXw9tHRo_lfreAoqfI0iYZohkEww4gmLR5tVdr',
    trendDirection: 'down',
    trendPercentage: 15,
    bestDealStore: 'TechWarehouse',
    bestDealSavingsPercent: 15,
    bestDealSavingsAmount: 150.00,
    stores: [
      {
        name: 'TechWarehouse',
        price: 949.00,
        inStock: true,
        rating: 4.6,
        reviewsCount: 420,
        shippingInfo: 'Free Shipping',
        badge: 'Best Value',
        isLowest: true
      },
      {
        name: 'Amazon',
        price: 979.00,
        inStock: true,
        rating: 4.8,
        reviewsCount: 3100,
        shippingInfo: 'Prime next-day delivery'
      },
      {
        name: 'Best Buy',
        price: 999.00,
        inStock: true,
        rating: 4.7,
        reviewsCount: 1500,
        shippingInfo: 'Standard shipping'
      }
    ],
    priceHistory7d: [
      { date: 'Oct 01', price: 1049 },
      { date: 'Oct 05', price: 1019 },
      { date: 'Oct 10', price: 999 },
      { date: 'Oct 15', price: 989 },
      { date: 'Oct 20', price: 979 },
      { date: 'Oct 24', price: 949 },
      { date: 'Today', price: 949 }
    ],
    priceHistory30d: [
      { date: '30 days ago', price: 1099 },
      { date: '25 days ago', price: 1089 },
      { date: '20 days ago', price: 1049 },
      { date: '15 days ago', price: 999 },
      { date: '10 days ago', price: 979 },
      { date: '5 days ago', price: 949 },
      { date: 'Today', price: 949 }
    ],
    priceHistory1y: [
      { date: 'Jan', price: 1099 },
      { date: 'Mar', price: 1099 },
      { date: 'May', price: 1049 },
      { date: 'Jul', price: 1049 },
      { date: 'Sep', price: 999 },
      { date: 'Nov', price: 949 },
      { date: 'Today', price: 949 }
    ],
    recentEvents: [
      { date: 'Oct 24', type: 'drop', title: 'Price cut to $949 at TechWarehouse', subtitle: 'TechWarehouse dropped brand-new MacBook stock.' },
      { date: 'Oct 10', type: 'drop', title: 'Major Price Decline', subtitle: 'Average market price shifted down into sub-$1000 range.' }
    ]
  },
  {
    id: 'playstation-5-slim',
    name: 'PlayStation 5 Slim',
    brand: 'Sony',
    category: 'Electronics',
    rating: 4.8,
    reviewsCount: '2.1k',
    currentPrice: 449.00,
    lowestPrice: 429.00,
    highestPrice: 499.00,
    averagePrice: 469.00,
    description: 'Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with support for haptic feedback, adaptive triggers and 3D Audio.',
    specifications: [
      { label: 'Storage', value: '1TB Custom SSD', icon: 'sd_card' },
      { label: 'Processor', value: 'AMD Zen 2 Engine', icon: 'developer_board' },
      { label: 'Output', value: '4K 120Hz Support', icon: 'tv' },
      { label: 'Optical', value: 'Ultra HD Blu-ray', icon: 'album' }
    ],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAH-LCGaxnR5PsHI7koII9tDFIIYTqTL8fPk2GZvTs_O1cJxG7R5iYNQJ3U5mvVcUW7SpXg-gNqBMMCO6q7k1crKZjg5kUKuSRwu9GZo7U16eyxhoGqfgPFfa4ZZbyxZqTyuBMXbfumHuWqt9m2D1105B0KlKWNkQoYce3EE4DPUr7tSKhnaSJv6xW7jAd_vtPtkWSkushbahOIFzO5ZXRIXOJUBPfeDGDO0gJZSIHMm2ZVRla_JC-lsFezAd5X7M13KOLjeA0lT98c',
    trendDirection: 'down',
    trendPercentage: 5,
    bestDealStore: 'Amazon',
    bestDealSavingsPercent: 5,
    bestDealSavingsAmount: 20.00,
    stores: [
      {
        name: 'Amazon',
        price: 449.00,
        inStock: true,
        rating: 4.8,
        reviewsCount: 6500,
        shippingInfo: 'Prime Free Delivery',
        badge: 'Best Deal',
        isLowest: true
      },
      {
        name: 'Best Buy',
        price: 459.00,
        inStock: true,
        rating: 4.7,
        reviewsCount: 3400,
        shippingInfo: 'Store pick up ready'
      },
      {
        name: 'Walmart',
        price: 469.00,
        inStock: true,
        rating: 4.5,
        reviewsCount: 2000,
        shippingInfo: 'Standard shipping'
      }
    ],
    priceHistory7d: [
      { date: 'Oct 01', price: 499 },
      { date: 'Oct 05', price: 479 },
      { date: 'Oct 10', price: 459 },
      { date: 'Oct 15', price: 459 },
      { date: 'Oct 20', price: 449 },
      { date: 'Oct 24', price: 449 },
      { date: 'Today', price: 449 }
    ],
    priceHistory30d: [
      { date: '30 days ago', price: 499 },
      { date: '25 days ago', price: 499 },
      { date: '20 days ago', price: 479 },
      { date: '15 days ago', price: 459 },
      { date: '10 days ago', price: 459 },
      { date: '5 days ago', price: 449 },
      { date: 'Today', price: 449 }
    ],
    priceHistory1y: [
      { date: 'Jan', price: 499 },
      { date: 'Mar', price: 499 },
      { date: 'May', price: 499 },
      { date: 'Jul', price: 479 },
      { date: 'Sep', price: 459 },
      { date: 'Nov', price: 449 },
      { date: 'Today', price: 449 }
    ],
    recentEvents: [
      { date: 'Oct 20', type: 'drop', title: 'Price drop at Amazon', subtitle: 'Amazon lowered pricing for PS5 Slim models.' }
    ]
  },
  {
    id: 'nike-air-max',
    name: 'Nike Air Max',
    brand: 'Nike',
    category: 'Footwear',
    rating: 4.7,
    reviewsCount: '1.2k',
    currentPrice: 112.00,
    lowestPrice: 89.00,
    highestPrice: 140.00,
    averagePrice: 125.00,
    description: 'A revolutionary cushioning technology that keeps your feet energized. Striking crimson red design for running and casual street style.',
    specifications: [
      { label: 'Type', value: 'Running Shoe', icon: 'directions_run' },
      { label: 'Upper', value: 'Breathable Mesh', icon: 'air' },
      { label: 'Cushioning', value: 'Visible Air Sole', icon: 'bubble_chart' },
      { label: 'Color', value: 'Crimson Red', icon: 'palette' }
    ],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMpwfFsT0-S6P06YUxontzkv6ETCjYTYk0_hw7wcO5TrpKQ1HRqAIC9hx5gdXVlW712gN_J4cb3BY7T30YLsrHy4k1xaFOkiQnHMnPpFCiOGJ80Jzq4Wlg18kBeoRIlzlgKxcvm1rpFQIM3UE8sin5QvqaDxo0m9v_mNpkqWeF0GUosi9LEbWAjYoHhYJAexqd0Pbv0ZAABcnVFItYMslUXf2qBdvh2t0yDQEXsX2iqiPYdLhayT_YED9tqk3LqcLNHp_D9f080Fw6',
    trendDirection: 'down',
    trendPercentage: 40,
    bestDealStore: 'FootLocker',
    bestDealSavingsPercent: 40,
    bestDealSavingsAmount: 48.00,
    stores: [
      {
        name: 'Nike Store',
        price: 130.00,
        inStock: true,
        rating: 4.8,
        reviewsCount: 4200,
        shippingInfo: 'Official Nike Member shipping'
      },
      {
        name: 'Amazon',
        price: 112.00,
        inStock: true,
        rating: 4.5,
        reviewsCount: 890,
        shippingInfo: 'Free shipping with Prime',
        badge: 'Best Value',
        isLowest: true
      },
      {
        name: 'Foot Locker',
        price: 115.00,
        inStock: true,
        rating: 4.4,
        reviewsCount: 300,
        shippingInfo: 'Fast delivery'
      }
    ],
    priceHistory7d: [
      { date: 'Oct 01', price: 140 },
      { date: 'Oct 05', price: 130 },
      { date: 'Oct 10', price: 130 },
      { date: 'Oct 15', price: 120 },
      { date: 'Oct 20', price: 112 },
      { date: 'Oct 24', price: 112 },
      { date: 'Today', price: 112 }
    ],
    priceHistory30d: [
      { date: '30 days ago', price: 149 },
      { date: '25 days ago', price: 140 },
      { date: '20 days ago', price: 140 },
      { date: '15 days ago', price: 130 },
      { date: '10 days ago', price: 120 },
      { date: '5 days ago', price: 112 },
      { date: 'Today', price: 112 }
    ],
    priceHistory1y: [
      { date: 'Jan', price: 149 },
      { date: 'Mar', price: 149 },
      { date: 'May', price: 139 },
      { date: 'Jul', price: 129 },
      { date: 'Sep', price: 125 },
      { date: 'Nov', price: 112 },
      { date: 'Today', price: 112 }
    ],
    recentEvents: [
      { date: 'Oct 20', type: 'drop', title: 'Autumn clearance price drop', subtitle: 'Nike athletic stock price slashed at Amazon.' }
    ]
  },
  {
    id: 'smart-watch-v3',
    name: 'Smart Watch V3',
    brand: 'Fossil',
    category: 'Electronics',
    rating: 4.6,
    reviewsCount: '1.1k',
    currentPrice: 199.00,
    lowestPrice: 175.00,
    highestPrice: 249.00,
    averagePrice: 215.00,
    description: 'Classic analog watch aesthetics fused with modern smart activity tracking, dynamic telemetry heart monitoring, and durable waterproof construction.',
    specifications: [
      { label: 'OS', value: 'Wear OS Smart', icon: 'watch' },
      { label: 'Telemetry', value: 'Teal Pulse Track', icon: 'favorite' },
      { label: 'Charging', value: 'Wireless Fast', icon: 'power' },
      { label: 'Resistance', value: 'IP68 Waterproof', icon: 'water' }
    ],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0PqNQNS_V6gMfz9qM7oCAmtKKoIvWNi15YmdRy3Z83rWMn7kW1iVbAHMa_Gcu2f9sI7r0sTnp4u_iO4syGCtbKgzXokkMvQzqNxeV6cy7yG6HT9vXHmSylX7nPzBooZTt0pB9t8nhK59aE_F6RkSdrqf8i1w6BXx2ygD75al91MZDJlOtdDfbA-225PJe0Wfcvud5WvxaE_7D63mTTa8CEUcN5RPtvyoOXl5bCUql23wN1FFMN7ZyPtKbboENBpbeGyKL8EaVBPRe',
    trendDirection: 'down',
    trendPercentage: 28,
    bestDealStore: 'Best Buy',
    bestDealSavingsPercent: 28,
    bestDealSavingsAmount: 50.00,
    stores: [
      {
        name: 'Best Buy',
        price: 199.00,
        inStock: true,
        rating: 4.6,
        reviewsCount: 890,
        shippingInfo: 'Ships in 1 business day',
        badge: 'Best Price',
        isLowest: true
      },
      {
        name: 'Amazon',
        price: 215.00,
        inStock: true,
        rating: 4.7,
        reviewsCount: 1200,
        shippingInfo: 'Free prime delivery'
      }
    ],
    priceHistory7d: [
      { date: 'Oct 01', price: 249 },
      { date: 'Oct 05', price: 229 },
      { date: 'Oct 10', price: 229 },
      { date: 'Oct 15', price: 215 },
      { date: 'Oct 20', price: 199 },
      { date: 'Oct 24', price: 199 },
      { date: 'Today', price: 199 }
    ],
    priceHistory30d: [
      { date: '30 days ago', price: 249 },
      { date: '25 days ago', price: 249 },
      { date: '20 days ago', price: 249 },
      { date: '15 days ago', price: 229 },
      { date: '10 days ago', price: 215 },
      { date: '5 days ago', price: 199 },
      { date: 'Today', price: 199 }
    ],
    priceHistory1y: [
      { date: 'Jan', price: 279 },
      { date: 'Mar', price: 269 },
      { date: 'May', price: 249 },
      { date: 'Jul', price: 249 },
      { date: 'Sep', price: 219 },
      { date: 'Nov', price: 199 },
      { date: 'Today', price: 199 }
    ],
    recentEvents: [
      { date: 'Oct 20', type: 'drop', title: 'Holiday promo activated', subtitle: 'Smart Watch V3 slashed ahead of seasonal shifts.' }
    ]
  },
  {
    id: 'iphone-14',
    name: 'iPhone 14',
    brand: 'Apple',
    category: 'Electronics',
    rating: 4.7,
    reviewsCount: '5.1k',
    currentPrice: 699.00,
    lowestPrice: 649.00,
    highestPrice: 799.00,
    averagePrice: 729.00,
    description: 'An impressive dual-camera system capture gorgeous photos in low and bright light, Crash Detection, and a long battery life.',
    specifications: [
      { label: 'Chip', value: 'A15 Bionic', icon: 'developer_board' },
      { label: 'Color', value: 'Sleek Purple', icon: 'palette' },
      { label: 'Camera', value: 'Dual 12MP System', icon: 'photo_camera' }
    ],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFqYKSlxz4jC1duMw0WDWBv47NESBiLFt286vrEEP7CgBZHmoFVTVgmpN09pqUJhXeISluC9KdhsexXC-ZH3ixy1fdmD9fhwoVA7zipOBnL2gEpBxnxDMO85Y6HW80aJojluIwHmESXdDN8wLcRnxwxcIb_wA6fHg8CUin3vEy-STfNIwrtg1sq3U14yjPP0oO69aOPAFg-OzodCYFlY4GtM3RVxFTkmv1_V9qbk7mFaJeYiEdLch1R9NjwAeuN27L2NJj7EXyMHg1',
    trendDirection: 'down',
    trendPercentage: 12,
    bestDealStore: 'Walmart',
    bestDealSavingsPercent: 12,
    bestDealSavingsAmount: 100.00,
    stores: [
      {
        name: 'Walmart',
        price: 699.00,
        inStock: true,
        rating: 4.5,
        reviewsCount: 1400,
        shippingInfo: 'Lowest premium marketplace price',
        badge: 'Best Deal',
        isLowest: true
      }
    ],
    priceHistory7d: [{ date: 'Oct 01', price: 799 }, { date: 'Today', price: 699 }],
    priceHistory30d: [{ date: '30 days ago', price: 799 }, { date: 'Today', price: 699 }],
    priceHistory1y: [{ date: 'Jan', price: 849 }, { date: 'Today', price: 699 }],
    recentEvents: []
  },
  {
    id: 'galaxy-s23',
    name: 'Galaxy S23',
    brand: 'Samsung',
    category: 'Electronics',
    rating: 4.8,
    reviewsCount: '3.4k',
    currentPrice: 799.00,
    lowestPrice: 749.00,
    highestPrice: 899.00,
    averagePrice: 829.00,
    description: 'Capture detailed night shots with Nightography, game on with high processors, and feel comfortable with the durable design.',
    specifications: [
      { label: 'Chip', value: 'Snapdragon 8 Gen 2', icon: 'developer_board' },
      { label: 'Display', value: 'Dynamic AMOLED 2X', icon: 'smartphone' },
      { label: 'Camera', value: '50MP Telephoto Opt', icon: 'photo_camera' }
    ],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiD5eFLuXl6L5fE_ELnHd9S1o0gqPcGxkUsqogttF99rmEsgzPe-7h8lAaZRYPiL68SqDWNAuWiUvYH642-mjlFKJURU1FpKibV3vQ7P4VXUygBl8AK6wy3lY2y4W35ZsWsX0OjN7liCUaQAS9TOZGp9fmOUBC8EvZW2tU2zf98brUaAQToSF2lFPpmANZfFeFvsCxTf8s5HmyjrJrvgMdRDa3ym9RCDoMWIRw3ler8JJuP3b60iTHK6_30qZ7bMe0vKnLQ7MEgzwA',
    trendDirection: 'down',
    trendPercentage: 11,
    bestDealStore: 'Amazon',
    bestDealSavingsPercent: 11,
    bestDealSavingsAmount: 100.00,
    stores: [
      {
        name: 'Amazon',
        price: 799.00,
        inStock: true,
        rating: 4.7,
        reviewsCount: 1800,
        shippingInfo: 'Free prime shipping option',
        badge: 'Best Deal',
        isLowest: true
      }
    ],
    priceHistory7d: [{ date: 'Oct 01', price: 899 }, { date: 'Today', price: 799 }],
    priceHistory30d: [{ date: '30 days ago', price: 899 }, { date: 'Today', price: 799 }],
    priceHistory1y: [{ date: 'Jan', price: 899 }, { date: 'Today', price: 799 }],
    recentEvents: []
  },
  {
    id: 'pixel-8',
    name: 'Pixel 8',
    brand: 'Google',
    category: 'Electronics',
    rating: 4.7,
    reviewsCount: '1.9k',
    currentPrice: 649.00,
    lowestPrice: 599.00,
    highestPrice: 699.00,
    averagePrice: 669.00,
    description: 'The helpful phone engineered by Google. Powered by Google Tensor G3, it’s fast and secure, with advanced photo and video editing.',
    specifications: [
      { label: 'Chip', value: 'Google Tensor G3', icon: 'developer_board' },
      { label: 'Camera', value: 'Best-in-class AI Cam', icon: 'photo_camera' }
    ],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB64ze-pFKC1DkBWZtHSKZIq_XcUhYqgzUj7rSRMLpzvqN8I5mg29J0W89NicrIFTx3I_hiBVNlaaWr4cauY9zkqFH9D5cYNGQfKEbh50gK46JqzPjiJ2pKpTYbNk2JqMvWpKYMil8dLWsgoCHGxS1d2mDBlhbLK6VRiG2dnJyJh9t6udEkp02dvByX06dho5oKn6NUmJAXhbkppMyitWxpi6jhDLEGU1fQfSy7g3i68a3iMm93hcQZW_oSLNC09a2tvyqarZYnqFv_',
    trendDirection: 'down',
    trendPercentage: 7,
    bestDealStore: 'Amazon',
    bestDealSavingsPercent: 7,
    bestDealSavingsAmount: 50.00,
    stores: [
      {
        name: 'Amazon',
        price: 649.00,
        inStock: true,
        rating: 4.7,
        reviewsCount: 1500,
        shippingInfo: 'Fast delivery tomorrow',
        badge: 'Lowest Price',
        isLowest: true
      }
    ],
    priceHistory7d: [{ date: 'Oct 01', price: 699 }, { date: 'Today', price: 649 }],
    priceHistory30d: [{ date: '30 days ago', price: 699 }, { date: 'Today', price: 649 }],
    priceHistory1y: [{ date: 'Jan', price: 749 }, { date: 'Today', price: 649 }],
    recentEvents: []
  }
];

export const initialSearchHistory: SearchTrackItem[] = [
  {
    id: 'track-1',
    productId: 'sony-wh-1000xm5',
    productName: 'Sony WH-1000XM5',
    brand: 'Sony',
    price: 299.00,
    store: 'Amazon',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQsij4ZSEx5E-7dcr5LkoEep85mejKr7gi0fPqSl9f90kOtkW2TC2lHopbtbkebKnIo_c40aftx-FQPLuOFWXrdOWvBx4wgho2IW16m2ipG1qLkZvvS4ZlPxB1T2R7N_YLznEiIgEQfnT2VTPbfSwDjR0HAlCF93g2Pg-acuB3yQGN5h5XhK6RjUpIVBWkljWNPWcsGFnsdJHtuymVf1RpxdBaJIuyKmPUrn-LiQqtxVmVGzogiurwKryfDMpUlVO4dUQAKVSHJe3B',
    timestamp: '15m ago',
    trendType: 'down',
    changeAmount: '-$80'
  }
];
export const mockHistoryTimeline = [
  {
    id: 'timeline-1',
    productId: 'sony-wh-1000xm5',
    productName: 'AirPods Pro Max', // Matching historical representation of name in search history slide
    brand: 'Apple',
    price: 549.00,
    timestamp: 'Today, 2:40 PM',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTghGG1F1mhWcnO37IH7H7wnDNrvEubhY7UuCeYzbBCrsItamG965u9k7rhgZFlLk6iitOAkDg-bFc0BjBRhmZaRmhxQbgF6oPFDawPJaUMOdgcgX2aQj05RhPTfbL-zLwtM_grziWZuAAzlPxaonQA4Rta8Pa9UQZFaPennrPgYX6rG4lIEMTktywj1DNDvGmoI1o7gxNvGSi7B1WJQbaN1GsLGDlvW9tnvBzJRvm92LSUO42Oj5sB8bFkESgOhw3nh0enYEbv4GV',
    trendType: 'down',
    highlighted: true
  },
  {
    id: 'timeline-2',
    productId: 'galaxy-s23',
    productName: 'Samsung 32" Monitor',
    brand: 'Samsung',
    price: 299.99,
    timestamp: 'Yesterday, 9:15 AM',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAssmes-7rAqGnwXSZjR_1Q2jHnthBMTsc0TigwCXHU4jvK17QuQg8Mp157MoHlYk4BLMERZdVticGj6aYoRDZVHc1k-O93H6pu132z9jBmpvAUxp6q_0K_4EVtuJRF047Im9HKcWtbpnf9hunrWy3sa6b4qUMMcxTogebutCMXlwHy9u_ZJqtHOUI6BpYiknePlG7zwaZ0AAf8CXVZ4lBC3V5R8jwtZ0EpXM1oX8L2gfRmC33TwP-A66WJYWrmQsWBAz8xdGs8CgI8',
    trendType: 'stable'
  },
  {
    id: 'timeline-3',
    productId: 'sony-wh-1000xm5',
    productName: 'Fujifilm X-T5',
    brand: 'Fujifilm',
    price: 1699.00,
    timestamp: 'Oct 24, 6:30 PM',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_u6sxLRvsmQkP6pFQxv4sg4w5BsiqWeYhp3ffgQWs2raeFqBCIiF2dOjGBh_84alZ7s1O27AtXqDyE2gR75XPBZlcKRIku1eGp7t_k7fl2oA5FWUcwPwlFT5ZDoqgEhD2kjNanvMGUJ2Y2JKivSny6cOfJasU15f_hzmxQQzclMrKzsNeSOxRNpqL8uZxeaC497sC3fgrxlRD6PV8cB6BOPOvsaAeJFdZLBPPFtoHJKXgrWEa_fllk01zR_dDlO9ga9k9KnANEPhx',
    trendType: 'up'
  }
];
