import React from 'react'
import Image from 'next/image'

//Internal import
import Style from './TokenList.module.css'
import images from '../../assets'
// import tokenDate from '../Context/SwapContext.js'

const TokenList = ({ tokenDate, setOpenTokenBox }) => {

  //const data = [1, 2, 3, 4, 5, 6, 7]
  let tokenList = [];
  for (let i = 0; i < tokenDate.length; i++) {
    if (i % 2 == 1) tokenList.push(tokenDate[i]);
  }
  // console.log("Token List  File", tokenList)
  // console.log("Token Data  File", tokenDate)




  return (
    <div className={Style.TokenList}>
      <p className={Style.TokenList_close}
        onClick={() => setOpenTokenBox(false)}>
        <Image src={images.close} alt='close' width={50} height={50} />
      </p>
      <div className={Style.TokenList_title}>
        <h2>Your Token List</h2>
      </div>
      {tokenList.map((el, i) => (
        <div className={Style.TokenList_box}>
          <div className={Style.TokenList_box_info}>
            <p className={Style.TokenList_box_info_symbol}>
              {el.symbol}
            </p>
            <p>
              <span>{el.name}</span> {el.tokenBalance}
            </p>
          </div>

        </div>
      ))}
    </div>
  );
};

export default TokenList