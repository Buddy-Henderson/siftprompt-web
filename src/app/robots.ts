import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/tutorials', '/tutorials/'],
      disallow: [
        '/dashboard',    // Blocks user configuration accounts
        '/api/',         // Protects system operations middleware paths
        '*/settings',    // Keeps analytical preference screens private
      ],
    },
    sitemap: 'https://siftprompt.com/sitemap.xml',
  };
}