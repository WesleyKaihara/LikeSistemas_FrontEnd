import { useEffect, useState } from 'react';
import style from './style.module.scss';

export default function Clientes() {

  const [serverData, setServerData] = useState();

  useEffect(() => {
    fetch("/orcamento")
      .then(
        res => res.json()
      ).then(
        data => {
          setServerData(data);
        }
      )
  }, []);

  return (
    <section className={style.Clientes}>
      <header>
        <h1 className={style.title}>Lista de Clientes</h1>
      </header>

      <section className={style.subMenu}>
        <ul>
          <li><a href="/produtos"><p>Cadastrar Produto</p></a></li>
          <li><a href="/"><p>Fazer Orçamento</p></a></li>
        </ul>
      </section>

      <form action="/subcategorias" method="POST" className={style.form} autoComplete="off">
        <input
          type="text"
          name="nome"
          id="nome"
          placeholder='Nome do cliente'
          required />
        <button type="submit">Adicionar Cliente</button>
      </form>

      <main className={style.ClientesContainer}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
            </tr>
          </thead>
          <tbody>
            {((typeof serverData === 'undefined') ? (
              <tr><td> Loading ...</td><td></td></tr>
            ) : (
              serverData.response.map((item) => (
                <tr key={item.ID} className={style.tableRow}>
                  <td>{item.ID}</td>
                  <td>{item.NOME_CLIENTE}</td>
                </tr>

              ))
            )
            )}
          </tbody>
        </table>
      </main>

    </section>
  )
}