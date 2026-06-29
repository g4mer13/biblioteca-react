import { useEffect, useState } from "react";
import "./App.css"
import FormularioLivro from "./components/FormularioLivro";
import ListaLivros from "./components/ListaLivros";

function App () {

  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");
  const [livros, setLivros] = useState([]);
  const [idEdicao, setIdEdicao] = useState(null);

  async function cadastrarLivro() {
    if (titulo.trim() === "" || autor.trim() === "" || categoria.trim() === "") {
      mostrarMensagem("Preencha todos os campos antes de cadastrar!", "erro");
      return;
    }

    const livroExiste = livros.some((livro) => {
      return (
        livro.id !== idEdicao &&
        livro.titulo === titulo &&
        livro.autor === autor
      );
    });

    if (livroExiste) {
      mostrarMensagem("Este livro já está cadastrado!", "erro");
      return;
    }

    const novoLivro = {
      titulo,
      autor,
      categoria
    };

    if (idEdicao !== null) {
      await fetch(`http://localhost:3000/livros/${idEdicao}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(novoLivro)
      });

      await buscarLivros();

      setIdEdicao(null);

      mostrarMensagem("Livro atualizado com sucesso!", "sucesso");
    } else {
      await fetch("http://localhost:3000/livros", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(novoLivro)
      });

      await buscarLivros();
      
      mostrarMensagem("Livro cadastrado com sucesso!", "sucesso");
    }

    limparFormulario()
  }

  async function excluirLivro(id) {
    await fetch(`http://localhost:3000/livros/${id}`, {
      method: "DELETE"
    });

    await buscarLivros();
    mostrarMensagem("Livro deletado com sucesso!", "sucesso");
  }

  function editarLivro(id) {
    const livro = livros.find((livro) => livro.id === id);
    
    setTitulo(livro.titulo);
    setAutor(livro.autor);
    setCategoria(livro.categoria);
    setIdEdicao(id);
  }

  function limparFormulario() {
    setTitulo("");
    setAutor("");
    setCategoria("");
  }

  function limparMensagem() {
    setMensagem("");
    setTipoMensagem("");
}

function mostrarMensagem(texto, tipo) {
    setMensagem(texto);
    setTipoMensagem(tipo);

    setTimeout(() => {
      limparMensagem();
    }, 3000);
}

async function buscarLivros() {
  const resposta = await fetch("http://localhost:3000/livros");
  const dados = await resposta.json();

  setLivros(dados);
}

useEffect(() => {
  buscarLivros();
}, []);
  return (
    <div className="container">

      <h1>Sistema de Biblioteca</h1>

      <FormularioLivro
        titulo={titulo}
        autor={autor}
        categoria={categoria}
        mensagem={mensagem}
        tipoMensagem={tipoMensagem}
        cadastrarLivro={cadastrarLivro}
        idEdicao={idEdicao}
        setTitulo={setTitulo}
        setAutor={setAutor}
        setCategoria={setCategoria}
        limparMensagem={limparMensagem}
      />

      <ListaLivros
        livros={livros}
        editarLivro={editarLivro}
        excluirLivro={excluirLivro}
      />

    </div>
  );
}

export default App;