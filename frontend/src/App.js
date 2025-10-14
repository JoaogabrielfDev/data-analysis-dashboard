import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [dados, setDados] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [arquivo, setArquivo] = useState(null);

  function handleArquivo(e) {
    setArquivo(e.target.files[0]);
  }

  function importarPlanilha() {
    if (!arquivo) {
      alert('Selecione um arquivo Excel!');
      return;
    }
    const formData = new FormData();
    formData.append('arquivo', arquivo);

    fetch('http://localhost:8000/importar-planilha/', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        alert(data.mensagem || data.erro);
        buscarDados();
      })
      .catch(error => {
        alert('Erro ao importar: ' + error);
      });
  }

  function buscarDados() {
    fetch('http://localhost:8000/dados/')
      .then(response => response.json())
      .then(data => setDados(data))
      .catch(error => console.error('Erro ao buscar dados:', error));
  }

  useEffect(() => {
    buscarDados();
  }, []);

  function handleEdit(item) {
    setEditId(item.id);
    setEditForm({ ...item });
  }

  function handleChange(e) {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  }

  function salvarEdicao(id) {
    fetch(`http://localhost:8000/atualizar-pessoa/${id}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    })
      .then(response => response.json())
      .then(data => {
        alert(data.mensagem || data.erro);
        setEditId(null);
        buscarDados();
      })
      .catch(error => alert('Erro ao atualizar: ' + error));
  }

  return (
    <div className="App">
      <div className="container">
        <h2 className="titulo">Tabela de dados de pessoas</h2>

        <div className='input-exel'>
          <input type="file" accept=".xlsx,.xls" onChange={handleArquivo} style={{color: 'white'}} />
          <button className="botao" onClick={importarPlanilha}>Importar Planilha</button>
        </div>

        
        <table className="tabela">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Idade</th>
              <th>Data de Nascimento</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {dados.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  {editId === item.id ? (
                    <input name="nome" value={editForm.nome} onChange={handleChange} />
                  ) : item.nome}
                </td>
                <td>
                  {editId === item.id ? (
                    <input name="idade" value={editForm.idade} onChange={handleChange} />
                  ) : item.idade}
                </td>
                <td>
                  {editId === item.id ? (
                    <input name="data_nascimento" value={editForm.data_nascimento} onChange={handleChange} />
                  ) : item.data_nascimento}
                </td>
                <td>
                  {editId === item.id ? (
                    <input name="email" value={editForm.email} onChange={handleChange} />
                  ) : item.email}
                </td>
                <td>
                  {editId === item.id ? (
                    <>
                      <button className="botao" onClick={() => salvarEdicao(item.id)}>Salvar</button>
                      <button className="botao" onClick={() => setEditId(null)}>Cancelar</button>
                    </>
                  ) : (
                    <button className="botao" onClick={() => handleEdit(item)}>Editar</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;