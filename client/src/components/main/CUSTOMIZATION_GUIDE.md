# Quick Customization Reference

## 🎨 Common Customizations

### Change Brand Colors

Replace gradient colors throughout components:

```javascript
// Current Primary Gradient
className="bg-gradient-to-r from-cyan-500 to-blue-500"

// Custom Brand Colors (Example: Purple to Pink)
className="bg-gradient-to-r from-purple-600 to-pink-600"

// Available Tailwind Colors:
- Blue: from-blue-500 to-blue-600
- Purple: from-purple-500 to-purple-600
- Green: from-green-500 to-green-600
- Red: from-red-500 to-red-600
- Orange: from-orange-500 to-orange-600
- Pink: from-pink-500 to-pink-600
```

### Replace Emoji Avatars with Images

In `SuccessStories.jsx`:

```javascript
// Current (Emoji)
image: "👩‍💼",

// Replace with actual image
image: "/images/testimonials/sarah.jpg",

// Then in the component:
<div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center overflow-hidden">
  {typeof testimonial.image === 'string' && testimonial.image.startsWith('/') ? (
    <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
  ) : (
    <span className="text-2xl">{testimonial.image}</span>
  )}
</div>
```

### Add Real Company Logos

In `TrustedBySection.jsx`:

```javascript
const companies = [
  { name: "Stellar Realty", logo: "/logos/stellar.png" },
  { name: "Urban Nest", logo: "/logos/urban.png" },
];

// Update render:
<div className="flex items-center gap-3">
  <img src={company.logo} alt={company.name} className="h-8 w-auto" />
  <p className="text-gray-300 font-semibold">{company.name}</p>
</div>
```

### Modify Statistics

In `PlatformStats.jsx`:

```javascript
// Example: Change to your real numbers
const stats = [
  {
    icon: Building2,
    value: "1,200+",        // Your actual number
    label: "Partner Firms", // Your label
    color: "from-blue-500 to-cyan-500",
  },
];
```

### Update Pricing

In `ServicePackages.jsx`:

```javascript
// Add a new plan
{
  name: "Premium Plus",
  icon: Zap,
  description: "For enterprise-level operations",
  monthlyPrice: 299,
  yearlyPrice: 2990,
  color: "from-indigo-500 to-purple-500",
  features: [
    "Everything in Enterprise",
    "Dedicated Infrastructure",
    "Custom Features Development",
    // ... more features
  ],
  popular: false,
}
```

### Customize CTA Buttons

Global button styles you can reuse:

```javascript
// Primary Button
<button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/60 hover:scale-105">
  Your Text
</button>

// Secondary Button
<button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all duration-300 border border-white/20 hover:border-white/30">
  Your Text
</button>

// Outline Button
<button className="px-6 py-3 border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white font-semibold rounded-lg transition-all duration-300">
  Your Text
</button>
```

### Add New FAQ Items

In `FAQSection.jsx`:

```javascript
{
  question: "Your new question?",
  answer: "Your detailed answer here. Can be multiple sentences with all the details you want to provide to your users."
},
```

### Modify Testimonial Stats

In `SuccessStories.jsx`:

```javascript
stats: {
  label: "Properties Sold",    // Change metric
  value: "350+",               // Change value
},
```

### Change Animation Timing

Global animation settings:

```javascript
// Slow entrance
transition={{ duration: 1.2 }}

// Fast entrance
transition={{ duration: 0.3 }}

// With delay
transition={{ duration: 0.6, delay: 0.2 }}

// Spring animation
transition={{ type: "spring", stiffness: 100 }}
```

## 🔧 Advanced Customizations

### Add Conditional Rendering

```javascript
// Example: Show different content for logged-in users
{user ? (
  <div>Welcome back, {user.name}!</div>
) : (
  <div>Sign up to get started</div>
)}
```

### Integrate with Backend

```javascript
// Example: Fetch real stats from API
const [stats, setStats] = useState([]);

useEffect(() => {
  fetch('/api/platform-stats')
    .then(res => res.json())
    .then(data => setStats(data));
}, []);
```

### Add Click Tracking

```javascript
const handleCTAClick = () => {
  // Analytics tracking
  window.gtag('event', 'cta_click', {
    location: 'hero_section',
    plan: 'professional'
  });
  
  // Your navigation logic
  navigate('/signup');
};
```

### Add Loading States

```javascript
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  // Simulate data fetch
  setTimeout(() => setIsLoading(false), 1000);
}, []);

if (isLoading) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-cyan-500" />
    </div>
  );
}
```

## 📱 Responsive Utilities

### Hide/Show on Different Screens

```javascript
// Hide on mobile, show on desktop
<div className="hidden lg:block">Desktop only content</div>

// Show on mobile, hide on desktop
<div className="lg:hidden">Mobile only content</div>

// Different layouts
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* 1 col mobile, 2 cols tablet, 3 cols desktop */}
</div>
```

### Responsive Text Sizes

```javascript
<h1 className="text-2xl md:text-4xl lg:text-6xl">
  Responsive Heading
</h1>

<p className="text-sm md:text-base lg:text-lg">
  Responsive paragraph
</p>
```

### Responsive Spacing

```javascript
// Padding
<div className="p-4 md:p-6 lg:p-8">Content</div>

// Margin
<div className="mt-4 md:mt-6 lg:mt-8">Content</div>

// Gap in flex/grid
<div className="flex gap-2 md:gap-4 lg:gap-6">Items</div>
```

## 🎯 Performance Tips

### Optimize Images

```javascript
// Use Next.js Image component if available
import Image from 'next/image';

<Image 
  src="/path/to/image.jpg"
  alt="Description"
  width={500}
  height={300}
  loading="lazy"
  quality={85}
/>
```

### Lazy Load Components

```javascript
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

<Suspense fallback={<LoadingSpinner />}>
  <HeavyComponent />
</Suspense>
```

### Memoize Expensive Calculations

```javascript
import { useMemo } from 'react';

const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);
```

## 🌐 SEO Enhancements

### Add Meta Tags

```javascript
import { Helmet } from 'react-helmet';

<Helmet>
  <title>Your Platform - Real Estate Solutions</title>
  <meta name="description" content="Transform your real estate business with our comprehensive platform" />
  <meta property="og:title" content="Your Platform" />
  <meta property="og:description" content="..." />
  <meta property="og:image" content="/og-image.jpg" />
</Helmet>
```

### Semantic HTML

```javascript
// Use semantic tags
<section aria-label="Platform statistics">
  <PlatformStats />
</section>

<article>
  <SuccessStories />
</article>

<nav aria-label="Quick actions">
  <QuickActions />
</nav>
```

## 🎨 Theme Customization

### Create a Theme Context

```javascript
// theme-context.js
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const theme = {
    colors: {
      primary: 'from-cyan-500 to-blue-500',
      secondary: 'from-purple-500 to-pink-500',
      accent: 'from-green-500 to-emerald-500',
    },
    // ... more theme values
  };
  
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
```

### Use Theme Colors

```javascript
import { useContext } from 'react';
import { ThemeContext } from './theme-context';

const Component = () => {
  const theme = useContext(ThemeContext);
  
  return (
    <div className={`bg-gradient-to-r ${theme.colors.primary}`}>
      Content
    </div>
  );
};
```

## 📊 Analytics Integration

### Track Section Views

```javascript
import { useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';

const Component = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (isInView) {
      // Track that user viewed this section
      analytics.track('Section Viewed', {
        section: 'Service Packages'
      });
    }
  }, [isInView]);
  
  return <div ref={ref}>Content</div>;
};
```

---

**Pro Tip**: Always test changes in a development environment before deploying to production!
