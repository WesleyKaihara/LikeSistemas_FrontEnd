import style from './style.module.scss';

export default function Header(props) {

  const { title } = props

  return (
    <header className={style.header}>
      <div><h1 className={style.title}>{title}</h1></div>
      <div className={style.coluna}>
        <nav>
          <ul className={style.menu}>
            <li><a href="/" className={style.menuItem}><p> Fazer Orçamento</p></a></li>
            <li><a href="/produtos" className={style.menuItem}><p>Cadastrar Produto</p> </a></li>
            <li><a href="/subCategorias" className={style.menuItem}><p>Cadastrar subCategoria</p></a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}