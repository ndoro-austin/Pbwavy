'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const NavigationContext = createContext({
  isInitialLoad: true,
  hasNavigated: false,
  markNavigated: () => {},
  isPlaying: false,
  toggleMusic: () => {},
});

export const useNavigation = () => useContext(NavigationContext);

export function NavigationProvider({ children, isPlaying, toggleMusic }: { children: React.ReactNode, isPlaying: boolean, toggleMusic: () => void }) {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [hasNavigated, setHasNavigated] = useState(false);
  const [isFirstMount, setIsFirstMount] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    if (isFirstMount) {
      // Mark the component as mounted
      setIsFirstMount(false);
      
      // Set initial load to false after the preloader would be done
      const timer = setTimeout(() => {
        setIsInitialLoad(false);
        console.log('Initial load complete, transitions enabled');
      }, 2500); // Slightly longer than preloader duration
      
      return () => clearTimeout(timer);
    } else {
      // Any subsequent pathname change means navigation has occurred
      setHasNavigated(true);
      console.log('Navigation detected to:', pathname);
    }
  }, [pathname, isFirstMount]);

  const markNavigated = () => {
    setHasNavigated(true);
    setIsInitialLoad(false);
  };

  return (
    <NavigationContext.Provider value={{ isInitialLoad, hasNavigated, markNavigated, isPlaying, toggleMusic }}>
      {children}
    </NavigationContext.Provider>
  );
}