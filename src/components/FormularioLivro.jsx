function FormularioLivro({
    titulo,
    autor,
    categoria,
    mensagem,
    tipoMensagem,
    cadastrarLivro,
    indiceEdicao,
    setTitulo,
    setAutor,
    setCategoria,
    limparMensagem    
}) {
    return (
        <div>
            <h2>Cadastrar Livro</h2>

            {mensagem && (
            <p className={tipoMensagem}>
            {mensagem}
            </p>
        )}

        <label>Título</label>

        <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => {
            setTitulo(e.target.value)
            limparMensagem();
        }}
        />

        <br/>

        <label>Autor</label>

        <input
        type="text"
        placeholder="Autor"
        value={autor}
        onChange={(e) => {
            setAutor(e.target.value)
            limparMensagem();
        }}
        />

        <br/>

        <label>Categoria</label>

        <input
        type="text"
        placeholder="Categoria"
        value={categoria}
        onChange={(e) => {
            setCategoria(e.target.value)
            limparMensagem();
        }}
        />

        <br/>

        <button onClick={cadastrarLivro}>
            {indiceEdicao !== null ? "Salvar" : "Cadastrar"}
        </button>
            </div>
    );
}

export default FormularioLivro;