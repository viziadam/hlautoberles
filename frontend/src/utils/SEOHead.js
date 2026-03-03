import { useEffect } from 'react';

const SEOHead = ({ 
  title,
  // Erős, helyi fókuszú alapértelmezett leírás
  description = "Személyautók, kisteherautók és professzionális szerszámok bérlése Budapesten, a XI. kerületben. Gyors ügyintézés, rejtett költségek nélkül a HLdekor megbízásából.",
  // Legjobban teljesítő magyar kulcsszavak a 11. kerületi fókusszal
  keywords = [
    'autóbérlés Budapest', 'autókölcsönzés XI. kerület', 'teherautó bérlés Budapest', 
    'kisdobozos furgon bérlés', 'szerszámkölcsönzés 11. kerület', 'gépbérlés', 
    'sofőrszolgálat', 'olcsó autóbérlés', 'HLAutóbérlés', 'HLdekor'
  ],
  image = '/logo.png', // Érdemes lenne egy szép autó/furgon képre cserélni (pl. /og-image.jpg)
  url = '',
  type = 'website',
  author = 'HLdekor',
  publishedTime,
  modifiedTime,
  section,
  tags = []
}) => {
  const siteName = "HLAutóbérlés";
  // const DOMAIN = 'https://hlautoberles.hu';
  const domain = 'https://transyltech.hu';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  // const fullUrl = url ? `https://hlautoberles.hu${url}` : 'https://hlautoberles.hu';
  const fullUrl = url ? `https://transyltech.hu${url}` : 'https://transyltech.hu';
  const safeImage = image || '/cover.webp';
  const imageUrl = safeImage.startsWith('http') ? safeImage : `${domain}${safeImage}`;
  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update meta tags
    const updateMetaTag = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    const updatePropertyTag = (property, content) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Basic Meta Tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords.join(', '));
    updateMetaTag('author', author);
    updateMetaTag('robots', 'index, follow');
    
    // Open Graph
    updatePropertyTag('og:title', fullTitle);
    updatePropertyTag('og:description', description);
    updatePropertyTag('og:image', image);
    updatePropertyTag('og:url', fullUrl);
    updatePropertyTag('og:type', type);
    updatePropertyTag('og:site_name', siteName);
    
    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    
    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = fullUrl;

    // Article specific meta tags
    if (type === 'article') {
      if (publishedTime) updatePropertyTag('article:published_time', publishedTime);
      if (modifiedTime) updatePropertyTag('article:modified_time', modifiedTime);
      if (section) updatePropertyTag('article:section', section);
      tags.forEach(tag => {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'article:tag');
        meta.content = tag;
        document.head.appendChild(meta);
      });
    }

    // Structured Data
    const structuredData = {
      "@context": "https://schema.org",
      // Kettős típus: Egyszerre autókölcsönző és helyi vállalkozás
      "@type": type === 'article' ? 'Article' : ['AutoRental', 'LocalBusiness'],
      "name": fullTitle,
      "description": description,
      "url": fullUrl,
      "image": imageUrl,
      "telephone": "+36309719513", // A pontos HLdekor telefonszám
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Galvani u. 1-3",
        "addressLocality": "Budapest",
        "postalCode": "1117",
        "addressCountry": "HU"
      },
      "priceRange": "$$", // Jelzi, hogy megfizethető kategória
      "provider": {
        "@type": "Organization",
        "name": "HLdekor",
        "url": domain
      },
      ...(type === 'article' && {
        "datePublished": publishedTime,
        "dateModified": modifiedTime,
        "articleSection": section
      })
    };

    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      // Clean up meta tags that we added
      const metaTags = document.querySelectorAll('meta[name="keywords"], meta[name="author"], meta[property^="og:"], meta[name^="twitter:"]');
      metaTags.forEach(tag => {
        if (tag.content === description || tag.content === keywords.join(', ') || tag.content === author) {
          tag.remove();
        }
      });
    };
  }, [title, description, keywords, image, url, type, author, publishedTime, modifiedTime, section, tags, fullTitle, fullUrl]);

  return null;
};

export default SEOHead; 
