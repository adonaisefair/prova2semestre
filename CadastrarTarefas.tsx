import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';


interface AlterarTarefa {
  NovoTitulo: string;
  NovaDescricao: string;
  NovoStatus: string;
}

const AlterarTarefa: React.FC = () => {
  const [tarefas, setTarefas] = useState<Tarefa>({ Titulo: '', Descricao: '', id: '' });
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/tarefas/listar/${id}`)
        .then(response => setTarefas(response.data))
        .catch(error => console.error('ERRO!', error));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { Titulo, value } = e.target;
    setTarefas(prevState => ({ ...prevState, [titulo]: value }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      axios.put(`http://localhost:5000/api/tarefas/alterar/${id}`, tarefas)
        .then(() => history.push('/tarefas'))
        .catch(error => console.error('ERRO!', error));
    } else {
      axios.post('http://localhost:5000/tarefas/cadastrar', tarefas)
        .then(() => history.push('/organs'))
        .catch(error => console.error('ERRO!', error));
    }
  }

  return (
    <div>
      <h2>{id ? 'Editar Tarefas' : 'Cadastrar Tarefas'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Titulo:
          <input type="text" name="Titulo" value={tarefas.Titulo} onChange={handleChange} />
        </label>
        <label>
          Descrição:
          <input type="text" name="descricao" value={tarefas.Descricao} onChange={handleChange} />
        </label>
        <label>
          Id:
          <input type="text" name="id" value={tarefas.id} onChange={handleChange} />
        </label>
        <button type="submit">{id ? 'Salvar Alteração' : 'Cadastrar'}</button>
      </form>
    </div>
  );
}

export default CadastrarTarefas;
