import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Lightbox from './Lightbox';
import Filter from './Filter';
import { getImagesFromS3, S3Image } from '../utils/s3Utils';

interface ImageData {
  id: number;
  src: string;
  alt: string;
  width: number;
  height: number;
  category: string;
  tags: string[];
}

const Gallery: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [filteredImages, setFilteredImages] = useState<ImageData[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchImages() {
      const s3Images = await getImagesFromS3();
      const formattedImages: ImageData[] = s3Images.map((img, index) => ({
        id: index,
        src: img.url,
        alt: `Image ${index + 1}`,
        width: 800,
        height: 600,
        category: img.category || 'uncategorized',
        tags: img.tags || [],
      }));
      setImages(formattedImages);
      setFilteredImages(formattedImages);
    }
    fetchImages();
  }, []);

  useEffect(() => {
    const resizeAllGridItems = () => {
      const allItems = document.getElementsByClassName("masonry-grid-item");
      for (let x = 0; x < allItems.length; x++) {
        resizeGridItem(allItems[x] as HTMLElement);
      }
    };

    const resizeGridItem = (item: HTMLElement) => {
      const grid = gridRef.current;
      const rowHeight = parseInt(window.getComputedStyle(grid!).getPropertyValue('grid-auto-rows'));
      const rowGap = parseInt(window.getComputedStyle(grid!).getPropertyValue('grid-row-gap'));
      const rowSpan = Math.ceil((item.querySelector('.image-container')!.getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
      item.style.gridRowEnd = `span ${rowSpan}`;
    };

    resizeAllGridItems();
    window.addEventListener('resize', resizeAllGridItems);

    return () => {
      window.removeEventListener('resize', resizeAllGridItems);
    };
  }, [filteredImages]);

  useEffect(() => {
    filterImages();
  }, [selectedCategory, selectedTags, images]);

  const filterImages = () => {
    let filtered = images;
    if (selectedCategory) {
      filtered = filtered.filter(img => img.category === selectedCategory);
    }
    if (selectedTags.length > 0) {
      filtered = filtered.filter(img => selectedTags.every(tag => img.tags.includes(tag)));
    }
    setFilteredImages(filtered);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleTagChange = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(-1);
  };

  const goToPrevious = () => {
    setLightboxIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const goToNext = () => {
    setLightboxIndex((prevIndex) => (prevIndex < filteredImages.length - 1 ? prevIndex + 1 : prevIndex));
  };

  return (
    <div className="gallery-container h-full flex flex-col">
      <div className="filter-section p-4">
        <Filter
          categories={Array.from(new Set(images.map(img => img.category)))}
          tags={Array.from(new Set(images.flatMap(img => img.tags)))}
          selectedCategory={selectedCategory}
          selectedTags={selectedTags}
          onCategoryChange={handleCategoryChange}
          onTagChange={handleTagChange}
        />
      </div>
      <div className="flex-grow overflow-y-auto p-4">
      <div className="masonry-grid" ref={gridRef}>
        {filteredImages.map((image, index) => (
          <div 
            key={image.id} 
            className="masonry-grid-item cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <div className="image-container">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                layout="responsive"
                objectFit="cover"
                className="rounded-lg transition-transform duration-300 hover:scale-105"
              />
              <div className="image-metadata">
                <span className="category">{image.category}</span>
                {image.tags && image.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
      <Lightbox
        images={filteredImages}
        currentIndex={lightboxIndex}
        onClose={closeLightbox}
        onPrev={goToPrevious}
        onNext={goToNext}
      />
    </div>
  );
};

export default Gallery;