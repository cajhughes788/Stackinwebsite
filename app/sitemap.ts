import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const routes = [
  '',
  '/features',
  '/privacy',
  '/terms',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return routes.map((route, index) => ({
    url: `https://stackin-app.com${route}`,
    lastModified,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: index === 0 ? 1 : 0.8,
  }))
}
