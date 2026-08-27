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
    }

};


/* =================================================
   BANIMENTOS TEMPORÁRIOS DE 24 HORAS

   1 até 5 bans de 24h = temporário
   6 ou mais bans de 24h = permanente

   EXEMPLO:

   "123456789": {
       bans24h: 1,
       motivo: "01",
       inicio: "27/08/2026 18:30"
   }

   ================================================= */


const banimentos24h = {

    "1633230652": {
        bans24h: 1,
        motivo: "02",
        inicio: "26/08/2026 17:00"
    },
    "9345819889": {
        bans24h: 1,
        motivo: "02",
        inicio: "26/08/2026 17:00"
    },
    "12595358085": {
        bans24h: 1,
        motivo: "02",
        inicio: "26/08/2026 17:00"
    },
        "15329093478": {
        bans24h: 1,
        motivo: "03",
        inicio: "26/08/2026 17:00"
    },
        "15663458381": {
        bans24h: 1,
        motivo: "03",
        inicio: "26/08/2026 17:00"
    },

        "123456789": {
        bans24h: 1,
        motivo: "03",
        inicio: "27/08/2026 17:00"
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
   CONVERTER DATA E HORA
   FORMATO: DD/MM/AAAA HH:MM
   ================================================= */

function converterDataHora(dataHora) {

    const partes = dataHora.split(" ");

    const data = partes[0].split("/");
    const hora = partes[1].split(":");

    return new Date(
        Number(data[2]),
        Number(data[1]) - 1,
        Number(data[0]),
        Number(hora[0]),
        Number(hora[1]),
        0
    );

}


/* =================================================
   CALCULAR FIM DAS 24 HORAS
   ================================================= */

function calcularFim24Horas(inicio) {

    const dataInicio = converterDataHora(inicio);

    return new Date(
        dataInicio.getTime() + (24 * 60 * 60 * 1000)
    );

}


/* =================================================
   FORMATAR DATA E HORA
   ================================================= */

function formatarDataHora(data) {

    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();

    const hora = String(data.getHours()).padStart(2, "0");
    const minuto = String(data.getMinutes()).padStart(2, "0");

    return dia + "/" + mes + "/" + ano + " " + hora + ":" + minuto;

}


/* =================================================
   CONSULTAR BANIMENTO
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
       BANIMENTO TEMPORÁRIO
       ============================================= */

    const temporario = banimentos24h[id];


    /* =============================================
       NÃO ESTÁ BANIDO
       ============================================= */

    if (!temporario) {

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

                Nenhum banimento

            </div>

            <div class="campo-data">

                <span>
                    BANS DE 24 HORAS
                </span>

                0

            </div>

        `;

        resultado.classList.add("mostrar");

        return;
    }


    /* =============================================
       6 OU MAIS BANS DE 24H
       = PERMANENTE
       ============================================= */

    if (temporario.bans24h >= 6) {

        resultado.innerHTML = `

            <div class="status">

                <div class="status-titulo banido">
                    🔴 BANIDO PERMANENTEMENTE
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

                ${temporario.motivo}

            </div>

            <div class="campo-data">

                <span>
                    BANS DE 24 HORAS
                </span>

                ${temporario.bans24h}

            </div>

            <div class="campo-data">

                <span>
                    DURAÇÃO
                </span>

                PERMANENTE

            </div>

        `;

        resultado.classList.add("mostrar");

        return;
    }


    /* =============================================
       CALCULAR FIM DO BAN
       ============================================= */

    const inicio = converterDataHora(temporario.inicio);
    const fim = calcularFim24Horas(temporario.inicio);
    const agora = new Date();


    /* =============================================
       BAN JÁ TERMINOU
       ============================================= */

    if (agora >= fim) {

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

                Ban de 24 horas encerrado

            </div>

            <div class="campo-data">

                <span>
                    BANS DE 24 HORAS
                </span>

                ${temporario.bans24h}

            </div>

            <div class="campo-data">

                <span>
                    ÚLTIMO BAN
                </span>

                ${formatarDataHora(inicio)}

            </div>

        `;

        resultado.classList.add("mostrar");

        return;
    }


    /* =============================================
       BAN DE 24 HORAS ATIVO
       ============================================= */

    resultado.innerHTML = `

        <div class="status">

            <div class="status-titulo temporario">
                🟠 BANIMENTO DE 24 HORAS
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

            ${temporario.motivo}

        </div>

        <div class="campo-data">

            <span>
                BANS DE 24 HORAS
            </span>

            ${temporario.bans24h}

        </div>

        <div class="campo-data">

            <span>
                INÍCIO DO BAN
            </span>

            ${formatarDataHora(inicio)}

        </div>

        <div class="campo-data">

            <span>
                BANIDO ATÉ
            </span>

            ${formatarDataHora(fim)}

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