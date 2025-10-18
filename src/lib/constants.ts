import { FooterSection, NavItem } from '@/types'

export const SITE_CONFIG = {
  name: 'Fethr, Intelligent Healthcare Automation Platform',
  description: 'AI-powered healthcare automation platform. Connect to any EHR system. Transform, validate, and orchestrate healthcare data',
  url: 'https://fethrhealth.com',
  ogImage: '/og-image.png',
} as const

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Platform',
    href: '#platform'
  },
  {
    label: 'Resources', 
    href: '#resources'
  },
  {
    label: 'Customers',
    href: '#customers'
  },
  {
    label: 'Pricing',
    href: '#pricing'
  }
]

export const PRODUCT_TABS = [
  {
    id: 'automations',
    label: 'Automations'
  },
  {
    id: 'tables',
    label: 'Tables'
  },
  {
    id: 'ai',
    label: 'AI'
  },
  {
    id: 'reporting',
    label: 'Reporting'
  }
] as const

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: 'Platform',
    links: [
      { label: 'Refer a team', href: '#refer' },
      { label: 'Changelog', href: '#changelog' },
      { label: 'Security', href: '#security' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'Customers', href: '#customers' },
      { label: 'Announcements', href: '#announcements' },
      { label: 'Manifesto', href: '/redefine' },
      { label: 'Become a partner', href: '#partner' }
    ]
  },
  {
    title: 'Import from',
    links: [
      { label: 'OpenLink', href: '#openlink' },
      { label: 'Corepoint', href: '#corepoint' },
      { label: 'Cloverleaf', href: '#cloverleaf' },
      { label: 'Iguana', href: '#iguana' }
    ]
  },
  {
    title: 'Fethr for',
    links: [
      { label: 'Startups', href: '#startups' },
      { label: 'Health technology', href: '#healthtech' },
      { label: 'Hospitals', href: '#hospitals' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'Startup program', href: '#startup-program' }
    ]
  }
]

export const SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/fethrhealth',
    icon: 'linkedin'
  },
  {
    name: 'YouTube',
    href: '#',
    icon: 'youtube'
  },
  {
    name: 'X',
    href: '#',
    icon: 'X'
  }
] as const

export const LEGAL_LINKS = [
  {
    label: 'Terms & Conditions',
    href: '/terms'
  },
  {
    label: 'Privacy Policy',
    href: '/privacy'
  }
] as const