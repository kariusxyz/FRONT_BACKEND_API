# app_backend.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai

app = Flask(__name__)
CORS(app)

MINHA_CHAVE_GEMINI = "local_chave_API"  # COD API

client = genai.Client(api_key="local_chave_API")

# Sessão de chat global (mantém o histórico da conversa)
chat_session = client.chats.create(model="gemini-2.5-flash")
# Defina aqui a personalidade e os dados da sua loja
PROMPT_INTERNO = """
Você é o assistente virtual inteligente da FLOPTECH, uma loja de hardware de alta qualidade.
Seu objetivo é ajudar os clientes com dúvidas sobre produtos, suporte técnico e compras.

Diretrizes de comportamento:
1. Seja sempre muito educado, prestativo e profissional.
2. Seu nome é FlopBot.
3. Se o usuário perguntar sobre produtos, você pode citar os destaques da nossa loja:
   - Memória RAM Kingston FURY DDR5 (2x16GB) por R$ 2.717,90.
   - Monitor Samsung Odyssey G7 28" 4K 165Hz por R$ 17.999,99.
   - Console PlayStation 5 Pro por R$ 7.999,99.
   - Smartphone Samsung Galaxy S24 Ultra por R$ 5.999,99.
4. Para suporte ou atendimento humano, informe o e-mail (suporte@FLOPTECH.com) ou o telefone (11) 4004-0000.
5. Mantenha as respostas relativamente curtas e fáceis de ler no chat da página web.
6. Caso o cliente queira falar de algo que não esteja relacionado a loja. Reforce que o assunto é sobre a venda do produtos listados. Caso o cliente venha a insistir. 
Diga: Obrigado pela visita em nosso site, caso queria comprar volte sempre.
"""
chat_session = client.chats.create(
    model="gemini-2.5-flash",
    config={
        "system_instruction": PROMPT_INTERNO
    }
)

@app.route('/api/chat', methods=['POST'])
def responder_chat():
    data = request.get_json()
    mensagem_usuario = data.get('mensagem', '')

    if not mensagem_usuario.strip():
        return jsonify({'resposta': 'Por favor, digite algo.'}), 400

    try:
        resposta_gemini = chat_session.send_message(mensagem_usuario)
        return jsonify({'resposta': resposta_gemini.text})
    except Exception as e:
        print(f"Erro: {e}")
        return jsonify({'resposta': ' Desculpe, ocorreu um erro ao processar sua mensagem.'}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
