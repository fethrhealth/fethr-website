export interface WaitlistFormData {
  email: string
}

export interface WaitlistData {
  email: string
}

export interface DemoFormData {
  email: string
  name: string
  company?: string
  message?: string
}

export interface ApiResponse {
  success: boolean
  message?: string
  error?: string
}

export interface TabItem {
  id: string
  label: string
  content: React.ReactNode
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

export interface FooterLink {
  label: string
  href: string
  external?: boolean
}

export interface NavItem {
  label: string
  href: string
  external?: boolean
}

export interface SiteConfig {
  name: string
  description: string
  url: string
  ogImage: string
}