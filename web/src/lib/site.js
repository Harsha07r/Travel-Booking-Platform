// Single place for business details. Change them here and they update everywhere.

export const SITE = {
  name: 'Royal Horizon',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.royalhorizon.in').replace(/\/$/, ''),
  tagline: 'Curated journeys through Kashmir, Ladakh and the Himalayas',
  description:
    'Royal Horizon plans Kashmir, Ladakh and pilgrimage tours with comfortable stays, private vehicles and a team that is with you from the first call to the final drop-off.',
  phones: ['+91 9070019992', '+91 7006927991'],
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP || '919103582173').replace(/\D/g, ''),
};

export const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');

export const telHref = (phone) => `tel:${phone.replace(/[^\d+]/g, '')}`;

export const waHref = (text = 'Hello Royal Horizon, I would like to plan a trip.') =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;

export const DESTINATIONS = [
  { name: 'Dal Lake', image: '/images/dal-lake.webp' },
  { name: 'Pahalgam', image: '/images/Pahalgam.webp' },
  { name: 'Gulmarg Gondola', image: '/images/gondola.webp' },
  { name: 'Sonamarg', image: '/images/sonamarg.webp' },
  { name: 'Ladakh', image: '/images/ladakh.webp' },
  { name: 'Vaishno Devi', image: '/images/vaishnodevi.webp' },
];

export const OFFERINGS = [
  { title: 'Group Tours', text: 'Shared journeys with comfortable stays and a friendly, well organised group.' },
  { title: 'Best Hotels', text: 'Hand-picked hotels and houseboats, chosen for comfort and location.' },
  { title: 'Adventures', text: 'Customised adventure experiences that leave lasting memories.' },
  { title: 'Pilgrimage Tours', text: 'Reconnect with your faith and experience divine serenity.' },
  { title: 'Premium Service', text: 'Premium vehicles and professional drivers for comfort, class and confidence.' },
  { title: 'Houseboats', text: 'Riverside charm and valley adventures: the perfect blend of nature.' },
];

export const REVIEWS = [
  { name: 'Harsha Vardhan', role: 'Undergraduate', stars: 5, quote: 'This was our first family vacation after years, and Royal Horizon made it smooth and hassle-free.' },
  { name: 'Geethika Sai', role: 'Architect', stars: 5, quote: "I've traveled with multiple agencies, but Royal Horizon offered the best experience within budget." },
  { name: 'Jayasri', role: 'Home maker', stars: 5, quote: 'We had a last-minute change in our dates, and the Royal Horizon team was super flexible.' },
  { name: 'Ramakrishna', role: 'Business Owner', stars: 4, quote: 'What I loved most was how they customised our trip based on our pace.' },
  { name: 'Lokesh', role: 'Mechanical Engineer', stars: 5, quote: 'From the first call to the final drop-off, Royal Horizon was top-notch.' },
  { name: 'Sashank', role: 'Software Engineer', stars: 5, quote: 'We traveled with elderly parents, and Royal Horizon ensured all comfort.' },
];
