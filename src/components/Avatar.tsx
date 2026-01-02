import { useState, useEffect } from 'react';
import { User } from 'lucide-react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

const iconSizes = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
};

export function Avatar({ src, alt = 'User avatar', size = 'md', className = '' }: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error('[Avatar] Image failed to load:', {
      src,
      naturalWidth: e.currentTarget.naturalWidth,
      naturalHeight: e.currentTarget.naturalHeight
    });
    setImageError(true);
  };

  const handleImageLoad = () => {
    console.log('[Avatar] Image loaded successfully:', src);
    setImageLoaded(true);
  };

  const sizeClass = sizeClasses[size];
  const iconSize = iconSizes[size];

  // Log when component receives src prop (only once)
  useEffect(() => {
    if (src && !imageLoaded && !imageError) {
      console.log('[Avatar] Attempting to load image:', src);
    }
  }, [src, imageLoaded, imageError]);

  return (
    <div className={`relative ${sizeClass} ${className}`}>
      {src && !imageError ? (
        <img
          src={src}
          alt={alt}
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          className={`${sizeClass} rounded-full object-cover transition-opacity duration-200 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
      ) : null}
      
      {/* Fallback avatar */}
      <div className={`${sizeClass} bg-gray-300 rounded-full flex items-center justify-center absolute inset-0 ${
        src && !imageError ? (imageLoaded ? 'opacity-0' : 'opacity-100') : 'opacity-100'
      } transition-opacity duration-200`}>
        <User className={`${iconSize} text-gray-600`} />
      </div>
    </div>
  );
}
