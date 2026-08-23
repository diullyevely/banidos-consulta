/* =================================================
   LISTA DE BANIDOS
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
    }
    ,
    "11541682279": {
        motivo: "-",
        data: "-"
    },
    "11593762539": {
        motivo: "-",
        data: "-"
    }

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
   FUNÇÃO DE CONSULTA
   ================================================= */

function consultarBanimento() {

    const id = campoId.value.trim();


    /* =============================================
       SE NÃO DIGITAR NADA
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
       PROCURA O ID
       ============================================= */

    const banimento = banidos[id];


    /* =============================================
       ID BANIDO
       ============================================= */

    if (banimento) {

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

                ${banimento.motivo}

            </div>

            <div class="campo-data">

                <span>
                    DATA DO BANIMENTO
                </span>

                ${banimento.data}

            </div>

        `;

    }


    /* =============================================
       ID LIBERADO
       ============================================= */

    else {

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
                    DATA
                </span>

                —

            </div>

        `;

    }


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