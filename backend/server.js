import express from "express";
import cors from "cors";
import conexao from "./db.js"

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3000, () => {
    console.log("Servidor rodando!");
});

app.get("/livros", (req, res) => {
    conexao.query(
        "SELECT * FROM livros",
        (erro, resultado) => {
            if (erro) {
                res.status(500).json({
                    erro: "Erro ao buscar livros."
                });
                return;
            }
            res.json(resultado);
        }
    );
});

app.post("/livros", (req, res) => {
    const {titulo, autor, categoria} = req.body;
    const sql = `
        INSERT INTO livros
        (titulo, autor, categoria)
        VALUES(?, ?, ?)
    `;

    conexao.query(
        sql,
        [titulo, autor, categoria],
        (erro, resultado) => {
            if (erro) {
                res.status(500).json({
                    erro: "Erro ao cadastrar livro."
                });
                return;
            }
            if (resultado.affectedRows === 0) {
                res.status(404).json({
                    erro: "Livro não encontrado."
                });
                return;
            }
            res.status(201).json({
                mensagem: "Livro cadastrado com sucesso!"
            });
        }
    );
});          

app.delete("/livros/:id", (req,res) => {
    const {id} = req.params;

    const sql = `
        DELETE FROM livros
        WHERE id = ?
    `;

    conexao.query(sql, [id], (erro, resultado) => {
        if(erro) {
            res.status(500).json({
                erro: "Erro ao excluir o livro."
            });
            return;
        }
        if (resultado.affectedRows === 0) {
            res.status(404).json({
                erro: "Livro não encontrado."
            });
            return;
        }
        res.json({
            mensagem: "Livro excluído com sucesso!"
        });
    });
});

app.put("/livros/:id", (req, res) => {
    const {id} = req.params;
    const {titulo, autor, categoria} = req.body;

    const sql = `
        UPDATE livros
        SET
        titulo = ?,
        autor = ?,
        categoria = ?
        WHERE id = ?
    `;

    conexao.query(
        sql,
        [titulo, autor, categoria, id],
        (erro, resultado) => {
            if (erro) {
                res.status(500).json({
                    erro: "Erro ao atualizar livro."
                });
                return;
            }
            if (resultado.affectedRows === 0) {
                res.status(404).json({
                    erro: "Livro não encontrado."
                });
                return;
            }
            res.json({
                mensagem: "Livro atualizado com sucesso!"
            });
        }
    );
});