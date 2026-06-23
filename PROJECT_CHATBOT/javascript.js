let cartCount = 0;

function addToCart(productName) {
    cartCount++;
    document.getElementById('cart-count').innerText = cartCount;
    
    const toast = document.getElementById('toast');
    toast.innerText = `${productName} adicionado ao carrinho!`;
    toast.style.display = 'block';
    
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

// --- CHATBOT ---
let buttom_canto = document.getElementById("chat_inteligent"); 
let chat_bot = document.getElementById("chat_bot");
let closer = document.getElementById("closer_caixa");
let input_text = document.getElementById("input_text");
let buttom_send = document.getElementById("send");
let chat_box = document.getElementById("chat_box");

// Abrir ou esconder chat
buttom_canto.addEventListener("click", function () { 
    chat_bot.classList.toggle("hidden");
});

// Fechar chat pelo X
closer.addEventListener("click", function () {
    chat_bot.classList.add("hidden");
});

// CORREÇÃO 1: função agora é async para poder usar await requisições de rede ou acesso a bancos de dados, sem bloquear a interface do usuário. 
async function enviarMensagem() {
    let texto = input_text.value;
    if (texto.trim() !== "") {

        // Cria o balão do usuário
        let novaMensagem = document.createElement("div");
        novaMensagem.classList.add("usuario");
        novaMensagem.innerText = texto; /* serve para obter ou modificar o conteúdo de texto visível de um elemento HTML*/
        chat_box.appendChild(novaMensagem);

        // Limpa o campo e rola o scroll
        input_text.value = "";
        // criar um barra de rolagem dentro do chat_box
        chat_box.scrollHeight = chat_box.scrollHeight;

        // Balão de "Digitando..." enquanto espera o servidor
        let balaoDigitando = document.createElement("div");
        balaoDigitando.classList.add("bot");
        balaoDigitando.innerText = "Digitando...";
        chat_box.appendChild(balaoDigitando);
        chat_box.scrollTop = chat_box.scrollHeight;

        try {
            // NOVO: chama o servidor Flask Python
            const response = await fetch('http://localhost:5000/api/chat', {
                method: 'POST', /* async/ await executa código assíncrono sem travar a página*/
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mensagem: texto })
            });

            // NOVO: verifica se o servidor respondeu com sucesso
            if (!response.ok) {
                throw new Error('Servidor retornou erro ' + response.status);
            }

            const data = await response.json();

            // Remove "Digitando..." e exibe a resposta real do Gemini
            chat_box.removeChild(balaoDigitando);
            let balaoBot = document.createElement("div");
            balaoBot.classList.add("bot");
            balaoBot.innerText = data.resposta;
            chat_box.appendChild(balaoBot);

        } catch (error) {
            console.error("Erro na comunicação com a API:", error);
            chat_box.removeChild(balaoDigitando);
            let balaoErro = document.createElement("div");
            balaoErro.classList.add("bot");
            balaoErro.innerText = "❌ Não consegui conectar ao servidor. Verifique se o app_backend.py está rodando.";
            chat_box.appendChild(balaoErro);
        }

        chat_box.scrollTHeight = chat_box.scrollHeight;
    }
}

buttom_send.addEventListener("click", enviarMensagem);

//  permite enviar mensagem pressionando Enter
input_text.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        enviarMensagem();
    }
});
