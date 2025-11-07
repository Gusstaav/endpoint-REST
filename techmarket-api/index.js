// Importa dependências
const express = require('express');
const { v4: uuidv4 } = require('uuid'); // Gera código único
const app = express();

app.use(express.json());

// Simulação de dados de contas
let contas = [
  { id: 1, nome: "Gustavo", saldo: 5000 },
  { id: 2, nome: "Mariana", saldo: 3000 }
];

// Endpoint para transferência
app.post('/transferencia', (req, res) => {
  const { origem, destino, valor } = req.body;

  const contaOrigem = contas.find(c => c.id === origem);
  const contaDestino = contas.find(c => c.id === destino);

  if (!contaOrigem || !contaDestino) {
    return res.status(404).json({ erro: "Conta não encontrada" });
  }

  if (contaOrigem.saldo < valor) {
    return res.status(400).json({ erro: "Saldo insuficiente" });
  }

  // Processa a transferência
  contaOrigem.saldo -= valor;
  contaDestino.saldo += valor;

  const codigo = uuidv4(); // Gera código único

  const transacao = {
    codigo,
    origem: contaOrigem.nome,
    destino: contaDestino.nome,
    valor,
    data: new Date().toISOString()
  };

  console.log("Transação registrada:", transacao);

  return res.status(200).json({
    mensagem: "Transferência realizada com sucesso!",
    transacao
  });
});

// Inicializa servidor
app.listen(3000, () => {
  console.log("API de transferências rodando na porta 3000");
});
