const indicador = document.querySelector('.indicador')

function compararSenhas() {
    const senha = document.getElementById("senha").value;
    const repetirSenha = document.getElementById("repitaSenha").value;
    const resultadoElemento = document.getElementById("resultadoSenha");
    cores = ['#1a9fff', '#ff0000', '#ebeb34'];

    // Verificar se as senhas são iguais
    if (senha === '' || repetirSenha === ''){
        resultadoElemento.textContent = "Por favor, preencha todos os campos de senha."
        resultadoElemento.style.color = cores[2];
        const resultadoSenha = document.getElementById("forcaSenha");
        if (resultadoSenha) {
            resultadoSenha.textContent = "";
        }
    } else if (senha === repetirSenha) {
            resultadoElemento.textContent = "As senhas são iguais. Você pode prosseguir!";
            resultadoElemento.style.color = cores[0];
            
            // Chama a função para verificar a força da senha
            verificarSenha();
            mudaEstadoRegras();
        } else {
            resultadoElemento.textContent = "As senhas não são iguais. Por favor, verifique.";
            resultadoElemento.style.color = cores[1];
            indicador.style.width = 0 + '%';
            const resultadoSenha = document.getElementById("forcaSenha");
            if (resultadoSenha) {
                resultadoSenha.textContent = "";
            }
        }
}

function verificarSenha() {
    let senha = document.getElementById("senha").value;
    let forca = 0;
    const cores = ['#ff0000', '#ffe100', '#0bd600']

    let tamanhoValido = false;
    let letraMaiusculaValida = false;
    let numeroValido = false;
    let caractereEspecialValido = false;

    // Verificar se a senha possui pelo menos 8 caracteres
    if (senha.length >= 8) {
      forca++;
     tamanhoValido = true;
    }

    // Verificar se a senha possui pelo menos 1 letra maiúscula
    if (/[A-Z]/.test(senha)) {
        forca++;
      letraMaiusculaValida = true;
    }

// Verificar se a senha possui pelo menos 1 número
    if (/[0-9]/.test(senha)) {
      forca++;
     numeroValido = true;
    }

// Verificar se a senha possui pelo menos 1 caractere especial
    if (/[!@#$%^&*(),.?":{}|<>]/.test(senha)) {
      forca++;
     caractereEspecialValido = true;
    }

    let resultado = document.getElementById("forcaSenha");

    // Verifica se o elemento forcaSenha foi encontrado antes de definir seu conteúdo
    if (resultado) {
        if (forca <= 1) {
            resultado.textContent = "FRACA";
            resultado.style.color = cores[0];
            indicador.style.background = cores[0];
            indicador.style.width = (forca / 4) * 100 + '%';
        } else if (forca <= 3) {
            resultado.textContent = "MÉDIA";
            resultado.style.color = cores[1];
            indicador.style.background = cores[1];
            indicador.style.width = (forca / 4) * 100 + '%';
        } else {
            resultado.textContent = "FORTE";
            resultado.style.color = cores[2];
            indicador.style.background = cores[2];
            indicador.style.width = (forca / 4) * 100 + '%';
        }
    }
}

function mudaEstadoRegras() {
    const senha = document.getElementById("senha").value;
    const regras = document.querySelectorAll('.regras li');

    regras.forEach(regra => {
        if (regra.textContent.includes('caractere especial') && /[!@#$%^&*(),.?":{}|<>]/.test(senha)) {
            regra.style.textDecoration = 'line-through';
        } else if (regra.textContent.includes('letra maiúscula') && /[A-Z]/.test(senha)) {
            regra.style.textDecoration = 'line-through';
        } else if (regra.textContent.includes('número') && /[0-9]/.test(senha)) {
            regra.style.textDecoration = 'line-through';
        } else if (regra.textContent.includes('8 caracteres') && senha.length >= 8) {
            regra.style.textDecoration = 'line-through';
        } else {
            regra.style.textDecoration = ''; // Remover riscado se a condição não for atendida
        }      
    });
}

const lembreDeMim = document.getElementById("checkmark");
const usuarioInput = document.getElementById("usuario");
const senhaInput = document.getElementById("senha");
const repitaSenhaInput = document.getElementById("repitaSenha");

carregarInformacoesSalvas();

function carregarInformacoesSalvas() {
    if (localStorage.checkbox && localStorage.checkbox !== "") {
        lembreDeMim.checked = true;
        usuarioInput.value = localStorage.usuario;
        senhaInput.value = localStorage.senha;
        repitaSenhaInput.value = localStorage.repitaSenha;
    } else {
        lembreDeMim.checked = false;
        usuarioInput.value = "";
        senhaInput.value = "";
        repitaSenhaInput.value = "";
    }
}

// Salvar informações quando o usuário marca a opção "Lembre de mim"
lembreDeMim.onchange = function() {
    if (lembreDeMim.checked && usuarioInput.value !== "" && senhaInput.value !== "" && repitaSenhaInput.value !== "") {
        localStorage.usuario = usuarioInput.value;
        localStorage.senha = senhaInput.value;
        localStorage.repitaSenha = repitaSenhaInput.value;
        localStorage.checkbox = lembreDeMim.checked;
    } else {
        localStorage.usuario = "";
        localStorage.senha = "";
        localStorage.repitaSenha = "";
        localStorage.checkbox = "";
    }
};

