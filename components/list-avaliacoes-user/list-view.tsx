import { TReview } from '@/data/data'
import { cn } from '@/lib/utils'
import { FeedCardImage } from './card-image'
import { FeedCardRating } from './card-rating'

export const ListAvaliações: React.FC<{ userAvaliacoes: TReview[] }> = ({
  userAvaliacoes,
}) => {
  return (
    <ul className={cn('mx-auto flex w-full max-w-[480px] flex-col gap-3 pb-6')}>
      {userAvaliacoes.map((avaliacao) => (
        <li
          className={cn('overflow-hidden rounded-sm bg-gray-cards')}
          key={'avaliacao' + avaliacao.id}
        >
          {avaliacao.imagens.length > 0 && (
            <FeedCardImage avaliacao={avaliacao} />
          )}
          {avaliacao.imagens.length == 0 && (
            <FeedCardRating avaliacao={avaliacao} />
          )}
        </li>
      ))}
    </ul>
  )
}
