import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ROUTES } from '@/constants';
import { ShoppingBag, Users, Award, Heart, Shield, Truck } from 'lucide-react';

export function AboutUsPage() {
  const values = [
    {
      icon: Heart,
      title: 'Customer First',
      description: 'We prioritize your satisfaction and strive to exceed expectations in every interaction.',
    },
    {
      icon: Shield,
      title: 'Trust & Quality',
      description: 'Every product is carefully curated and quality-checked before reaching you.',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Quick and reliable shipping to get your orders to you as fast as possible.',
    },
    {
      icon: Award,
      title: 'Best Prices',
      description: 'Competitive pricing with regular deals and discounts for our valued customers.',
    },
  ];

  const stats = [
    { label: 'Happy Customers', value: '50K+' },
    { label: 'Products', value: '15+' },
    { label: 'Orders Delivered', value: '100K+' },
    { label: 'Years of Service', value: '5+' },
  ];

  return (
    <div className="container space-y-16 py-16">
      {/* Hero Section */}
      <section className="space-y-6 text-center">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-brand text-white shadow-lg">
          <span className="text-3xl font-bold">C23</span>
        </div>
        <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">About Customize_23</h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-600">
          We're a modern e-commerce platform dedicated to providing you with the best shopping experience. Our mission is
          to make quality products accessible to everyone with exceptional service and unbeatable prices.
        </p>
      </section>

      {/* Mission Section */}
      <section className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardContent className="space-y-4 p-8">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-brand/10 p-3">
                <ShoppingBag className="h-6 w-6 text-brand" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900">Our Mission</h2>
            </div>
            <p className="text-slate-600">
              To revolutionize online shopping by offering a seamless, user-friendly platform where customers can find
              quality products at competitive prices. We believe shopping should be enjoyable, convenient, and accessible
              to everyone.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4 p-8">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-brand/10 p-3">
                <Users className="h-6 w-6 text-brand" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900">Our Vision</h2>
            </div>
            <p className="text-slate-600">
              To become India's most trusted and loved e-commerce platform, known for exceptional customer service,
              quality products, and innovative shopping experiences that make our customers' lives better.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Stats Section */}
      <section className="rounded-2xl border border-slate-200 bg-white p-8">
        <h2 className="mb-8 text-center text-2xl font-semibold text-slate-900">Our Impact</h2>
        <div className="grid gap-6 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-brand">{stat.value}</div>
              <div className="mt-2 text-sm text-slate-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-slate-900">What We Stand For</h2>
          <p className="mt-2 text-slate-600">Our core values guide everything we do</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card key={index}>
                <CardContent className="space-y-4 p-6">
                  <div className="rounded-lg bg-brand/10 p-3 w-fit">
                    <Icon className="h-6 w-6 text-brand" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{value.title}</h3>
                  <p className="text-sm text-slate-600">{value.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="rounded-2xl border border-slate-200 bg-gradient-to-br from-brand/5 to-brand/10 p-12 text-center">
        <h2 className="text-3xl font-semibold text-slate-900">Ready to Start Shopping?</h2>
        <p className="mt-4 text-slate-600">Explore our wide range of products and discover amazing deals</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link to={ROUTES.products}>Browse Products</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to={ROUTES.register}>Create Account</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

