'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image'
import Logo from '@/assets/logo-white.svg'
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { AiOutlineYoutube } from "react-icons/ai";

const footerLinks = {
  platform: [
    { label: 'Referal Program', href: '#' },
    { label: 'Change Log', href: '#' },
    { label: 'Security', href: '#' },
  ],
  company: [
    { label: 'Customers', href: '#' },
    { label: 'Announcements', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Become a partner', href: '#' },
  ],
  resources: [
    { label: 'Startup Program', href: '#' },
    { label: 'Help Center', href: '#' },
    { label: 'Developers', href: '#' },
    { label: 'System Status', href: '#' },
  ],
};

const socialLinks = [
  { Icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
  { Icon: FaXTwitter, href: '#', label: 'Twitter' },
  { Icon: AiOutlineYoutube, href: '#', label: 'YouTube' },
];

const legalLinks = [
  { label: 'Terms & Conditions', href: '#' },
  { label: 'Privacy Policy', href: '#' },
];

interface FooterLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, className, children }) => (
  <Link
    href={href}
    className={className || "block text-[14px] text-[#E4E4E7] transition-colors duration-200 py-1"}
  >
    {children}
  </Link>
);

const FooterLinkSection: React.FC<{ title: string; links: Array<{ label: string; href: string }> }> = ({ title, links }) => (
  <div className='col-span-4'>
    <div className="mb-2 text-[14px] font-medium text-[#A1A1AA]">{title}</div>
    {links.map((link) => (
      <div key={link.label}>
        <FooterLink href={link.href}>{link.label}</FooterLink>
      </div>
    ))}
  </div>
);

const Footer: React.FC = () => {
  return (
    <div className='mt-10'>
      <div className="bg-black-50">
        <div className='container-custom !py-16'>
          <div className='grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-0'>
            <div className='col-span-5'>
              <Image src={Logo} alt="footer logo" width={120} />
            </div>

            <div className='col-span-7'>
              <div className='grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-0'>
                <FooterLinkSection title="Platform" links={footerLinks.platform} />
                <FooterLinkSection title="Company" links={footerLinks.company} />
                <FooterLinkSection title="Resources" links={footerLinks.resources} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black-100">
        <div className='container-custom !py-10'>
          <div className='flex flex-col md:flex-row md:items-center justify-between gap-5 md:gap-0'>
            <div className='flex items-center gap-4'>
              {socialLinks.map(({ Icon, href, label }) => (
                <Link key={label} href={href}>
                  <Icon className="w-4 h-4 text-[#A1A1AA] hover:text-[#E4E4E7] transition-colors duration-200" />
                </Link>
              ))}
            </div>

            <div className='flex flex-col md:flex-row md:items-center gap-4'>
              <span className='text-sm text-gray-500'>© {new Date().getFullYear()} Fethr Health Inc. All rights reserved.</span>
              {legalLinks.map((link) => (
                <FooterLink
                  key={link.label}
                  href={link.href}
                  className="text-[14px] text-[#A1A1AA] hover:text-[#E4E4E7] transition-colors duration-200"
                >
                  {link.label}
                </FooterLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;