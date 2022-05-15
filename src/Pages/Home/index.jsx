import style from './style.module.scss';

import React, { useEffect, useState } from 'react';
import Produto from '../../Components/Produto';

export default function Home() {

  const [serverData, setServerData] = useState();
  const [valorTotal, setValorTotal] = useState(0);


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

  function AddValorProdutos(valor) {
    setValorTotal(valorTotal + valor);
  }

  return (
    <div>
      <h1>Orçamento</h1>
      <hr />
      <h2>Lista de Produtos : </h2>
      {((typeof serverData === 'undefined') ? (
        <p>Loading ...</p>
      ) : (
        serverData.response.map((item) => (
          <Produto
            produto={item}
            key={item.ID}
            AddValorProdutos={(value) => AddValorProdutos(value)}
          />
        ))
      )
      )}
      <p>Valor total: {valorTotal}</p>
    </div>
  );
}