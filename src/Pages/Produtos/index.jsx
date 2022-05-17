import { useEffect, useState } from 'react';
import style from './style.module.scss';

import Header from '../../Components/Header';

export default function SubCategorias() {

  const [serverData, setServerData] = useState();

  useEffect(() => {
    fetch("/produtos")
      .then(
        res => res.json()
      ).then(
        data => {
          setServerData(data);
        }
      )
  }, []);

  return (
    <section className={style.produtos}>

      <Header
        title="Lista de Produtos" />
      <main>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {((typeof serverData === 'undefined') ? (
              <tr><td> Loading ...</td></tr>
            ) : (
              serverData.response.map((item) => (
                <tr key={item.ID} className={style.tableRow}>
                  <td>{item.ID}</td>
                  <td>{item.NOME}</td>
                  <td>R$ {item.VALOR}</td>
                </tr>

              ))
            )
            )}
          </tbody>
        </table>

        <form action="/produtos" method="POST" autoComplete="off" className={style.form}>
          <label htmlFor="nome">Nome Produto</label>
          <input
            type="text"
            name="nome"
            id="nome"
            placeholder='Nome do produto'
            required />
          <label htmlFor="valor">Valor</label>
          <input
            type="number"
            name="valor"
            id="valor"
            placeholder='Valor do Produto'
            required />
          <label htmlFor="idSubCategoria">SubCategoria</label>
          <input
            type="number"
            name="idSubCategoria"
            id="idSubCategoria"
            placeholder='Id da subCategoria'
            required />

          <button type="submit">Adicionar produto</button>
        </form>

      </main>

    </section>
  )
}