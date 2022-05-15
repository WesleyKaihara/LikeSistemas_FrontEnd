import { useEffect, useState } from 'react';
import style from './style.module.scss';


export default function Produto(props) {

  //desestruturação do produto
  const { ID, NOME, VALOR, SUBCATEGORIA } = props.produto;

  //estado para manipulação da quantidade de cada produto
  const [quantidade, setQuantidade] = useState(0);

  //Adicionar valor a quantidade
  function addQuantidade() {
    setQuantidade(quantidade + 1);
    props.AddValorProdutos(parseFloat(VALOR), quantidade + 1, ID);
  }

  //remover valor de quantidade
  function removeQuantidade() {
    if (quantidade > 0) {
      setQuantidade(quantidade - 1);
      props.AddValorProdutos(parseFloat(-VALOR), quantidade - 1, ID);
    }
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
        <p onClick={removeQuantidade}> - </p>
        <h2>{quantidade}</h2>
        <p onClick={addQuantidade}> + </p>
      </div>

      <div className={style.coluna}>
        <h2> {VALOR * quantidade}</h2>
      </div>

    </div >
  );
}