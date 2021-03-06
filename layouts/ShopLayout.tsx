import { FC } from 'react'
import {
  HeaderMetaComponent,
  NavbarUiComponent,
  SidebarUiComponent
} from '../components'

export interface IShopLayoutProps {
  title: string
  pageDescription: string
  imageFullUrl?: string
}

export const ShopLayout: FC<IShopLayoutProps> = ({
  title,
  pageDescription,
  imageFullUrl,
  children
}) => {
  return (
    <>
      <HeaderMetaComponent
        title={`Teslo-Shop - ${title}`}
        pageDescription={pageDescription}
        imageFullUrl={imageFullUrl}
      />
      <NavbarUiComponent />
      <SidebarUiComponent />
      <main className='mx-auto max-w-[1440px] py-[80px] px-2 md:px-[60px] overflow-hidden'>
        {children}
      </main>
    </>
  )
}
