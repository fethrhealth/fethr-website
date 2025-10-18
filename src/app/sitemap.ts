import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_CONFIG.url,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_CONFIG.url}/redefine`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    // Add these when you create the pages
    // {
    //   url: `${SITE_CONFIG.url}/customers`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
    // {
    //   url: `${SITE_CONFIG.url}/pricing`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
  ]
}