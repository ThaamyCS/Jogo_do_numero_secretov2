let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let maximoTentativas = 0;
let contadorTentativas = 5;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak (texto, "Brazilian Portuguese Female", {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1',"Jogo do número secreto");
    exibirTextoNaTela('p',"Escolha um número entre 1 e 10");
    exibirTextoNaTela('z',"Você tem " +contadorTentativas + " tentativas");
}

exibirMensagemInicial();
    
function verificarChute() {
    let chute = document.querySelector('input').value;
        while(maximoTentativas < 6){
            if (chute == numeroSecreto) {
                exibirTextoNaTela('h1', "Acertou!");
                let palavraTentativas = tentativas > 1 ? " tentativas" : " tentativa";
                let mensagemTentativas = "Você descobriu o numero secreto com "  +tentativas +palavraTentativas +"!"; 
                exibirTextoNaTela('p',mensagemTentativas);
                document.getElementById("reiniciar").removeAttribute("disabled");
                
                    
            } else {
                if(chute > numeroSecreto) {
                    exibirTextoNaTela('p',"O número secreto é menor.");
                } else {
                    exibirTextoNaTela('p',"O número secreto é maior.");
                }
                tentativas++;
                maximoTentativas++;
                contadorTentativas--;
                limparCampo();
                exibirTextoNaTela('z',"Você tem " +contadorTentativas + " tentativas");
                break;
            }
        }

        if(maximoTentativas == 5 ){
            limparCampo();
            exibirTextoNaTela('p',"Você atingiu o limite de tentativas.");
            document.getElementById("reiniciar").removeAttribute("disabled");
        }
}
    
function gerarNumeroAleatorio() {
   let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
   let quantidadeNaLista = listaDeNumerosSorteados.length;

if(quantidadeNaLista == numeroLimite) {
    listaDeNumerosSorteados=[]
}

   if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
   } else {
    listaDeNumerosSorteados.push(numeroEscolhido);
    console.log(listaDeNumerosSorteados);
    return numeroEscolhido;
   }
};
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = "";
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    contadorTentativas=5;
   exibirMensagemInicial();
   document.getElementById("reiniciar").setAttribute("disabled",true);
}