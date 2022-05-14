import './App.css';

import React, { useEffect, useState } from 'react';

function App() {

  const [serverData, setServerData] = useState();

  useEffect(() => {
    fetch("/subCategorias")
      .then(
        res => res.json()
      ).then(
        data => {
          setServerData(data);
        }
      )
  }, []);


  return (
    <div>
      {((typeof serverData === 'undefined') ? (
        <p>Loading ...</p>
      ) : (
        serverData.response.map((item) => (
          <p key={item.ID}>{item.NOME}</p>
        ))
      )
      )}
    </div>
  );
}

export default App;
