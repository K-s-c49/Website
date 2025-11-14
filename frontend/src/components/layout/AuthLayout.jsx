import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ROUTES } from '@/constants';
import { Link } from 'react-router-dom';

export function AuthLayout({ title, description, children, bottomLink }) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <header className="container flex items-center justify-between py-6">
        <Link to={ROUTES.home} className="flex items-center gap-2 text-lg font-semibold text-brand">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white shadow">
            C23
          </span>
          Customize_23
        </Link>
        <p className="text-sm text-slate-500">Crafting delightful customer journeys</p>
      </header>
      <main className="container flex flex-1 items-center justify-center py-12">
        <Card className="w-full max-w-xl">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {children}
            {bottomLink}
          </CardContent>
        </Card>
      </main>
      <footer className="border-t border-slate-200 bg-white py-6">
        <div className="container flex flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Customize_23. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="#">Privacy</Link>
            <Link to="#">Terms</Link>
            <Link to="#">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}




