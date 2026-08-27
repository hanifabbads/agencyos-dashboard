/**
 * AgencyOS — Branding Configuration
 *
 * Central configuration for brand identity, logos, titles, slogans,
 * copyright notices, and public links.
 */

import logoImg from '../assets/agencyos-logo.png';

export const brandingConfig = {
  // Brand name and slogans
  brandName: 'AgencyOS',
  tagline: 'Run your creative agency without the chaos',
  description: 'AgencyOS brings projects, teams, deadlines, and finances into one beautiful workspace. Stop juggling spreadsheets and chat tabs — see everything that matters, in real time.',
  
  // Logos
  logo: {
    src: logoImg,
    alt: 'AgencyOS Logo',
    borderRadius: '8px',
  },

  // Auth pages branding
  auth: {
    heroHeadline: 'Run your agency in one calm place.',
    heroDescription: 'Projects, deadlines, team workload, and revenue — everything your team needs, beautifully organized.',
    bulletPoints: [
      'Live dashboard with KPIs & revenue tracking',
      'Project pipeline with at-risk alerts',
      'Team workload balancing',
    ],
  },

  // Landing page branding
  landing: {
    heroBadge: 'Trusted by 18+ creative agencies',
    heroHeadlinePart1: 'Run your creative agency',
    heroHeadlineGradient: 'without the chaos',
    heroSubhead: 'AgencyOS brings projects, teams, deadlines, and finances into one beautiful workspace. Stop juggling spreadsheets and chat tabs — see everything that matters, in real time.',
    trustedBrands: ['Tokopedia', 'Mandiri', 'Pegadaian', 'Bukalapak', 'Traveloka', 'Gojek'],
    ctaTitle: 'Ready to take control?',
    ctaSubtitle: 'Open the dashboard and see your agency in a whole new way. No setup required — demo data is ready and waiting.',
    ctaNote: 'No credit card. No setup. Just click.',
  },

  // Copyright and footer
  company: {
    name: 'AgencyOS Inc.',
    copyright: '© 2026 AgencyOS. All rights reserved.',
    tagline: 'Built for modern creative agencies.',
    supportEmail: 'support@agencyos.app',
  },

  // Social & External Links
  links: {
    website: 'https://agencyos.app',
    docs: '#',
    github: '#',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
};

export default brandingConfig;
