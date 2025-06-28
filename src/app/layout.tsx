import type { Metadata } from 'next'
import { Mukta } from 'next/font/google'

import './globals.css'
import { Providers } from '@/providers'
import { Header } from '@/components/core/Header'
import { ThemeValidation } from '@/utils/theme-validation'

const mukta = Mukta({
  subsets: ['latin'],
  variable: '--font-mukta',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'M30 Arquitetura',
  description:
    'A M30 é um escritório de arquitetura, que busca alinhar tecnologia e design, com uma entrega autêntica e atemporal para seus clientes. Baseando-se na arquitetura moderna brasileira, mas com o uso de novas tecnologias e materiais.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='pt-BR'
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: ThemeValidation }} />
      </head>
      <body className={`${mukta.className} antialiased flex flex-col h-dvh`}>
        <Providers>
          <header>
            <Header />
          </header>
          <main className='flex bg-background justify-center items-center h-full'>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
