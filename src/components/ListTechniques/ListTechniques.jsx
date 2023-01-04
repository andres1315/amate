import React from 'react'
import {listOfTechniques} from '../../data/techniques'

export const ListTechniques = ({className=''})=>{
  return(
    <>
    <ul className={className}>
      {
        listOfTechniques.map(technique=>(
         <li className='transition ease-in-out delay-150 lg:hover:scale-110 duration-300 md:hover:text-white' key={technique.name}>{technique.name}</li>
        ))
      }
    </ul> 
    </>
  )

}

 