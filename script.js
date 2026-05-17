/**
 * Script de Engenharia Front-End - Controle de Interações e Acessibilidade
 * Tema: Tecnologia no Campo
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- MÓDULO 1: ACORDEÃO DINÂMICO (RREQUISITO VIA ARRAY DE OBJETOS) ---
    const dadosBeneficios = [
        {
            titulo: "1. Otimização de Recursos",
            conteudo: "Possibilidade de economizar recursos naturais com sistemas de irrigação inteligentes, sensores que monitoram as condições do solo ajustando a água conforme a necessidade real, reduzindo o desperdício."
        },
        {
            titulo: "2. Monitoramento de Culturas",
            conteudo: "Utilização de drones equipados com câmeras RGB e multiespectrais. Permite detectar indícios de infestação por ervas daninhas, incidências de doenças e replantio preciso através do mapeamento de falhas."
        },
        {
            titulo: "3. Previsibilidade e Gestão de Riscos",
            conteudo: "Análise de dados climáticos e históricos de produção para prever o rendimento das colheitas. Ajuda o produtor a antecipar eventos extremos e planejar com precisão a logística da safra."
        },
        {
            titulo: "4. Automação Inteligente",
            conteudo: "Tratores e maquinários autônomos integrados a sistemas de GPS realizam plantio, pulverização e colheita em alta escala de precisão, reduzindo custos operacionais."
        },
        {
            titulo: "5. Melhoria da Qualidade dos Produtos",
            conteudo: "Acompanhamento minucioso da cadeia desde o campo até a mesa. A aplicação de insumos em taxa variável evita o estresse das plantas, gerando alimentos de alto padrão mercadológico."
        },
        {
            titulo: "6. Sustentabilidade Estratégica",
            conteudo: "Minimização dos impactos ambientais através da aplicação racional de água, defensivos e fertilizantes, alinhando a produtividade nacional às exigências ecológicas globais."
        }
    ];

    const containerAcordeao = document.getElementById('dynamic-accordion');

    // Renderização Dinâmica do Componente
    dadosBeneficios.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('accordion-item');
        
        itemElement.innerHTML = `
            <button class="accordion-header-btn" id="acc-header-${index}" aria-expanded="false" aria-controls="acc-panel-${index}">
                <span>${item.titulo}</span>
                <span class="accordion-icon" aria-hidden="true">+</span>
            </button>
            <div id="acc-panel-${index}" class="accordion-panel" role="region" aria-labelledby="acc-header-${index}">
                <p>${item.conteudo}</p>
            </div>
        `;
        
        containerAcordeao.appendChild(itemElement);
    });

    // Lógica do Acordeão (Abrir e Fechar caixas extras)
    const botoesAcordeao = document.querySelectorAll('.accordion-header-btn');

    botoesAcordeao.forEach(botao => {
        botao.addEventListener('click', () => {
            const itemPai = botao.parentElement;
            const painel = botao.nextElementSibling;
            const estaAtivo = itemPai.classList.contains('active');

            // Fecha todos antes de abrir o atual (comportamento de colapso)
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.accordion-header-btn').setAttribute('aria-expanded', 'false');
                item.querySelector('.accordion-panel').style.maxHeight = null;
            });

            if (!estaAtivo) {
                itemPai.classList.add('active');
                botao.setAttribute('aria-expanded', 'true');
                painel.style.maxHeight = painel.scrollHeight + "px";
            }
        });
    });


    // --- MÓDULO 2: ACESSIBILIDADE E ELEMENTOS LOGICAMENTE TRATADOS ---
    let escalaFonteAtual = 1.0;
    const elementoHtml = document.documentElement;

    // A+ / A- Lógica de Limite Multiplicador Estrito (Requisito 1.3x)
    document.getElementById('btn-font-increase').addEventListener('click', () => {
        if (escalaFonteAtual < 1.3) {
            escalaFonteAtual += 0.1;
            elementoHtml.style.fontSize = `${escalaFonteAtual * 100}%`;
        }
    });

    document.getElementById('btn-font-decrease').addEventListener('click', () => {
        if (escalaFonteAtual > 0.9) {
            escalaFonteAtual -= 0.1;
            elementoHtml.style.fontSize = `${escalaFonteAtual * 100}%`;
        }
    });

    // Alternar Alto Contraste (Blindagem)
    document.getElementById('btn-toggle-contrast').addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
    });

    // Lógica de Leitura de Voz (Text-to-Speech)
    const botaoTts = document.getElementById('btn-tts');
    let falando = false;
    let sinteseVoz;

    botaoTts.addEventListener('click', () => {
        if (!falando) {
            // Seleciona os principais blocos textuais estruturados para leitura limpa
            const textoParaLer = document.querySelector('main').innerText;
            sinteseVoz = new SpeechSynthesisUtterance(textoParaLer);
            sinteseVoz.lang = 'pt-BR';
            
            sinteseVoz.onend = () => {
                botaoTts.innerText = "🔊 Ler Página";
                falando = false;
            };

            window.speechSynthesis.speak(sinteseVoz);
            botaoTts.innerText = "⏹ Parar Leitura";
            falando = true;
        } else {
            window.speechSynthesis.cancel();
            botaoTts.innerText = "🔊 Ler Página";
            falando = false;
        }
    });


    // --- MÓDULO 3: VALIDAÇÃO DO FORMULÁRIO DE ENGANJAMENTO ---
    const formulario = document.getElementById('lead-form');
    const alertaSucesso = document.getElementById('form-success-msg');

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const inputs = formulario.querySelectorAll('input');
        let formularioValido = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('invalid');
                formularioValido = false;
            } else {
                input.classList.remove('invalid');
            }

            // Validação complementar simples de email
            if (input.type === 'email' && input.value.trim()) {
                const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!regexEmail.test(input.value)) {
                    input.classList.add('invalid');
                    formularioValido = false;
                }
            }
        });

        if (formularioValido) {
            // Processa as informações antes de exibir (Simulação de envio bem-sucedido)
            formulario.style.display = 'none';
            alertaSucesso.style.display = 'block';
            alertaSucesso.setAttribute('aria-hidden', 'false');
        }
    });

    // Remove classes de erro ao digitar
    formulario.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.trim()) {
                input.classList.remove('invalid');
            }
        });
    });
});