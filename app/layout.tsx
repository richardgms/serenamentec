import type { Metadata, Viewport } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Toast } from '@/components/ui/Toast';
import { AchievementNotifier } from '@/components/gamification/AchievementNotifier';
import { InstallPrompt } from '@/components/pwa/InstallPrompt';
import { Hydration } from '@/components/Hydration';
import { generateMetadata, homeMetadata } from '@/lib/seo/metadata';
import {
  organizationSchema,
  webApplicationSchema,
  generateStructuredData,
} from '@/lib/seo/structuredData';
import './globals.css';

export const metadata: Metadata = generateMetadata(homeMetadata);

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#84C2BE',
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="pt-BR">
        <head>
          {/* Structured Data - Organization */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={generateStructuredData(organizationSchema)}
          />
          {/* Structured Data - WebApplication */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={generateStructuredData(webApplicationSchema)}
          />
        </head>
        <body className="font-sans antialiased" suppressHydrationWarning>
          <Hydration />
          <div className="min-h-screen bg-background">
            {children}
            <Toast />
            <AchievementNotifier />
            <InstallPrompt />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
