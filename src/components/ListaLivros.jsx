function ListaLivros({
    livros,
    editarLivro,
    excluirLivro
}) {
    return (
        <div>
            <h2>Livros Cadastrados</h2>

            {livros.map((livro) => (
                <div key={livro.id} className="livro">
                    <h3>{livro.titulo}</h3>
                    <p>Autor: {livro.autor}</p>
                    <p>Categoria: {livro.categoria}</p>

                    <button onClick={() => editarLivro(livro.id)}>Editar</button>
                    
                    <button className="btn-delete" onClick={() => excluirLivro(livro.id)}>
                    Excluir
                    </button>

                    <hr/>
                </div>
      ))
      }
        </div>
    );
}

export default ListaLivros;