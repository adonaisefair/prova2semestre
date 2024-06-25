import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Tarefa {
  id: number;
  Titulo: string;
  Descricao: string;
}

const ListarTarefas: React.FC = () => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/tarefas/listar')
      .then(response => setTarefas(response.data))
      .catch(error => console.error('ERRO!', error));
  }, []);


  return (
    <div>
      <h2>Lista de Tarefas</h2>
      <Link to="/tarefas/cadastrar">Cadastrar Tarefas</Link>
      <ul>
        {tarefas.map(tarefa => (
          <li key={tarefa.id}>
            {tarefa.Titulo} - {tarefa.Descricao} - {tarefa.id}
            <Link to={`/paciente/alterar/${tarefa.id}`}>Editar a tarefa</Link>
            <button onClick={() => handleDelete(tarefa.id)}>Deletar a tarefa</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListarTarefas;
