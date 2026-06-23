# FRONT_BACKEND_API
SITE_COM_CHATBOT_VIA_API

# 🚀 FLOPTECH - Site de Vendas com IA Chatbot Integrado

![Status do Projeto](https://img.shields.io/badge/status-operacional-green)
![Python Version](https://img.shields.io/badge/python-3.10%2B-blue)
![Flask](https://img.shields.io/badge/flask-v3.x-lightgrey)
![Gemini API](https://img.shields.io/badge/AI-Gemini%202.5%20Flash-violet)

A **FLOPTECH** é uma plataforma moderna de e-commerce focada em hardware de alta qualidade. O grande diferencial do site é o **FlopBot**: um assistente virtual inteligente integrado diretamente à interface através de uma caixa de chat dinâmica (Chatbox), que utiliza a API oficial do Gemini para guiar clientes, detalhar produtos e simular um suporte em tempo real de forma totalmente contextualizada.

---

## 📌 Índice

- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Arquitetura de Comunicação](#-arquitetura-de-comunicação)
- [Como Configurar e Executar](#-como-configurar-e-executar)
- [Regras de Comportamento do Chatbot (System Instruction)](#-regras-de-comportamento-do-chatbot-system-instruction)
- [Estrutura do Repositório](#-estrutura-do-repositório)

---

## ✨ Funcionalidades

* **Vitrine Comercial Interativa:** Cards de produtos responsivos com funcionalidade de adição dinâmica ao carrinho e sistema de feedback via notificações *toast*.
* **FlopBot (AI Chat Box):** Caixa flutuante no canto inferior direito que abre e fecha dinamicamente, mantendo o histórico global da conversa durante a sessão do usuário.
* **Feedback de Digitação:** Balão de "Digitando..." assíncrono para melhorar a experiência do usuário (UX) enquanto aguarda o processamento do servidor.
* **Filtro de Escopo Comercial:** O atendente virtual foi estritamente instruído a manter o foco em assuntos da loja, educadamente declinando de assuntos fora do contexto de vendas.

---

## 🛠 Tecnologias Utilizadas

### Front-end
* **HTML5 / CSS3:** Estruturação semântica e estilização customizada com comportamento responsivo (`grid`, `flexbox`).
* **JavaScript (ES6+):** Manipulação assíncrona do DOM através de funções `async/await` e requisições via `Fetch API`.

### Back-end
* **Python 3 / Flask:** Servidor responsável por criar um Proxy seguro de comunicação entre a interface e o serviço de inteligência artificial.
* **Flask-CORS:** Configuração de políticas de *Cross-Origin Resource Sharing* para liberar o tráfego local do Front-end para o Back-end.
* **Google GenAI SDK (`google-genai`):** Nova biblioteca de integração com os modelos generativos do Google.

---

## 🏗 Arquitetura de Comunicação

Para garantir a segurança da aplicação, as chaves privadas nunca são expostas na camada de cliente:
```text
[Usuário (Chatbox UI)] ──( Envia JSON )──> [Back-end Flask (Porta 5000)] ──( SDK Oficial )──> [Google Gemini API]
[Usuário (Chatbox UI)] <──( Retorna Texto )── [Back-end Flask (Porta 5000)] <──( Resposta IA )── [Google Gemini API]
