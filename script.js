/* =================================================
   LISTA DE BANIDOS PERMANENTES
   ================================================= */

const banidos = {

    "12703663060": {
        motivo: "-",
        data: "-"
    },

    "165256966": {
        motivo: "-",
        data: "-"
    },

    "11372263105": {
        motivo: "-",
        data: "-"
    },

    "2760866008": {
        motivo: "-",
        data: "-"
    },

    "11541682279": {
        motivo: "-",
        data: "-"
    },

    "11593762539": {
        motivo: "-",
        data: "-"
    },

    "16332805015": {
        motivo: "01",
        data: "23/08/2026"
    },

    "15940130916": {
        motivo: "01",
        data: "29/08/2026"
    }

};


/* =================================================
   SUSPENSÕES DE ATIVIDADES DO CANAL

   - NÃO é banimento da live
   - A pessoa continua podendo assistir a live
   - A pessoa fica proibida somente da atividade indicada
   - Máximo acumulado: 5 suspensões

   PADRÃO:

   "ID": {
       suspensoes: 5,
       inicio: "29/08/2026",
       dias: 7,
       proibido: "X1 E RANQUEADA"
   }

   ================================================= */

const suspensoesLive = {

    "1633230652": {
        suspensoes: 1,
        inicio: "26/08/2026",
        dias: 1,
        proibido: "ATIVIDADE"
    },

    "9345819889": {
        suspensoes: 1,
        inicio: "26/08/2026",
        dias: 1,
        proibido: "ATIVIDADE"
    },

    "12595358085": {
        suspensoes: 1,
        inicio: "26/08/2026",
        dias: 1,
        proibido: "ATIVIDADE"
    },

    "15329093478": {
        suspensoes: 1,
        inicio: "26/08/2026",
        dias: 1,
        proibido: "ATIVIDADE"
    },

    "15663458381": {
        suspensoes: 1,
        inicio: "26/08/2026",
        dias: 1,
        proibido: "ATIVIDADE"
    },

    "123456789": {
        suspensoes: 1,
        inicio: "29/08/2026",
        dias: 7,
        proibido: "REI 2"
    },

    "15731865946": {
        suspensoes: 1,
        inicio: "25/08/2026",
        dias: 7,
        proibido: "JOGAR REI 2"
    },


};


/* =================================================
   ELEMENTOS
   ================================================= */

const campoId = document.getElementById("playerId");
const botao = document.getElementById("consultar");
const resultado = document.getElementById("resultado");


/* =================================================
   PERMITIR SOMENTE NÚMEROS
   ================================================= */

campoId.addEventListener("input", function () {

    this.value = this.value.replace(/[^0-9]/g, "");

});


/* =================================================
   CONVERTER DATA
   FORMATO: DD/MM/AAAA
   ================================================= */

function converterData(data) {

    const partes = data.split("/");

    return new Date(
        Number(partes[2]),
        Number(partes[1]) - 1,
        Number(partes[0]),
        0,
        0,
        0
    );

}


/* =================================================
   CALCULAR FIM DA SUSPENSÃO
   ================================================= */

function calcularFimSuspensao(inicio, dias) {

    const dataInicio = converterData(inicio);

    return new Date(
        dataInicio.getTime() + (dias * 24 * 60 * 60 * 1000)
    );

}


/* =================================================
   FORMATAR DATA
   ================================================= */

function formatarData(data) {

    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();

    return dia + "/" + mes + "/" + ano;

}


/* =================================================
   CONSULTAR
   ================================================= */

function consultarBanimento() {

    const id = campoId.value.trim();


    /* =============================================
       ID VAZIO
       ============================================= */

    if (id === "") {

        resultado.innerHTML = `

            <div class="mensagem">
                ⚠️ DIGITE UM ID PARA CONSULTAR
            </div>

        `;

        resultado.classList.add("mostrar");

        return;
    }


    /* =============================================
       BANIMENTO PERMANENTE
       ============================================= */

    const banimentoPermanente = banidos[id];

    if (banimentoPermanente) {

        resultado.innerHTML = `

            <div class="status">

                <div class="status-titulo banido">
                    🔴 BANIDO
                </div>

            </div>

            <div class="campo-id">

                <span>
                    ID DO JOGADOR
                </span>

                ${id}

            </div>

            <div class="campo-motivo">

                <span>
                    CÓDIGO DO BANIMENTO
                </span>

                ${banimentoPermanente.motivo}

            </div>

            <div class="campo-data">

                <span>
                    DATA DO BANIMENTO
                </span>

                ${banimentoPermanente.data}

            </div>

        `;

        resultado.classList.add("mostrar");

        return;
    }


    /* =============================================
       SUSPENSÃO DE ATIVIDADES
       ============================================= */

    const suspensao = suspensoesLive[id];

    if (suspensao) {

        const inicio = converterData(suspensao.inicio);

        const fim = calcularFimSuspensao(
            suspensao.inicio,
            suspensao.dias
        );

        const agora = new Date();


        /* =============================================
           SUSPENSÃO ATIVA
           ============================================= */

        if (agora < fim) {

            resultado.innerHTML = `

                <div class="status">

                    <div class="status-titulo temporario">
                        🟠 SUSPENSÃO DE ATIVIDADES
                    </div>

                </div>

                <div class="campo-id">

                    <span>
                        ID DO JOGADOR
                    </span>

                    ${id}

                </div>

                <div class="campo-motivo">

                    <span>
                        PROIBIDO DE
                    </span>

                    ${suspensao.proibido}

                </div>

                <div class="campo-data">

                    <span>
                        SUSPENSÕES ACUMULADAS
                    </span>

                    ${suspensao.suspensoes}/5

                </div>

                <div class="campo-data">

                    <span>
                        INÍCIO DA SUSPENSÃO
                    </span>

                    ${suspensao.inicio}

                </div>

                <div class="campo-data">

                    <span>
                        DURAÇÃO
                    </span>

                    ${suspensao.dias}
                    ${suspensao.dias == 1 ? "DIA" : "DIAS"}

                </div>

                <div class="campo-data">

                    <span>
                        SUSPENSO ATÉ
                    </span>

                    ${formatarData(fim)}

                </div>

            `;

            resultado.classList.add("mostrar");

            return;
        }


        /* =============================================
           SUSPENSÃO ENCERRADA
           ============================================= */

        resultado.innerHTML = `

            <div class="status">

                <div class="status-titulo liberado">
                    🟢 LIBERADO
                </div>

            </div>

            <div class="campo-id">

                <span>
                    ID DO JOGADOR
                </span>

                ${id}

            </div>

            <div class="campo-motivo">

                <span>
                    STATUS
                </span>

                Suspensão de atividades encerrada

            </div>

            <div class="campo-data">

                <span>
                    SUSPENSÕES ACUMULADAS
                </span>

                ${suspensao.suspensoes}/5

            </div>

            <div class="campo-data">

                <span>
                    ÚLTIMA SUSPENSÃO
                </span>

                ${suspensao.inicio}

            </div>

        `;

        resultado.classList.add("mostrar");

        return;
    }


    /* =============================================
       LIBERADO
       ============================================= */

    resultado.innerHTML = `

        <div class="status">

            <div class="status-titulo liberado">
                🟢 LIBERADO
            </div>

        </div>

        <div class="campo-id">

            <span>
                ID DO JOGADOR
            </span>

            ${id}

        </div>

        <div class="campo-motivo">

            <span>
                STATUS
            </span>

            Nenhum banimento ou suspensão de atividades

        </div>

        <div class="campo-data">

            <span>
                SUSPENSÕES
            </span>

            0/5

        </div>

    `;

    resultado.classList.add("mostrar");

}


/* =================================================
   BOTÃO CONSULTAR
   ================================================= */

botao.addEventListener(
    "click",
    consultarBanimento
);


/* =================================================
   ENTER
   ================================================= */

campoId.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            consultarBanimento();

        }

    }
);