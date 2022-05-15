import { useState } from 'react';
import style from './style.module.scss';


export default function Produto(item) {

  //desestruturação do produto
  const { NOME, VALOR, SUBCATEGORIA } = item.produto;

  //estado para manipulação da quantidade de cada produto
  const [quantidade, setQuantidade] = useState(0);

  //Adicionar valor a quantidade
  function addQuantidade() {
    setQuantidade(quantidade + 1);
    item.AddValorProdutos(parseFloat(VALOR));
  }

  //remover valor de quantidade
  function removeQuantidade() {
    setQuantidade(quantidade - 1);
    item.AddValorProdutos(parseFloat(-VALOR));
  }


  return (
    <div className={style.produto} >

      <div className={style.coluna}>
        <h2>{NOME}</h2>
      </div>

      <div className={style.coluna}>
        <h2>{SUBCATEGORIA}</h2>
      </div>

      <div className={style.coluna}>
        <h2>{VALOR}</h2>
      </div>

      <div className={style.coluna}>
        <button onClick={removeQuantidade} disabled={quantidade === 0}> - </button>
        <h2>{quantidade}</h2>
        <button onClick={addQuantidade}> + </button>
      </div>

      <div className={style.coluna}>
        <h2> {VALOR * quantidade}</h2>
      </div>

    </div >
  );
}