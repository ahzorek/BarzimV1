import Link from 'next/link'
import { type TypeObjectCerveja } from '@/data/data'
import { CardCerveja } from '../cards/card-cerveja'
import { CardHorizontalCerveja } from '../cards/card-horizontal-cerveja'
import { BeerName } from '../titles/beer-name'

const ListaDeCervejas: React.FC<{ cervejas: TypeObjectCerveja[] }> = ({
  cervejas,
}) => {
  return (
    <ul className="mt-6 flex flex-col gap-4">
      {cervejas.map((itemCerveja: TypeObjectCerveja): JSX.Element => {
        const {
          id,
          nomeCerveja,
          mainImage,
          createdAt,
          tipoCerveja: { nome: tipoCerveja },
        } = itemCerveja
        return (
          <li key={id}>
            <Link href={`/cervejas/${id}`}>
              <CardCerveja
                nomeCerveja={nomeCerveja}
                imagem={mainImage ?? 'undefined'}
                createdAt={createdAt as unknown as Date}
              >
                <BeerName cerveja={{ nomeCerveja, tipoCerveja }} />
              </CardCerveja>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default ListaDeCervejas
