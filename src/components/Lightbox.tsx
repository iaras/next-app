import React, { useState } from 'react';
import Image from 'next/image';

interface LightboxProps {
  images: Array<{ id: number; src: string; alt: string; width: number; height: number }>;
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ images, currentIndex, onClose, onPrev, onNext }) => {
  const [imageError, setImageError] = useState(false);

  if (currentIndex === -1) return null;

  const currentImage = images[currentIndex];

  const handleImageError = () => {
    console.error('Failed to load image:', currentImage.src);
    setImageError(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative w-full max-w-4xl h-[80vh]">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl z-10"
          aria-label="Close lightbox"
        >
          &times;
        </button>
        <div className="relative w-full h-full">
          {imageError ? (
            <div className="flex items-center justify-center h-full text-white">
              Failed to load image
            </div>
          ) : (
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              layout="fill"
              objectFit="contain"
              onError={handleImageError}
            />
          )}
        </div>
        <div className="absolute inset-x-0 bottom-4 flex justify-center space-x-4">
          <button 
            onClick={onPrev}
            className="bg-white bg-opacity-50 hover:bg-opacity-75 text-black px-4 py-2 rounded"
            disabled={currentIndex === 0}
          >
            Previous
          </button>
          <button 
            onClick={onNext}
            className="bg-white bg-opacity-50 hover:bg-opacity-75 text-black px-4 py-2 rounded"
            disabled={currentIndex === images.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;