import Head from 'next/head'
import { FC } from 'react'
import { IShopLayoutProps } from '../../layouts'

const HeaderMetaComponent: FC<IShopLayoutProps> = ({
  title,
  pageDescription,
  imageFullUrl
}) => {
  return (
    <Head>
      <title> {title} </title>
      <meta name='description' content={pageDescription} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={pageDescription} />
      {imageFullUrl && <meta property='og:image' content={imageFullUrl} />}
      <meta property='og:type' content='website' />
      {/* TODO: url de la página */}
      {/* <meta property='og:url' content='https://teslo-shop.vercel.app/' /> */}
      <meta property='og:site_name' content='Teslo-Shop' />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={pageDescription} />
      {imageFullUrl && <meta name='twitter:image' content={imageFullUrl} />}
      <meta name='twitter:site' content='@teslo_shop' />
      <meta name='twitter:creator' content='@teslo_shop' />
      {/* TODO: url de la página */}
      {/* <meta name='twitter:domain' content='https://teslo-shop.vercel.app/' /> */}
      <meta name='twitter:image:alt' content='Teslo-Shop' />
      <meta name='twitter:image:width' content='1200' />
      <meta name='twitter:image:height' content='630' />
    </Head>
  )
}

export default HeaderMetaComponent