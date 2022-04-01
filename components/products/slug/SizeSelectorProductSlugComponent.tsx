import { Dispatch, FC, SetStateAction } from 'react'
import { TValidSize } from '../../../interfaces'
import { ICartData } from '../../../store/features'

export interface SizeSelectorProductSlugProps {
  selectedSize?: TValidSize
  sizes: TValidSize[]
  setTempCartProduct: Dispatch<SetStateAction<ICartData>>
}

export const SizeSelectorProductSlugComponent: FC<SizeSelectorProductSlugProps> = ({
  selectedSize,
  sizes,
  setTempCartProduct
}) => {
  const changeSelectedSize = (size: TValidSize) => {
    setTempCartProduct(prevState => ({ ...prevState, size }))
  }

  return (
    <div className='w-full'>
      {sizes.map(size => (
        <button
          onClick={() => changeSelectedSize(size)}
          className={`mx-2 border-b ${
            size === selectedSize ? 'border-gray-600' : 'border-transparent'
          }  hover:border-gray-600`}
          key={size}
        >
          {size}
        </button>
      ))}
    </div>
  )
}
