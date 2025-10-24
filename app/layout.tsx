import type { Metadata, Viewport } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { Toast } from '@/components/ui/Toast';
import { AchievementNotifier } from '@/components/gamification/AchievementNotifier';
import { InstallPrompt } from '@/components/pwa/InstallPrompt';
import { Hydration } from '@/components/Hydration';
import { ThemeProvider } from '@/lib/design/theme';
import { generateMetadata, homeMetadata } from '@/lib/seo/metadata';
import {
  organizationSchema,
  webApplicationSchema,
  generateStructuredData,
} from '@/lib/seo/structuredData';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

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
      <html lang="pt-BR" className={jakarta.variable}>
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
          <ThemeProvider>
            <div className="flex min-h-screen flex-col">
              <div className="mobile-wrapper flex flex-col flex-1">
                {children}
              </div>
              <Toast />
              <AchievementNotifier />
              <InstallPrompt />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
