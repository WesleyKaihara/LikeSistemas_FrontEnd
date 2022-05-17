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
    <tr className={style.produto} >

      <td className={style.coluna}>
        <h2 >{NOME}</h2>
      </td>

      <td className={`${style.coluna} ${style.center}`}>
        <h2>{SUBCATEGORIA}</h2>
      </td>

      <td className={`${style.coluna} ${style.center}`}>
        <h2 className={style.valor}>{VALOR}</h2>
      </td>

      <td className={style.coluna}>
        <div className={style.quantidade}>
          <p onClick={removeQuantidade} className={style.btn}> - </p>
          <h2>{quantidade}</h2>
          <p onClick={addQuantidade} className={`${style.btn} ${style.acrescentar}`}> + </p>
        </div>
      </td>

      <td className={`${style.coluna} ${style.center}`}>
        <h2 className={style.valor}> {(VALOR * quantidade).toFixed(2)}</h2>
      </td>

    </ tr>
  );
}