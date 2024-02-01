import React from 'react';
import { Hero } from '../Components/Hero/Hero';
import { Popular } from '../Components/Popular/Popular';
import { Offers } from '../Components/Offers/Offers';
import { NewCollections } from '../Components/NewCollections/NewCollections';


export const Shop = (props) => {
  return (
    <div> 
      <Hero/>
      <Popular/>
      <Offers/>
      <NewCollections/>
    </div>
  )
}

