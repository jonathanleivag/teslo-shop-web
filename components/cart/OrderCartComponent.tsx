import { useRouter } from 'next/router'
import { FC } from 'react'
import { OrderSummaryCartComponent } from '..'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/index'
import { orderAndReset } from '../../store/features'
import { useSession0 } from '../../hooks/useSession0'

export interface IOrderCartComponentProps {
  title?: string
  resume?: boolean
  buttonText?: string
  byId?: boolean
}

export const OrderCartComponent: FC<IOrderCartComponentProps> = ({
  title = 'Orden',
  resume = false,
  buttonText = 'Checkout',
  byId = false
}) => {
  const router = useRouter()
  const address = useSelector((state: RootState) => state.address.address)
  const selectedAddress = useSelector(
    (state: RootState) => state.address.selectedAddress
  )
  const dispatch = useDispatch()
  const session = useSession0()

  const handleRedirect = () => {
    if (title === 'Orden') {
      if (address.length === 0) {
        router.push('/checkout/address')
      } else {
        router.push('/checkout/address/history')
      }
    }

    if (buttonText === 'Confirmar orden') {
      if (session?.user.id && selectedAddress) {
        dispatch(orderAndReset(session.user.id!, selectedAddress.id!))
      }
    }
  }

  return (
    <div className='w-[90%] min-h-[100px] border rounded-xl shadow-lg px-2'>
      <div className='border-b px-2 py-1'>
        <h3> {title} </h3>
      </div>
      <OrderSummaryCartComponent resume={resume} />

      {byId && (
        <div className='w-full my-3'>
          <div className='border w-[100px] text-center rounded-full border-green-600'>
            <p className='text-green-600'>Ya pagado</p>
          </div>
        </div>
      )}

      {!byId && (
        <button
          onClick={handleRedirect}
          className='w-full my-3 py-1 bg-blue-600 text-white rounded-full'
        >
          {buttonText}
        </button>
      )}
    </div>
  )
}
