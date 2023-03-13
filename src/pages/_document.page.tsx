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

        <meta
          name="google-site-verification"
          content="59pSuYmQOWfG8i657QAyzrC9exGLCuhspsuimGjMGr0"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
