import { notFound } from 'next/navigation'
import './../globals.css'
import Script from 'next/script'
import ClientController from './../../components/Global/ClientController'
import Footer from './../../components/Global/Footer'
import Providers from './../../components/Providers'
import { SettingsContextProvider } from './../../components/SettingsContext'
import getSettingsData from './../../server/getSettingsData'
import { use } from 'react'
import cn from 'clsx'

// eslint-disable-next-line camelcase
import localFont from 'next/font/local'
import Header from '@/components/Global/Header'

const isDev = process.env.NODE_ENV === 'development'
const gtmId = process.env.GTM_ID

const ABCROMCondensed = localFont({
  src: '../fonts/ABCROMCondensed-Bold.woff2',
  display: 'block',
  variable: '--font-heading',
  style: 'normal',
  weight: '700'
})

const DenimINK = localFont({
  src: [
    {
      path: '../fonts/DenimINK-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../fonts/DenimINK-Medium.woff2',
      weight: '500',
      style: 'normal'
    }
  ],
  display: 'block',
  variable: '--font-sans',
  style: 'normal',
  weight: '400'
})

export const revalidate = 120 // revalidate every hour

async function getData() {
  return getSettingsData()
}

export async function generateMetadata() {
  const settings = await getData()

  return {
    title: {
      template: `%s | ${settings.siteTitle}`,
      default: settings.siteTitle
    },
    metadataBase: settings.siteUrl
  }
}

export default function RootLayout({ children }) {
  const settings = use(getData())
  if (!settings) {
    notFound()
  }

  return (
    <html
      lang='en-AU'
      className={cn(ABCROMCondensed.variable, DenimINK.variable)}
    >
      <head>
        <meta charSet='utf-8' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/favicon/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon/favicon-16x16.png'
        />
        <link rel='manifest' href='/favicon/site.webmanifest' />
        <link rel='shortcut icon' href='/favicon/favicon.ico' />

        {gtmId && (
          <Script id='google-analytics'>
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
        )}
      </head>
      <SettingsContextProvider settings={settings}>
        <body>
          {gtmId && (
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
                height='0'
                width='0'
                style={{ display: 'none', visibility: 'hidden' }}
              />
            </noscript>
          )}
          <Providers>
            <ClientController />
            <Header settings={settings} />
            {children}
            <Footer settings={settings} />
          </Providers>
        </body>
      </SettingsContextProvider>
    </html>
  )
}
