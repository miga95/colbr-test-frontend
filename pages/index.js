import Head from 'next/head'

export default function Home({children, ...rest}) {
  return (
    <div>
      <Head>
        <title>Colbr</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {children}
      </main>
    </div>
  )
}