import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Categorias {
  Nome : string
}

const ListarCategorias: React.FC = () => {
  const [categorias, setCategorias] = useState<Categorias[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/categoria/listar')
      .then(response => setCategorias(response.data))
      .catch(error => console.error('ERRO!', error));
  }, []);

  return (
    <div>
      <h2>Lista de Categorias</h2>
      <Link to="/categoria/cadastrar">Cadastrar Categoria</Link>
      <ul>
        {categorias.map(categoria => (
          <li key={categoria.Nome}>
            {categoria.Nome}
            <Link to={`/categoria/alterar/${categoria.Nome}`}>Editar a Categoria</Link>
            <button onClick={() => handleDelete(categoria.Nome)}>Deletar a Categoria</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListarCategorias;
