import { Link } from 'react-router-dom';

const footerLinks = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'Returns', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Accessibility', href: '#' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container grid gap-10 py-14 md:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white shadow">
              C23
            </span>
            <span className="text-lg font-semibold text-slate-900">Customize_23</span>
          </div>
          <p className="text-sm text-slate-500">
            A modern, headless-ready storefront built for performance, scalability, and delightful shopping experiences.
          </p>
        </div>
        {footerLinks.map((section) => (
          <div key={section.title} className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              {section.title}
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              {section.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="hover:text-brand">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-200 py-4">
        <div className="container flex flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Customize_23. All rights reserved.</p>
          <p>Built with React, Redux Toolkit, Tailwind CSS, and shadcn/ui principles.</p>
        </div>
      </div>
    </footer>
  );
}


