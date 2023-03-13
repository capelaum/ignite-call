import '@/lib/dayjs'
import { queryClient } from '@/lib/react-query'
import { globalStyles } from '@/styles/global'
import { QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

globalStyles()

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <DefaultSeo
            openGraph={{
              type: 'website',
              locale: 'pt_BR',
              url: process.env.NEXT_PUBLIC_URL,
              siteName: 'Ignite Call',
              title: 'Ignite Call - Agendamento fácil!',
              description: 'Agendamento fácil com o Google Calendar 🚀',
              images: [
                {
                  url: `${process.env.NEXT_PUBLIC_URL}/images/Capa.png`,
                  width: 1280,
                  height: 720,
                  alt: 'Ignite Call - Capa',
                  type: 'image/png'
                }
              ]
            }}
            twitter={{
              handle: '@capellett',
              site: '@capellett',
              cardType: 'summary_large_image'
            }}
          />
          <Component {...pageProps} />
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </QueryClientProvider>
      </SessionProvider>
    </>
  )
}
