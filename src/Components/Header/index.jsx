import style from './style.module.scss';

import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

export default function Header(props) {

  const { title } = props

  const [visibilidade, setVisibilidade] = useState("");

  function mobileMenu() {
    (visibilidade === "style_visivel__1t1xF") ? setVisibilidade("") : setVisibilidade("style_visivel__1t1xF");
  }

  return (
    <header className={style.header}>
      <div className={style.mobileContainer}>
        <h1 className={style.title}>{title}</h1>

        <MenuIcon className={style.mobileMenu} onClick={mobileMenu} />
      </div>


      <nav className={`${style.coluna} ${visibilidade}`}>
        <ul className={style.menu} >
          <li><a href="/" className={style.menuItem}><p> Fazer Orçamento</p></a></li>
          <li><a href="/produtos" className={style.menuItem}><p>Cadastrar Produto</p> </a></li>
          <li><a href="/subCategorias" className={style.menuItem}><p>Cadastrar subCategoria</p></a></li>
        </ul>
      </nav>

    </header >
  )
}