'use client';
import { usePathname } from 'next/navigation';

// Define background colors for different routes
const pageBackgrounds = {
  "/": "#0a0a0a",        // Home - dark
  "/home": "#0a0a0a",    // Home - dark
  "/work": "#2c2c2c",    // Work - dark gray
  "/about": "#BCF366",   // About - green (from the reference)
  "/contact": "#ff6b6b"  // Contact - red/coral
};

export default function PageWrapper({ children }) {
  const pathname = usePathname();
  const backgroundColor = pageBackgrounds[pathname] || "#0a0a0a";
  
  return (
    <div style={{ backgroundColor, minHeight: '100vh' }}>
      {children}
    </div>
  );
}