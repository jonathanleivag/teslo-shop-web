import { GetServerSideProps, NextPage, GetServerSidePropsResult } from 'next'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { Cell, Column, HeaderCell, Table } from 'rsuite-table'
import 'rsuite-table/dist/css/rsuite-table.css'
import Swal from 'sweetalert2'
import { TCheckInputs, TitleUiComponent } from '../../../components'
import { getAddressByUserGql, numberOfItemGql } from '../../../gql'
import { ILogin } from '../../../interfaces'
import { ShopLayout } from '../../../layouts'
import { RootState } from '../../../store'
import { deleteAddress, selectedAddressAction } from '../../../store/features'
import { axiosGraphqlUtils, URL_API_GRAPHQL } from '../../../utils'
import { FullScreenLoadingUiComponent } from '../../../components/ui/FullScreenLoadingUiComponent'

const titleAndDescription: string = 'Historial de direcciones'

export interface IHistoryPageProps {
  address: TCheckInputs[]
}

const HistoryPage: NextPage<IHistoryPageProps> = ({ address }) => {
  const selectedAddress = useSelector(
    (state: RootState) => state.address.selectedAddress
  )
  const loading = useSelector((state: RootState) => state.address.loading)
  const router = useRouter()
  const dispatch = useDispatch()

  const selected = (event: TCheckInputs) => {
    dispatch(selectedAddressAction(event))
  }

  const newAddress = () => {
    dispatch(selectedAddressAction(undefined))
    router.push('/checkout/address')
  }

  const handleDelete = (id: string) => {
    Swal.fire({
      title: '¿Quieres remover esta dirección?',
      confirmButtonColor: '#2563EB',
      showCancelButton: true,
      confirmButtonText: 'Remover'
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(deleteAddress(id, router))
        dispatch(selectedAddressAction(undefined))
      }
    })
  }

  const handleEdit = (event: TCheckInputs) => {
    router.push('/checkout/address?edit=addressEdit')
    dispatch(selectedAddressAction(event))
  }

  if (loading) return <FullScreenLoadingUiComponent />

  return (
    <ShopLayout
      title={titleAndDescription}
      pageDescription={titleAndDescription}
    >
      <TitleUiComponent>Historial de Direcciónes</TitleUiComponent>
      <Table data={address} className='max-h-[calc(100vh-250px)]'>
        <Column width={100} sortable fixed resizable>
          <HeaderCell>Seleccionado</HeaderCell>
          <Cell>
            {(rowData: TCheckInputs) => {
              return (
                <button
                  onClick={() => selected(rowData)}
                  className='w-full h-full flex flex-row justify-center items-center'
                >
                  <input
                    type='radio'
                    checked={selectedAddress?.id === rowData.id}
                    onChange={() => {}}
                  />
                </button>
              )
            }}
          </Cell>
        </Column>

        <Column width={200} resizable>
          <HeaderCell>Dirección</HeaderCell>
          <Cell dataKey='address' />
        </Column>

        <Column width={200} resizable>
          <HeaderCell>Dirección 2</HeaderCell>
          <Cell>
            {(rowData, _) => {
              return <div>{rowData.address0 || ' - '}</div>
            }}
          </Cell>
        </Column>

        <Column width={200} resizable>
          <HeaderCell>Ciudad</HeaderCell>
          <Cell dataKey='city' />
        </Column>

        <Column width={200} resizable>
          <HeaderCell>Tel</HeaderCell>
          <Cell dataKey='phono' />
        </Column>

        <Column width={200} resizable>
          <HeaderCell>País</HeaderCell>
          <Cell dataKey='country.value' />
        </Column>

        <Column width={200} resizable>
          <HeaderCell>Acción</HeaderCell>
          <Cell>
            {(rowData: TCheckInputs) => (
              <>
                <button
                  onClick={() => handleDelete(rowData.id)}
                  className='bg-red-600 p-1 mx-1'
                >
                  <AiFillDelete className='text-white' />
                </button>
                <button
                  onClick={() => handleEdit(rowData)}
                  className='bg-yellow-400 p-1 mx-1'
                >
                  <AiFillEdit className='text-white' />
                </button>
              </>
            )}
          </Cell>
        </Column>
      </Table>
      <div className='w-full flex flex-row justify-center my-3'>
        <div
          className={`w-full md:w-[40%] grid grid-cols-1 ${
            address.length < 3 || selectedAddress === undefined
              ? 'md:grid-cols-2'
              : 'md:grid-cols-1'
          } gap-4`}
        >
          {address.length < 3 && (
            <button
              onClick={newAddress}
              className='p-1 text-blue-600 border border-blue-600 rounded-full'
            >
              Nueva dirección
            </button>
          )}
          {selectedAddress?.address && (
            <button
              onClick={() => router.push('/checkout/summary')}
              className='p-1 text-white bg-blue-600 rounded-full'
            >
              Siguiente
            </button>
          )}
        </div>
      </div>
    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  let address: TCheckInputs[] = []
  let resp: GetServerSidePropsResult<IHistoryPageProps> = {
    props: { address }
  }
  const session = await getSession({ req: ctx.req })
  const user = session?.user as ILogin

  const data = await axiosGraphqlUtils({
    query: getAddressByUserGql,
    variables: { idUser: user.user.id },
    url: URL_API_GRAPHQL
  })

  const data0 = await axiosGraphqlUtils({
    query: numberOfItemGql,
    variables: { idUser: user.user.id },
    url: URL_API_GRAPHQL
  })

  if (data.errors || data0.errors) {
    address = []
    resp = { redirect: { destination: '/checkout/address', permanent: false } }
  } else {
    if (data0.data.loadOrderInCart.numberOfItem === 0) {
      resp = { redirect: { destination: '/', permanent: false } }
    } else {
      if (data.data.getAddressesByUser.length === 0) {
        resp = {
          redirect: { destination: '/checkout/address', permanent: false }
        }
      } else {
        resp = { props: { address: data.data.getAddressesByUser } }
      }
    }
  }

  return resp
}

export default HistoryPage
