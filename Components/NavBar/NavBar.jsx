import React, {useState, useEffect, useContext} from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { SwapTokenContext } from '../../Context/SwapContext';
//import internal
import Style from './NavBar.module.css';
import images from '../../assets';
import {Model, TokenList} from '../index';


const NavBar = () => {
  const {ether , account, networkConnect,connectWallet,tokenData }= useContext(SwapTokenContext)
  const menuItems = [
    {
      name: 'Swap',
      link: '/'
    },
    {
      name: 'Tokens',
      link: '/'
    } ,
    {
      name: 'Pools',
      link: '/'
    },
  ];
  
  //USESTATE
  const [openModel, setOpenModel] = useState(false)
  const [openTokenBox, setOpenTokenBox] = useState(false);
  //const [account, setAccount] = useState(true)
  //const [account, setAccount] = useState(false)



  return (
    <div className={Style.NavBar}>
      <div className = {Style.NavBar_box}>
        <div className = {Style.NavBar_box_left}>

          {/* Logo Image */}
          <div className={Style.NavBar_box_left_img}>
            <Image src={images.uniswap} alt = "logo" width={50} height={50} />
          </div>

          {/* Menu Items  */}
          <div className={Style.NavBar_box_left_menu}>
            {menuItems.map((el, i) => (
              <Link key={i+1} href={{pathname: `${el.name}`}}>
                
                <p className={Style.NavBar_box_left_menu_item}>
                  {el.name}
                </p>

              </Link>
            ))}
          </div>
        </div>

        {/* Middle SECTION */}
          <div className={Style.NavBar_box_middle}>
            <div className={Style.NavBar_box_middle_search}>
              <div className={Style.NavBar_box_middle_search_img}>
                <Image src={images.search} alt="Search" width={20} height = {20}/>
              </div>

              {/* INPUT SECTION  */}
              <input type="text" placeholder='Search Token'/> 
            </div>
          </div>

              {/* RIGHT SECTION  */}
          <div className={Style.NavBar_box_right}>
            <div className={Style.NavBar_box_right_box}>
              <div className={Style.NavBar_box_right_box_img}>
                <Image src={images.ether} alt="Network" height={30} width={30}/>
              </div>
              <p>{networkConnect}</p>
            </div>
            {
              account ? (
                <button onClick={() => setOpenTokenBox(true)} className={Style.NavBar_Addres}>{account}</button>

              ) : (
                <button onClick={() => setOpenTokenBox(true)} className={Style.NavBar_Addres}>Connect</button>
              )
            }
                
            {openModel && (
              <Model setOpenModel={setOpenModel} connectWallet={connectWallet}/>
            )} 
            
          </div>

      </div>
      
              {/* TokenList Component  */}
              {openTokenBox && (
                <TokenList tokenDate={tokenData} setOpenTokenBox={setOpenTokenBox} />
                
              )}
             
    </div>
  )
}

export default NavBar