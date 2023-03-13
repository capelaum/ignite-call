import { Favicon } from '@/components/Head/Favicon'
import { getCssText } from '@capelaum-packages/ignite-react-05-design-system-react'
import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />

        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />

        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />

        <Favicon />

        {/* <SEO
          title="Ignite Call - Agendamento fácil!"
          description="Agendamento fácil com o Google Calendar 🚀"
          url={process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}
        /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
