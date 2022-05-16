import style from './style.module.scss';

import React, { useEffect, useState } from 'react';
import Produto from '../../Components/Produto';

export default function Home() {

  //produtos database
  const [serverData, setServerData] = useState();

  //calculo valor total compra
  const [valorTotal, setValorTotal] = useState(0);

  //Cliente database
  const [clientes, setClientes] = useState();

  //Cliente que fez a compra
  const [comprador, setComprador] = useState('');

  //Pegar Dados
  const [orcamentoInfo, setOrcamentoInfo] = useState([]);

  useEffect(() => {
    fetch("/produtos")
      .then(
        res => res.json()
      ).then(
        data => {
          setServerData(data);
        }
      )

    fetch("/orcamento")
      .then(
        res => res.json()
      ).then(
        data => {
          setClientes(data);
        }
      )

  }, []);

  function AddValorProdutos(valor, quantidade, id) {

    setValorTotal(valorTotal + valor);

    console.log(orcamentoInfo);


    //Verifica se produto ja existe no armazenamento
    orcamentoInfo.length > 0 ? (
      orcamentoInfo.forEach((produto, index) => {

        //Atualização de orçamento existente
        if (produto.PRODUTO === id) {
          orcamentoInfo[index] = {
            PRODUTO: id,
            ORCAMENTO: comprador,
            QUANTIDADE: quantidade
          }

          //apos verificar todos e não encontrar igual, adiciona novo orçamento
        } else if (orcamentoInfo.length - 1 === index) {
          orcamentoInfo.push(
            {
              PRODUTO: id,
              ORCAMENTO: comprador,
              QUANTIDADE: quantidade
            }
          )
        }

      })

      //primeiro orçamento (Não precisa verifcar orçamentos existentes)
    ) : orcamentoInfo.push({
      PRODUTO: id,
      ORCAMENTO: comprador,
      QUANTIDADE: quantidade
    }
    );
  }


  function montaQuery() {

    let queryProdutosOrcamento = '';

    orcamentoInfo.forEach((item, index) => {
      if (index === 0) {
        queryProdutosOrcamento += `INSERT INTO produtosOrcamento (PRODUTO,ORCAMENTO,QUANTIDADE) VALUES (${item.PRODUTO}, ${item.ORCAMENTO}, ${item.QUANTIDADE})`;
      } else {
        queryProdutosOrcamento += `,(${item.PRODUTO}, ${item.ORCAMENTO}, ${item.QUANTIDADE});`;
      }
    })
    requestOrcamento(queryProdutosOrcamento);
  }

  function requestOrcamento(queryProdutosOrcamento) {

    console.log(queryProdutosOrcamento);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        queries: queryProdutosOrcamento
      })
    };
    fetch('/orcamentoProdutos/teste', requestOptions)
      .then(response => response.json())

  }

  return (
    <section className={style.orcamentos}>
      <h1 className={style.title}>Orçamento</h1>
      <hr />

      <div className={style.orcamentoContainer}>
        <select name="cliente" id="cliente" onClick={item => setComprador(item.target.options[item.target.selectedIndex].value)}>
          <option>nome do cliente</option>
          {((typeof clientes === 'undefined') ? (
            <option>Loading ...</option>
          ) : (
            clientes.response.map((item) => (
              <option key={item.ID} value={item.ID} >{item.NOME_CLIENTE}</option>
            ))
          )
          )}
        </select>

        <h2>Lista de Produtos : </h2>

        <table id="produtos" className={style.listaProdutos}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>SubCategoria</th>
              <th>Valor</th>
              <th>Quantidade</th>
              <th>Valor Final</th>
            </tr>
          </thead>
          <tbody>
            {
              ((typeof serverData === 'undefined') ? (
                <p>Loading ...</p>
              ) : (
                serverData.response.map((item) => (
                  <Produto
                    produto={item}
                    key={item.ID}
                    AddValorProdutos={(value, quantidade, id) => AddValorProdutos(value, quantidade, id)}
                  />
                ))
              )
              )
            }
          </tbody>
        </table>

        <button onClick={montaQuery}>Finalizar orçamento</button>

        <p>Valor total: {valorTotal}</p>

      </div>

    </section >
  );
}