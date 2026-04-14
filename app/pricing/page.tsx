import type { Metadata } from 'next';
import { breadcrumbSchema } from '@/lib/breadcrumb';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export const metadata: Metadata = {
  title: {
    absolute: 'Pilates Class Pricing | North Hollywood',
  },
  description:
    'Transparent pricing for boutique Pilates classes in North Hollywood. First class $25, class packs from $36, unlimited memberships from $280/month.',
};

const STUDIO_ID = '5739427';

function mbUrl(stype: number, prodid: number | string): string {
  return `https://clients.mindbodyonline.com/classic/ws?studioid=${STUDIO_ID}&stype=${stype}&prodid=${prodid}`;
}

const breadcrumb = breadcrumbSchema([
  { name: 'Home', url: 'https://www.bodiesandpilates.com/' },
  { name: 'Pricing', url: 'https://www.bodiesandpilates.com/pricing' },
]);

// ─── Sub-components ──────────────────────────────────────────────────────────

function BuyButton({ href, label = 'Buy Now' }: { href: string; label?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full text-center bg-sage-700 hover:bg-sage-500 text-cream-50 font-sans font-medium py-2.5 px-4 rounded-lg transition-colors duration-200"
    >
      {label}
    </a>
  );
}

function PriceBadge({ label, color }: { label: string; color: 'blush' | 'sage' }) {
  const cls =
    color === 'blush'
      ? 'bg-blush-500 text-cream-50'
      : 'bg-sage-500 text-cream-50';
  return (
    <span className={`inline-block text-xs font-sans font-semibold px-2.5 py-1 rounded-full ${cls}`}>
      {label}
    </span>
  );
}

// ─── Intro Offers ─────────────────────────────────────────────────────────────

function IntroOffersTab() {
  const offers = [
    {
      name: 'First Class',
      price: '$25',
      description: 'Perfect introduction to our studio and teaching style.',
      prodid: 100010,
      badge: { label: 'Best for First-Timers', color: 'blush' as const },
    },
    {
      name: '1 Week Unlimited',
      price: '$105',
      description: 'Seven days of unlimited classes to explore everything we offer.',
      prodid: 100014,
      badge: null,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
      {offers.map((offer) => (
        <div
          key={offer.prodid}
          className="relative bg-cream-50 border border-taupe-300 rounded-2xl p-6 flex flex-col gap-4 shadow-sm"
        >
          {offer.badge && (
            <div>
              <PriceBadge label={offer.badge.label} color={offer.badge.color} />
            </div>
          )}
          <div>
            <h3 className="font-serif text-xl text-charcoal-800">{offer.name}</h3>
            <p className="font-sans text-3xl font-bold text-sage-700 mt-1">{offer.price}</p>
          </div>
          <p className="font-sans text-sm text-charcoal-800/70 flex-1">{offer.description}</p>
          <BuyButton href={mbUrl(43, offer.prodid)} />
        </div>
      ))}
    </div>
  );
}

// ─── Class Packs ──────────────────────────────────────────────────────────────

function ClassPacksTab() {
  const packs = [
    {
      name: 'Single Class',
      price: '$36',
      perClass: null,
      description: 'Drop in whenever you like.',
      prodid: 100003,
    },
    {
      name: '5 Class Pack',
      price: '$160',
      perClass: '$32/class',
      description: 'Great for building a consistent practice.',
      prodid: 100004,
    },
    {
      name: '10 Class Pack',
      price: '$300',
      perClass: '$30/class',
      description: 'Best per-class value in our pack options.',
      prodid: 100005,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
      {packs.map((pack) => (
        <div
          key={pack.prodid}
          className="bg-cream-50 border border-taupe-300 rounded-2xl p-6 flex flex-col gap-4 shadow-sm"
        >
          <div>
            <h3 className="font-serif text-xl text-charcoal-800">{pack.name}</h3>
            <p className="font-sans text-3xl font-bold text-sage-700 mt-1">{pack.price}</p>
            {pack.perClass && (
              <p className="font-sans text-sm text-sage-500 mt-0.5">{pack.perClass}</p>
            )}
          </div>
          <p className="font-sans text-sm text-charcoal-800/70 flex-1">{pack.description}</p>
          <BuyButton href={mbUrl(43, pack.prodid)} />
        </div>
      ))}
    </div>
  );
}

// ─── Memberships ──────────────────────────────────────────────────────────────

function MembershipsTab() {
  const memberships = [
    {
      name: '5 Classes / Month',
      price: '$130',
      classCount: 5,
      perClass: '$26/class',
      prodid: 100,
      popular: false,
      features: [
        '5 class credits per billing cycle',
        'Add-on classes at $25 each',
        'Access to all group formats',
        'Auto-renews monthly',
      ],
    },
    {
      name: '8 Classes / Month',
      price: '$170',
      classCount: 8,
      perClass: '$21.25/class',
      prodid: 102,
      popular: false,
      features: [
        '8 class credits per billing cycle',
        'Add-on classes at $25 each',
        'Access to all group formats',
        'Auto-renews monthly',
      ],
    },
    {
      name: '12 Classes / Month',
      price: '$220',
      classCount: 12,
      perClass: '$18.33/class',
      prodid: 103,
      popular: false,
      features: [
        '12 class credits per billing cycle',
        'Add-on classes at $25 each',
        'Access to all group formats',
        'Auto-renews monthly',
      ],
    },
    {
      name: 'Unlimited',
      price: '$280',
      classCount: null,
      perClass: 'Best rate per visit',
      prodid: 101,
      popular: true,
      features: [
        'Unlimited classes each billing cycle',
        'Access to all group formats',
        'Priority waitlist access',
        'Auto-renews monthly',
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      {memberships.map((m) => (
        <div
          key={m.prodid}
          className={`relative bg-cream-50 border rounded-2xl p-6 flex flex-col gap-4 shadow-sm ${
            m.popular ? 'border-sage-500 ring-2 ring-sage-500/30' : 'border-taupe-300'
          }`}
        >
          {m.popular && (
            <div>
              <PriceBadge label="Most Popular" color="sage" />
            </div>
          )}
          <div>
            <h3 className="font-serif text-lg text-charcoal-800">{m.name}</h3>
            <p className="font-sans text-4xl font-bold text-sage-700 mt-1">
              {m.price}
              <span className="text-base font-normal text-charcoal-800/60">/mo</span>
            </p>
            <p className="font-sans text-sm text-sage-500 mt-0.5">{m.perClass}</p>
          </div>
          <ul className="font-sans text-sm text-charcoal-800/80 space-y-1.5 flex-1">
            {m.features.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="text-sage-500 mt-0.5 shrink-0">✓</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <BuyButton href={mbUrl(40, m.prodid)} />
        </div>
      ))}
    </div>
  );
}

// ─── Specialty ────────────────────────────────────────────────────────────────

function SpecialtyTab() {
  const sessions = [
    {
      name: 'Duet Session',
      price: '$140',
      description:
        'Share a semi-private session with a friend or partner. Personalized attention at a shared cost.',
      prodid: 100016,
    },
    {
      name: '55-min Private Session',
      price: '$100',
      description:
        'One-on-one session tailored entirely to your goals, technique, and pace.',
      prodid: 100011,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
      {sessions.map((s) => (
        <div
          key={s.prodid}
          className="bg-cream-50 border border-taupe-300 rounded-2xl p-6 flex flex-col gap-4 shadow-sm"
        >
          <div>
            <h3 className="font-serif text-xl text-charcoal-800">{s.name}</h3>
            <p className="font-sans text-3xl font-bold text-sage-700 mt-1">{s.price}</p>
          </div>
          <p className="font-sans text-sm text-charcoal-800/70 flex-1">{s.description}</p>
          <BuyButton href={mbUrl(43, s.prodid)} />
        </div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="bg-cream-100 min-h-screen">
        {/* Hero */}
        <section className="bg-cream-200 py-14 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-serif text-4xl sm:text-5xl text-charcoal-800 mb-4">
              Transparent Pricing
            </h1>
            <p className="font-sans text-lg text-charcoal-800/70 max-w-xl mx-auto">
              Start with a $25 first class, then find the membership or pack that fits your
              practice.
            </p>
          </div>
        </section>

        {/* Tabs */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Tabs defaultValue="intro">
            <TabsList className="flex flex-wrap w-full h-auto gap-1 bg-cream-200 p-1 rounded-xl">
              <TabsTrigger value="intro" className="flex-1 min-w-[120px] font-sans text-sm py-2">
                Intro Offers
              </TabsTrigger>
              <TabsTrigger value="packs" className="flex-1 min-w-[120px] font-sans text-sm py-2">
                Class Packs
              </TabsTrigger>
              <TabsTrigger value="memberships" className="flex-1 min-w-[120px] font-sans text-sm py-2">
                Memberships
              </TabsTrigger>
              <TabsTrigger value="specialty" className="flex-1 min-w-[120px] font-sans text-sm py-2">
                Specialty
              </TabsTrigger>
            </TabsList>

            <TabsContent value="intro">
              <IntroOffersTab />
            </TabsContent>
            <TabsContent value="packs">
              <ClassPacksTab />
            </TabsContent>
            <TabsContent value="memberships">
              <MembershipsTab />
            </TabsContent>
            <TabsContent value="specialty">
              <SpecialtyTab />
            </TabsContent>
          </Tabs>
        </section>

        {/* FAQ Note */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-cream-200 border border-taupe-300 rounded-xl p-6 text-center">
            <p className="font-sans text-sm text-charcoal-800/70">
              All sales are final. Classes are non-transferable. Membership credits must be used
              within the billing cycle.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
