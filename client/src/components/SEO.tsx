import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: object;
}

export function SEO({
  title = "DRWTRANS - Layanan Sewa Bus Pariwisata Terpercaya",
  description = "Sewa bus medium dan HiAce untuk perjalanan nyaman dengan harga transparan. Armada modern, driver profesional, fasilitas lengkap. Booking mudah via WhatsApp.",
  keywords = "sewa bus, rental bus, bus pariwisata, bus medium, HiAce, transportasi Yogyakarta, sewa bus Jogja, bus wisata",
  ogImage = "/og-image.jpg",
  ogType = "website",
  structuredData,
}: SEOProps) {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Set or update meta tags
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute("content", content);
    };

    // Basic meta tags
    setMetaTag("description", description);
    setMetaTag("keywords", keywords);
    
    // Open Graph tags
    setMetaTag("og:title", title, true);
    setMetaTag("og:description", description, true);
    setMetaTag("og:type", ogType, true);
    setMetaTag("og:image", ogImage, true);
    setMetaTag("og:url", window.location.href, true);
    
    // Twitter Card tags
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", title);
    setMetaTag("twitter:description", description);
    setMetaTag("twitter:image", ogImage);

    // Structured data (JSON-LD)
    if (structuredData) {
      let scriptElement = document.querySelector('script[type="application/ld+json"]');
      
      if (!scriptElement) {
        scriptElement = document.createElement("script");
        scriptElement.setAttribute("type", "application/ld+json");
        document.head.appendChild(scriptElement);
      }
      
      scriptElement.textContent = JSON.stringify(structuredData);
    }
  }, [title, description, keywords, ogImage, ogType, structuredData]);

  return null;
}

// Predefined structured data for common pages
export const homeStructuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "DRWTRANS",
  "description": "Layanan sewa bus pariwisata terpercaya dengan armada modern dan driver profesional",
  "url": window.location.origin,
  "telephone": "+62-811-2050-800",
  "email": "info@drwtrans.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Yogyakarta",
    "addressCountry": "ID"
  },
  "priceRange": "$$",
  "openingHours": "Mo-Su 00:00-23:59",
  "areaServed": {
    "@type": "Country",
    "name": "Indonesia"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Layanan Transportasi Bus",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Sewa Bus Medium",
          "description": "Bus medium dengan kapasitas 30-40 penumpang"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Sewa HiAce",
          "description": "Toyota HiAce untuk rombongan kecil"
        }
      }
    ]
  }
};

export const fleetStructuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Armada Bus DRWTRANS",
  "description": "Daftar armada bus yang tersedia untuk disewa"
};

export const bookingStructuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Booking Bus DRWTRANS",
  "description": "Layanan pemesanan bus online dengan konfirmasi via WhatsApp",
  "provider": {
    "@type": "LocalBusiness",
    "name": "DRWTRANS"
  }
};
