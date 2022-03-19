import { FC, useState } from 'react'
import Image from 'next/image'
import { IProduct } from '../../interfaces'
import { useBlurDataURL } from '../../hooks'

export interface ProductCardComponentProps {
  product: IProduct
}

export const ProductCardComponet: FC<ProductCardComponentProps> = ({
  product
}) => {
  const [onHovered, setOnHovered] = useState<boolean>(false)
  const blurDataUrl = useBlurDataURL(100, 400 * 0.9)

  return (
    <div
      className='w-full h-[400px] 2xl:h-[440px] flex flex-col'
      onMouseEnter={() => setOnHovered(true)}
      onMouseLeave={() => setOnHovered(false)}
    >
      <div className='w-full h-[90%] relative'>
        <Image
          layout='fill'
          src={`/products/${product.images[onHovered ? 1 : 0]}`}
          alt={product.description}
          objectFit='contain'
          className='transform duration-300 ease-in-out'
          loading='lazy'
          placeholder='blur'
          blurDataURL={blurDataUrl}
        />
      </div>
      <div className='w-full h-[10%]'>
        <h3 className='text-lg font-bold'>{product.title}</h3>
        <h3 className='text-sm font-bold'>${product.price}</h3>
      </div>
    </div>
  )
}
