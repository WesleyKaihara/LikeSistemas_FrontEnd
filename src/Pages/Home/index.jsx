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


  //inicia o sistema com todas as informações do banco de dados via proxy
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

  //Função para armazenar valor total do orçamento e adiciona valores em um array
  function AddValorProdutos(valor, quantidade, id) {

    setValorTotal(valorTotal + valor);

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

  //Função para montar query para adicionar valores ao banco de dados
  function montaQuery() {
    let queryProdutosOrcamento = '';

    //percorre todos os dados armazenados 
    orcamentoInfo.forEach((item, index) => {
      if (index === 0) {
        queryProdutosOrcamento += `INSERT INTO produtosOrcamento (PRODUTO,ORCAMENTO,QUANTIDADE) VALUES (${item.PRODUTO}, ${item.ORCAMENTO}, ${item.QUANTIDADE})`;
      } else {
        queryProdutosOrcamento += `,(${item.PRODUTO}, ${item.ORCAMENTO}, ${item.QUANTIDADE});`;
      }
    })

    //Após montar a Query, envia a requisição para a API
    requestOrcamento(queryProdutosOrcamento);
  }

  //Envia requisição para a API 
  function requestOrcamento(queryProdutosOrcamento) {

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


  function getCliente(option) {
    if (option.target.options[option.target.selectedIndex].value === 'Novo cliente') {
      window.location.href = "/clientes";
    } else {
      // setComprador(item.target.options[item.target.selectedIndex].value)
    }
  }

  return (
    <section className={style.orcamentos}>
      <header>
        <h1 className={style.title}>Orçamento</h1>
        <div className={style.clienteContainer}>
          <h2>Nome do Cliente: </h2>
          <select
            className={style.cliente}
            name="cliente"
            id="cliente"
            onClick={item => getCliente(item)}>

            <option
              className={style.option}>Selecionar cliente</option>
            <option
              className={`${style.option} ${style.novoCliente} `} >Novo cliente</option>


            {((typeof clientes === 'undefined') ? (
              <option>Loading ...</option>
            ) : (
              clientes.response.map((item) => (
                <option key={item.ID} value={item.ID} className={style.option}>{item.NOME_CLIENTE}</option>
              ))
            )
            )}

          </select>
        </div>
      </header>

      <section className={style.subMenu}>
        <ul>
          <li><a href="/produtos"><p>Cadastrar Produto</p></a></li>
          <li><a href="/subCategorias"><p>Cadastrar subCategoria</p></a></li>
        </ul>
      </section>

      <main>
        <div className={style.orcamentoContainer}>
          <h2 className={style.subTitle}>Lista de Produtos : </h2>

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
                  <tr><td>Loading ... </td></tr>
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
          <p className={style.valorFinal}>Valor total: R$ {valorTotal.toFixed(2)}</p>
          <button onClick={montaQuery} className={style.finaliza}>Finalizar Orçamento</button>
        </div>
      </main>

    </section >
  );
}