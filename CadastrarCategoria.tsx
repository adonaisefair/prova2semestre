import axios from 'axios';
import React, { useState } from 'react';

const CadastrarCategoria: React.FC = () => {
  const [nome, setNome] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/categoria/cadastrar', {
        Nome: nome
      });
      console.log('Categoria Cadastrada:', response.data);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome:</label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
      </div>
      <button type="submit">Cadastrar a Categoria</button>
    </form>
  );
}

export default CadastrarCategoria;
