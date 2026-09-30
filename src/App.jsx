import { useState } from 'react';
import './App.css';

function App() {
  const [chamados, setChamados] = useState([
    {
      id: 1,
      cliente: 'Maria Silva',
      titulo: 'Internet sem conexão',
      categoria: 'Internet',
      prioridade: 'Alta',
      status: 'Aberto'
    }
  ]);

  const [cliente, setCliente] = useState('');
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [prioridade, setPrioridade] = useState('');

  function cadastrarChamado(event) {
    event.preventDefault();

    if (!cliente || !titulo || !categoria || !prioridade) {
      alert('Preencha todos os campos.');
      return;
    }

    const novoChamado = {
      id: chamados.length + 1,
      cliente: cliente,
      titulo: titulo,
      categoria: categoria,
      prioridade: prioridade,
      status: 'Aberto'
    };

    setChamados([...chamados, novoChamado]);

    setCliente('');
    setTitulo('');
    setCategoria('');
    setPrioridade('');
  }

  function alterarStatus(id) {
  const novosChamados = chamados.map((chamado) => {
    if (chamado.id === id) {
      return {
        ...chamado,
        status: chamado.status === 'Aberto'
          ? 'Em andamento'
          : chamado.status === 'Em andamento'
          ? 'Resolvido'
          : 'Aberto'
      };
    }

    return chamado;
  });

  setChamados(novosChamados);
}

function excluirChamado(id) {
  const novosChamados = chamados.filter((chamado) => chamado.id !== id);

  setChamados(novosChamados);
}

  return (
    <div>
      <h1>Sistema de Chamados de Suporte</h1>

      <h2>Novo chamado</h2>

      <form onSubmit={cadastrarChamado}>
        <input
          placeholder="Nome do cliente"
          value={cliente}
          onChange={(event) => setCliente(event.target.value)}
        />

        <input
          placeholder="Título do chamado"
          value={titulo}
          onChange={(event) => setTitulo(event.target.value)}
        />

        <select
          value={categoria}
          onChange={(event) => setCategoria(event.target.value)}
        >
          <option value="">Selecione a categoria</option>
          <option>Internet</option>
          <option>Sistema</option>
          <option>Equipamento</option>
          <option>Acesso</option>
        </select>

        <select
          value={prioridade}
          onChange={(event) => setPrioridade(event.target.value)}
        >
          <option value="">Selecione a prioridade</option>
          <option>Baixa</option>
          <option>Média</option>
          <option>Alta</option>
        </select>

        <button type="submit">Cadastrar chamado</button>
      </form>

     <h2>Chamados cadastrados</h2>

       {chamados.map((chamado) => (
    <div key={chamado.id}>
    <h3>{chamado.titulo}</h3>

    <p>Cliente: {chamado.cliente}</p>
    <p>Categoria: {chamado.categoria}</p>
    <p>Prioridade: {chamado.prioridade}</p>
    <p>Status: {chamado.status}</p>

    <button onClick={() => alterarStatus(chamado.id)}>
      Alterar status
    </button>

    <button onClick={() => excluirChamado(chamado.id)}>
      Excluir
    </button>
  </div>
))}
     
    </div>
  );
}

export default App;