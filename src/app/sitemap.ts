import { MetadataRoute } from 'next';
import { articlesDatabase } from '@/app/blog/data'; // Adjust this import to match your blog data path
import { RECIPES_DATA } from '@/app/data/recipes';    // Adjust this import to match your integration recipe data path

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://siftprompt.com';

  // 1. Core Static Application Directory Map
  const staticRoutes = [
    '',
    '/blog',
    '/examples',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. Programmatic Integration Recipe Query Map
  const recipeRoutes = RECIPES_DATA.map((recipe) => ({
    url: `${baseUrl}/examples?recipe=${recipe.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // 3. Programmatic Dynamic Blog Article Target Map
  const blogRoutes = Object.keys(articlesDatabase).map((id) => ({
    url: `${baseUrl}/blog/${id}`,
    lastModified: new Date(articlesDatabase[id].date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...recipeRoutes, ...blogRoutes];
}