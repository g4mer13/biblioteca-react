import mysql from "mysql2";

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "bD#12",
    database: "biblioteca"
});

conexao.connect((erro) => {
    if (erro) {
        console.log("Erro ao conectar ao banco de dados!");
        console.log(erro);
        return;
    }
    console.log("Banco de dados conectado com sucesso!");
});

export default conexao;