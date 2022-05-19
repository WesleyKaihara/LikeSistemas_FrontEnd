import { useEffect, useState } from 'react';
import style from './style.module.scss';

import Header from '../../Components/Header';

export default function Produtos() {

  const [serverData, setServerData] = useState();
  const [categorias, setCategorias] = useState();

  useEffect(() => {
    fetch("/produtos")
      .then(
        res => res.json()
      ).then(
        data => {
          setServerData(data);
        }
      )

    fetch("/subCategorias")
      .then(
        res => res.json()
      ).then(
        data => {
          setCategorias(data);
        }
      )

  }, []);

  function deleteProduto(item) {

    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        idProduto: item.target.id
      })
    };
    fetch('/produtos', requestOptions)
      .then(response => response.json())

    item.target.style.color = 'red';
    let itens = document.getElementsByName(item.target.id);

    itens.forEach((item, index) => {
      item.style.color = 'red';
    })
  }


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
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {((typeof serverData === 'undefined') ? (
              <tr><td> Loading ...</td></tr>
            ) : (
              serverData.response.map((item) => (
                <tr key={item.ID} className={style.tableRow}>
                  <td name={item.ID}>{item.ID}</td>
                  <td name={item.ID}>{item.NOME}</td>
                  <td name={item.ID}>R$ {item.VALOR}</td>
                  <td
                    onClick={(item) => deleteProduto(item)}
                    className={style.deletarBtn}
                    id={item.ID}
                  >X</td>
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
          <select
            className={style.categorias}
            name="idSubCategoria"
            id="idSubCategoria">

            <option
              className={style.option}>Selecionar SubCategoria</option>

            {((typeof categorias === 'undefined') ? (
              <option>Loading ...</option>
            ) : (
              categorias.response.map((item) => (
                <option key={item.ID} value={item.ID} className={style.option}>{item.NOME}</option>
              ))
            )
            )}

          </select>

          <button type="submit">Adicionar produto</button>
        </form>

      </main>

    </section>
  )
}