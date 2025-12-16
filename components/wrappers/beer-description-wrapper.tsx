import SectionTitle from '../dashboard/title-sections/title-section'

export const BeerDescription: React.FC<{ description: string }> = ({
  description,
}) => {
  return (
    <div className="w-full wrap-break-word px-8">
      <SectionTitle variant="small" title="Descrição" />
      <p className="mb-4 text-sm text-secondary-foreground">{description}</p>
    </div>
  )
}
