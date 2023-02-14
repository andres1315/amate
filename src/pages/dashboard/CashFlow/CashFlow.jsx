import { CardActionDefault } from '../../../components/Cards/CardActionDefault'

export const CashFlow = () => {
  const cardValues = [
    {
      title: 'Periodos Creados',
      txtBtn: 'Ver Periodos'
    },
    {
      title: 'Cerrar Periodos',
      txtBtn: 'Cerrar'
    },
    {
      title: 'Abrir periodos ',
      txtBtn: 'Abrir'
    }
  ]
  return (
    <>
      <div className='grid grid-cols-12 gap-6'>
        {cardValues.map((card) => {
          return (
            <div className='col-span-12 md:col-span-4 ' key={card.title}>
              <CardActionDefault title={card.title} txtBtn={card.txtBtn} />
            </div>
          )
        })}
      </div>
    </>
  )
}
