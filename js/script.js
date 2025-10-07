// Objeto principal que gerencia o estado do jogo e o progresso do aluno.
        const SanduicheProgramado = {
            // 1. Dados do Jogador
            jogador: {
                nome: "Chef Mirim",
                ingredientesConquistados: [], // Armazena os IDs dos ingredientes/conquistas
                progressoTotal: 0
            },

            // 2. Definição das Conquistas (Ingredientes)
            conquistas: [
                { id: 'tomate', nome: 'Tomate', conceito: 'Sequência', elemento: '🍅' },
                { id: 'alface', nome: 'Alface', conceito: 'Repetição', elemento: '🥬' },
                { id: 'bacon', nome: 'Bacon', conceito: 'Funções/Variáveis', elemento: '🥓' },
                { id: 'queijo', nome: 'Queijo', conceito: 'Condicional', elemento: '🧀' },
                { id: 'pao', nome: 'Pão Integral', conceito: 'Debugging', elemento: '🍞' }
            ],

            // 3. Funções de Inicialização e Atualização
            iniciar: function() {
                console.log("Sanduíche Programado Iniciado!");
                this.configurarBotoes();
                this.atualizarProgressoVisual();
            },

            // 4. Configura os eventos de clique para todos os botões "Jogar"
            configurarBotoes: function() {
                const botoesJogar = document.querySelectorAll('.game-card button');

                botoesJogar.forEach(button => {
                    // O nome do jogo é passado diretamente no onclick do HTML
                });
            },

            // Função de utilidade para abrir um modal
            abrirModal: function(idModal) {
                document.getElementById(idModal).style.display = 'block';
                
                // Inicializa a lógica específica do jogo
                if (idModal === 'modal-sequencia') {
                    document.getElementById('algoritmo-preparo').innerHTML = '<h4>Algoritmo de Preparo (Arraste para cá)</h4>';
                    document.getElementById('resultado-sequencia').textContent = '';
                    this.logicaSequenciaMagica();
                } else if (idModal === 'modal-labirinto') {
                    document.getElementById('comandos-repeticao').innerHTML = '<h4>Comandos de Execução (Arraste para cá)</h4>';
                    document.getElementById('resultado-labirinto').textContent = '';
                    this.logicaLabirintoLogico();
                } else if (idModal === 'modal-memoria') { 
                    document.getElementById('iniciar-memoria').style.display = 'block';
                    document.getElementById('tabuleiro-memoria').innerHTML = '<p>Clique em INICIAR JOGO para embaralhar os comandos...</p>';
                    document.getElementById('feedback-memoria').textContent = '';
                    this.logicaMemoriaComandos(); 
                } else if (idModal === 'modal-condicional') {
                    document.getElementById('estrutura-se-entao').innerHTML = '<h4>Estrutura SE/ENTÃO/SENÃO (Arraste para cá)</h4>';
                    document.getElementById('resultado-condicional').textContent = '';
                    this.logicaBlocosCodigo();
                } else if (idModal === 'modal-final') {
                    document.getElementById('resultado-final').textContent = '';
                    this.logicaMontaSanduiche();
                }
            },

            // Função de utilidade para fechar um modal
            fecharModal: function(idModal) {
                document.getElementById(idModal).style.display = 'none';
            },

            // Função que simula o início de um jogo (chamada pelo HTML)
            iniciarJogo: function(nomeJogo) {
                console.log(`Iniciando o jogo: ${nomeJogo}`);
                
                if (nomeJogo === "Sequência Mágica") {
                    this.abrirModal('modal-sequencia');
                } else if (nomeJogo === "Labirinto Lógico") { 
                    this.abrirModal('modal-labirinto');
                } else if (nomeJogo === "Memória de Comandos") {
                    this.abrirModal('modal-memoria');
                } else if (nomeJogo === "Blocos de Código") {
                    this.abrirModal('modal-condicional');
                } else if (nomeJogo === "Monta Sanduíche") {
                    this.abrirModal('modal-final');
                } else {
                    alert(`Preparando a Cozinha para o jogo "${nomeJogo}"! (Ainda em construção...)`);
                }
            },

            // 5. Função para registrar uma nova conquista
            conquistarIngrediente: function(idIngrediente) {
                if (!this.jogador.ingredientesConquistados.includes(idIngrediente)) {
                    this.jogador.ingredientesConquistados.push(idIngrediente);
                    this.jogador.progressoTotal = this.jogador.ingredientesConquistados.length;
                    
                    const conquista = this.conquistas.find(c => c.id === idIngrediente);
                    
                    alert(`🎉 Parabéns! Você conquistou o ingrediente ${conquista.elemento} (${conquista.nome}) e aprendeu sobre ${conquista.conceito}!`);
                    
                    this.atualizarProgressoVisual();
                }
            },

            // 6. Função para atualizar a seção "Meu Prato de Lógica"
            atualizarProgressoVisual: function() {
                const divProgresso = document.querySelector('#progresso div');
                
                const totalIngredientes = this.conquistas.length;
                const msg = `Parabéns! Você já conquistou **${this.jogador.progressoTotal} de ${totalIngredientes}** ingredientes. Continue jogando para montar seu Sanduíche de Ouro!`;

                let listaIngredientes = [];
                this.conquistas.forEach(c => {
                    if (this.jogador.ingredientesConquistados.includes(c.id)) {
                        listaIngredientes.push(`${c.elemento} (${c.conceito})`);
                    } else {
                        listaIngredientes.push(`❓ (${c.conceito})`);
                    }
                });

                divProgresso.innerHTML = `
                    <p>${msg}</p>
                    <div style="margin-top: 15px;">
                        ${listaIngredientes.join(' | ')}
                    </div>
                `;
            },
            
            // ====================================================================
            // LÓGICA DO JOGO 1: SEQUÊNCIA MÁGICA
            // ====================================================================
            logicaSequenciaMagica: function() {
                const SEQUENCIA_CORRETA = [
                    "Colocar Pão em Baixo",
                    "Colocar Queijo",
                    "Colocar Pão em Cima"
                ];

                const areaPreparo = document.getElementById('algoritmo-preparo');
                const btnExecutar = document.getElementById('executar-sequencia');
                const resultadoDiv = document.getElementById('resultado-sequencia');
                const comandosPool = document.getElementById('comandos-disponiveis');

                document.querySelectorAll('#modal-sequencia .comando').forEach(comando => {
                    comando.setAttribute('draggable', true); 
                    comando.addEventListener('dragstart', (e) => {
                        e.dataTransfer.setData('text/plain', e.target.dataset.comando);
                        e.target.classList.add('dragging');
                    });
                    comando.addEventListener('dragend', (e) => {
                        e.target.classList.remove('dragging');
                    });
                });

                areaPreparo.addEventListener('drop', (e) => {
                    e.preventDefault();
                    const data = e.dataTransfer.getData('text/plain');
                    const draggedElement = document.querySelector(`[data-comando="${data}"].dragging`);
                    
                    const clone = draggedElement.cloneNode(true);
                    clone.classList.remove('dragging');
                    clone.removeAttribute('draggable');

                    const btnRemover = document.createElement('span');
                    btnRemover.innerHTML = ' ❌';
                    btnRemover.style.cursor = 'pointer';
                    btnRemover.onclick = function() { areaPreparo.removeChild(clone); };
                    clone.appendChild(btnRemover);

                    areaPreparo.appendChild(clone);
                });
                areaPreparo.addEventListener('dragover', (e) => { e.preventDefault(); });

                btnExecutar.onclick = function() {
                    let comandosAluno = [];
                    areaPreparo.querySelectorAll('.comando').forEach(comando => {
                        comandosAluno.push(comando.dataset.comando);
                    });

                    const alunoStr = comandosAluno.join('|');
                    const corretoStr = SEQUENCIA_CORRETA.join('|');

                    if (alunoStr === corretoStr) {
                        resultadoDiv.innerHTML = "✅ **Parabéns! Sanduíche perfeito!** Você dominou a Sequência Mágica!";
                        resultadoDiv.style.color = '#4CAF50';
                        SanduicheProgramado.conquistarIngrediente('tomate');
                        setTimeout(() => SanduicheProgramado.fecharModal('modal-sequencia'), 2000);

                    } else if (comandosAluno.length === 0) {
                        resultadoDiv.innerHTML = "⚠️ Você esqueceu de colocar os comandos!";
                        resultadoDiv.style.color = '#E65100';
                    } 
                    else {
                        resultadoDiv.innerHTML = `❌ **Opa!** A ordem dos ingredientes está errada. Tente novamente!`;
                        resultadoDiv.style.color = '#FF5722';
                    }
                };
            },

            // ====================================================================
            // LÓGICA DO JOGO 2: LABIRINTO LÓGICO
            // ====================================================================
            logicaLabirintoLogico: function() {
                const SEQUENCIA_CORRETA = [
                    "REPITA 10x",
                    "REPITA 5x",
                    "VIRAR DIREITA"
                ];
                
                const areaComandos = document.getElementById('comandos-repeticao');
                const btnExecutar = document.getElementById('executar-labirinto');
                const resultadoDiv = document.getElementById('resultado-labirinto');
                const blocosDisponiveis = document.getElementById('blocos-labirinto');

                blocosDisponiveis.querySelectorAll('.bloco-repeticao, .bloco-basico').forEach(bloco => {
                    bloco.setAttribute('draggable', true);
                    bloco.addEventListener('dragstart', (e) => {
                        e.dataTransfer.setData('text/plain', e.target.dataset.comando);
                        e.target.classList.add('dragging');
                    });
                    bloco.addEventListener('dragend', (e) => {
                        e.target.classList.remove('dragging');
                    });
                });

                areaComandos.addEventListener('drop', (e) => {
                    e.preventDefault();
                    const data = e.dataTransfer.getData('text/plain');
                    const draggedElement = document.querySelector(`[data-comando="${data}"].dragging`);
                    
                    const clone = draggedElement.cloneNode(true);
                    clone.classList.remove('dragging');
                    clone.removeAttribute('draggable');

                    const btnRemover = document.createElement('span');
                    btnRemover.innerHTML = ' ❌';
                    btnRemover.style.cursor = 'pointer';
                    btnRemover.onclick = function() { areaComandos.removeChild(clone); };
                    clone.appendChild(btnRemover);

                    areaComandos.appendChild(clone);
                });
                areaComandos.addEventListener('dragover', (e) => { e.preventDefault(); });

                btnExecutar.onclick = function() {
                    let comandosAluno = [];
                    areaComandos.querySelectorAll('.bloco-repeticao, .bloco-basico').forEach(comando => {
                        comandosAluno.push(comando.dataset.comando);
                    });
                    
                    const alunoStr = comandosAluno.join('|');
                    const corretoStr = SEQUENCIA_CORRETA.join('|');
                    
                    let passos = 0;
                    comandosAluno.forEach(cmd => {
                        if (cmd.includes("REPITA")) {
                            const match = cmd.match(/REPITA (\d+)x/);
                            if (match) passos += parseInt(match[1]);
                        }
                    });

                    if (alunoStr === corretoStr) {
                        resultadoDiv.innerHTML = `✅ **Perfeito!** Você usou a Repetição para dar ${passos} passos e encontrou a Alface!`;
                        resultadoDiv.style.color = '#4CAF50';
                        SanduicheProgramado.conquistarIngrediente('alface');
                        setTimeout(() => SanduicheProgramado.fecharModal('modal-labirinto'), 2000);

                    } else if (passos !== 15) {
                        resultadoDiv.innerHTML = `❌ **Opa!** Você deu ${passos} passos. Precisa ser 15 no total! Tente usar os blocos REPITA de forma diferente.`;
                        resultadoDiv.style.color = '#FF5722';
                    } else {
                         resultadoDiv.innerHTML = `❌ **Opa!** O número de passos está certo (15), mas a ordem ou o comando final está incorreto.`;
                        resultadoDiv.style.color = '#FF5722';
                    }
                };
            },

            // ====================================================================
            // LÓGICA DO JOGO 3: MEMÓRIA DE COMANDOS
            // ====================================================================
            logicaMemoriaComandos: function() {
                const PARES_MEMORIA = [
                    { id: 1, tipo: 'Função', nome: 'COZINHAR(pão)', valor: '🍞 Pão Quentinho' },
                    { id: 2, tipo: 'Função', nome: 'CONTAR(10)', valor: '🔟 Contagem até 10' },
                    { id: 3, tipo: 'Variável', nome: 'NOME_CLIENTE', valor: '"Maria"' },
                    { id: 4, tipo: 'Variável', nome: 'PRECO_FINAL', valor: 'R$ 55.00' }
                ];

                const tabuleiro = document.getElementById('tabuleiro-memoria');
                const btnIniciar = document.getElementById('iniciar-memoria');
                const feedbackDiv = document.getElementById('feedback-memoria');

                let cardsVirados = [];
                let bloqueio = false;
                let paresEncontrados = 0;

                const embaralhar = (array) => {
                    for (let i = array.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [array[i], array[j]] = [array[j], array[i]];
                    }
                    return array;
                };

                const criarTabuleiro = () => {
                    tabuleiro.innerHTML = '';
                    const todosOsPares = [];

                    PARES_MEMORIA.forEach(par => {
                        todosOsPares.push({ id: par.id, display: par.nome, tipo: 'comando' });
                        todosOsPares.push({ id: par.id, display: par.valor, tipo: 'valor' });
                    });

                    const cardsEmbaralhados = embaralhar(todosOsPares);

                    cardsEmbaralhados.forEach(cardData => {
                        const card = document.createElement('div');
                        card.classList.add('card-memoria');
                        card.dataset.id = cardData.id;

                        card.innerHTML = `<div class="content verso">?</div><div class="content frente">${cardData.display}</div>`;
                        
                        card.addEventListener('click', () => virarCard(card));
                        tabuleiro.appendChild(card);
                    });
                };

                const virarCard = (card) => {
                    if (bloqueio || card.classList.contains('flip') || card.classList.contains('match')) return;

                    card.classList.add('flip');
                    cardsVirados.push(card);

                    if (cardsVirados.length === 2) {
                        bloqueio = true;
                        checarPar();
                    }
                };

                const checarPar = () => {
                    const [card1, card2] = cardsVirados;

                    if (card1.dataset.id === card2.dataset.id) {
                        card1.classList.add('match');
                        card2.classList.add('match');
                        paresEncontrados++;

                        feedbackDiv.innerHTML = "🎯 Acerto! Par encontrado.";
                        feedbackDiv.style.color = '#4CAF50';

                        if (paresEncontrados === PARES_MEMORIA.length) {
                            feedbackDiv.innerHTML = "🏆 **Vitória!** Você dominou Variáveis e Funções!";
                            SanduicheProgramado.conquistarIngrediente('bacon');
                            setTimeout(() => SanduicheProgramado.fecharModal('modal-memoria'), 2000);
                        }

                        resetarViradas();
                    } else {
                        feedbackDiv.innerHTML = "😕 Erro! Tente outro par.";
                        feedbackDiv.style.color = '#FF5722';

                        setTimeout(() => {
                            card1.classList.remove('flip');
                            card2.classList.remove('flip');
                            resetarViradas();
                        }, 1000);
                    }
                };

                const resetarViradas = () => {
                    cardsVirados = [];
                    bloqueio = false;
                };

                btnIniciar.onclick = () => {
                    paresEncontrados = 0;
                    resetarViradas();
                    criarTabuleiro();
                    feedbackDiv.innerHTML = "Jogo iniciado! Procure os pares.";
                    btnIniciar.style.display = 'none';
                };

                criarTabuleiro();
            },

            // ====================================================================
            // LÓGICA DO JOGO 4: BLOCOS DE CÓDIGO (CONDICIONAIS)
            // ====================================================================
            logicaBlocosCodigo: function() {
                const SEQUENCIA_CORRETA = [
                    "SE (Cliente Gosta de Queijo)",
                    "ENTÃO (Adicionar Queijo)",
                    "SENÃO (Adicionar Alface)",
                    "FIMSE"
                ];
                
                const areaEstrutura = document.getElementById('estrutura-se-entao');
                const btnExecutar = document.getElementById('executar-condicional');
                const resultadoDiv = document.getElementById('resultado-condicional');
                const blocosPool = document.getElementById('blocos-condicionais-pool');

                blocosPool.querySelectorAll('.bloco-logico, .bloco-final').forEach(bloco => {
                    bloco.setAttribute('draggable', true);
                    bloco.addEventListener('dragstart', (e) => {
                        e.dataTransfer.setData('text/plain', e.target.dataset.comando);
                        e.target.classList.add('dragging');
                    });
                    bloco.addEventListener('dragend', (e) => {
                        e.target.classList.remove('dragging');
                    });
                });

                areaEstrutura.addEventListener('drop', (e) => {
                    e.preventDefault();
                    const data = e.dataTransfer.getData('text/plain');
                    const draggedElement = document.querySelector(`[data-comando="${data}"].dragging`);
                    
                    const clone = draggedElement.cloneNode(true);
                    clone.classList.remove('dragging');
                    clone.removeAttribute('draggable');

                    const btnRemover = document.createElement('span');
                    btnRemover.innerHTML = ' ❌';
                    btnRemover.style.cursor = 'pointer';
                    btnRemover.onclick = function() { areaEstrutura.removeChild(clone); };
                    clone.appendChild(btnRemover);

                    areaEstrutura.appendChild(clone);
                });
                areaEstrutura.addEventListener('dragover', (e) => { e.preventDefault(); });

                btnExecutar.onclick = function() {
                    let comandosAluno = [];
                    
                    areaEstrutura.querySelectorAll('.bloco-logico, .bloco-final').forEach(comando => {
                        comandosAluno.push(comando.dataset.comando);
                    });
                    
                    const alunoStr = comandosAluno.join('|');
                    const corretoStr = SEQUENCIA_CORRETA.join('|');
                    
                    const sintaxeCorreta = comandosAluno[0] && comandosAluno[0].startsWith('SE') && comandosAluno[comandosAluno.length - 1] === 'FIMSE';
                    
                    if (!sintaxeCorreta) {
                        resultadoDiv.innerHTML = `❌ **Opa!** Toda regra começa com SE e termina com FIM SE. Revise a ordem.`;
                        resultadoDiv.style.color = '#FF5722';
                    } else if (alunoStr === corretoStr) {
                        resultadoDiv.innerHTML = `✅ **Vitória!** Você montou a estrutura SE/ENTÃO/SENÃO corretamente!`;
                        resultadoDiv.style.color = '#4CAF50';
                        SanduicheProgramado.conquistarIngrediente('queijo');
                        setTimeout(() => SanduicheProgramado.fecharModal('modal-condicional'), 2000);

                    } else {
                         resultadoDiv.innerHTML = `❌ **Erro na Lógica!** A regra SE/ENTÃO/SENÃO está correta para este desafio?`;
                        resultadoDiv.style.color = '#FF5722';
                    }
                };
            },

            // ====================================================================
            // LÓGICA DO JOGO 5: MONTA SANDUÍCHE (DEBUGGING)
            // ====================================================================
            logicaMontaSanduiche: function() {
                const SEQUENCIA_CORRETA_FINAL = [
                    "Colocar Pão em Baixo",
                    "REPITA 5x (Presunto)",
                    "SE (Cliente Gosta de Queijo)",
                    "ENTÃO (Adicionar Queijo)",
                    "FIMSE",
                    "Colocar Pão em Cima"
                ];
                
                const areaBugada = document.getElementById('algoritmo-bugado');
                const btnTestar = document.getElementById('testar-sanduiche');
                const resultadoDiv = document.getElementById('resultado-final');
                const blocosPool = document.getElementById('blocos-reposicao-final');

                // Blocos Iniciais (Com Erros de Sequência e Lógica/Repetição)
                const blocosIniciais = [
                    { cmd: "Colocar Pão em Cima", class: "bloco-logico", cor: "#9E9E9E" }, // Erro 1: Sequência
                    { cmd: "REPITA 10x (Presunto)", class: "bloco-reposicao", cor: "#03A9F4" }, // Erro 2: Repetição
                    { cmd: "SE (Cliente Gosta de Queijo)", class: "bloco-logico", cor: "#64B5F6" },
                    { cmd: "ENTÃO (Adicionar Queijo)", class: "bloco-logico", cor: "#64B5F6" },
                    { cmd: "FIMSE", class: "bloco-final", cor: "#9E9E9E" },
                    { cmd: "Colocar Pão em Baixo", class: "bloco-logico", cor: "#FF5722" }
                ];

                const montarAlgoritmoBugado = () => {
                    areaBugada.innerHTML = '<h4>Algoritmo Bugado (Arraste para reorganizar e corrigir)</h4>';
                    blocosIniciais.forEach(bloco => {
                        const elemento = document.createElement('div');
                        elemento.classList.add(bloco.class, 'comando-bugado');
                        elemento.setAttribute('draggable', true);
                        elemento.dataset.comando = bloco.cmd;
                        elemento.textContent = bloco.cmd;
                        elemento.style.backgroundColor = bloco.cor;

                        // Adiciona a funcionalidade de arrastar e remover para reordenar/corrigir
                        elemento.addEventListener('dragstart', (e) => { e.dataTransfer.setData('text/plain', e.target.dataset.comando); e.target.classList.add('dragging');});
                        elemento.addEventListener('dragend', (e) => { e.target.classList.remove('dragging'); });
                        elemento.addEventListener('click', (e) => { 
                            if (confirm(`Remover "${bloco.cmd}"? Você pode usar um bloco de reposição.`)) {
                                areaBugada.removeChild(elemento);
                            }
                        });

                        areaBugada.appendChild(elemento);
                    });
                };

                blocosPool.querySelectorAll('.bloco-reposicao').forEach(bloco => {
                     bloco.setAttribute('draggable', true);
                     bloco.addEventListener('dragstart', (e) => {
                        e.dataTransfer.setData('text/plain', e.target.dataset.comando);
                        e.target.classList.add('dragging');
                    });
                     bloco.addEventListener('dragend', (e) => { e.target.classList.remove('dragging'); });
                });
                
                areaBugada.addEventListener('drop', (e) => {
                    e.preventDefault();
                    const data = e.dataTransfer.getData('text/plain');
                    const draggedElement = document.querySelector(`[data-comando="${data}"].dragging`);
                    
                    const clone = draggedElement.cloneNode(true);
                    clone.classList.remove('dragging');
                    clone.removeAttribute('draggable');
                    clone.classList.add('comando-bugado');
                    clone.style.backgroundColor = draggedElement.style.backgroundColor;
                    
                    clone.addEventListener('click', (e) => { 
                        if (confirm(`Remover "${clone.dataset.comando}"?`)) {
                            areaBugada.removeChild(clone);
                        }
                    });

                    areaBugada.appendChild(clone);
                });
                areaBugada.addEventListener('dragover', (e) => { e.preventDefault(); });

                btnTestar.onclick = function() {
                    let comandosAluno = [];
                    
                    areaBugada.querySelectorAll('.comando-bugado').forEach(comando => {
                        let cmd = comando.dataset.comando;
                        // Normaliza o comando de repetição para comparação, corrigindo o erro de 10x para 5x.
                        if (cmd.includes('REPITA 10x (Presunto)')) cmd = "REPITA 5x (Presunto)";
                        
                        comandosAluno.push(cmd);
                    });
                    
                    const alunoStr = comandosAluno.join('|');
                    const corretoStr = SEQUENCIA_CORRETA_FINAL.join('|');
                    
                    if (alunoStr === corretoStr) {
                        resultadoDiv.innerHTML = `✅ **VITÓRIA ABSOLUTA!** O sanduíche saiu perfeito! Você é um Debugger de Chef!`;
                        resultadoDiv.style.color = '#4CAF50';
                        
                        SanduicheProgramado.conquistarIngrediente('pao');
                        SanduicheProgramado.jogador.progressoTotal = SanduicheProgramado.conquistas.length;
                        SanduicheProgramado.atualizarProgressoVisual();

                        setTimeout(() => SanduicheProgramado.fecharModal('modal-final'), 3000);

                    } else {
                         resultadoDiv.innerHTML = `❌ **O Sanduíche Queimou!** A receita ainda tem erros de ordem ou comandos. Continue corrigindo o algoritmo!`;
                        resultadoDiv.style.color = '#FF5722';
                    }
                };

                montarAlgoritmoBugado();
            },
        };

        // Inicia o programa quando a página carregar
        document.addEventListener('DOMContentLoaded', function() {
            SanduicheProgramado.iniciar();
        });