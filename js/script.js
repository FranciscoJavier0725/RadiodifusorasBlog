let arregloRadiodifusoras = [
  {
    id: "radio1",
    nameEstacion: "Los 40",
    audio: "https://18493.live.streamtheworld.com/LOS40_MTYAAC.aac",
    img: "https://cdn.instant.audio/images/logos/emisoras-com-mx/los-40-monterrey.png",
  },
  {
    id: "radio2",
    nameEstacion: "Exa 97.3",
    audio: "https://18213.live.streamtheworld.com/XHRSMTYFM.mp3",
    img: "https://cdn-profiles.tunein.com/s24582/images/logod.png?t=637853041630000000",
  },
  {
    id: "radio3",
    nameEstacion: "La Lupe 105.3 FM",
    audio:
      "https://mdstrm.com/audio/6737993c9422ca09f9b9ea70/icecast.audio?property=mmradio",
    img: "https://cdn.instant.audio/images/logos/emisoras-com-mx/la-lupe-monterrey.png",
  },
  {
    id: "radio4",
    nameEstacion: "La Gran AW 101.3 FM",
    audio:
      "https://mdstrm.com/audio/67378ab60639b6fb47c91763/icecast.audio?property=mmradio",
    img: "https://myradioenvivo.mx/public/uploads/radio_img/la-gran-aw/play_250_250.webp",
  },
  {
    id: "radio5",
    nameEstacion: "Hits 106.1 Monterrey",
    audio:
      "https://mdstrm.com/audio/67378c85b95cc90e1003e224/icecast.audio?property=mmradio",
    img: "https://i.iheart.com/v3/re/new_assets/6286d54e4820546084492253?ops=fit(960%2C960)%2Cresize(0%2C390)",
  },
  {
    id: "radio6",
    nameEstacion: "La Ke Buena 104.9 FM",
    audio:
      "https://mdstrm.com/audio/6737c447a675400dcf9348d1/icecast.audio?property=mmradio",
    img: "https://cdn-profiles.tunein.com/s90316/images/logod.png?t=638863890440000000",
  },
];

const audio = document.getElementById("emisorasAudio");
let contenidoAudioHtml = "";

const idToggleBlack = document.getElementById("idToggleBlack");
const txtBtnBlack = document.getElementById("txtBtnBlack");
const h3Label = document.querySelectorAll("h3");

/**
 * Genera dinámicamente el contenido HTML de las tarjetas de las emisoras de radio.
 * Recorre el arreglo de radiodifusoras y construye una tarjeta para cada emisora,
 * incluyendo su nombre, botones de reproducción y recarga, logotipo y reproductor de audio.
 */
function generarTarjetas() {
  arregloRadiodifusoras.forEach((radiodifusora, index) => {
    contenidoAudioHtml += `
    <article id="TarjetaRadio-${radiodifusora.id}" class="tarjetaRadio">
      <h3>${index + 1}.- ${radiodifusora.nameEstacion}</h3>
      <div class="botonesRadio">
        <span
          id="icono-${radiodifusora.id}"
          class="material-symbols-outlined iconPlay"
          onClick="playPause('${radiodifusora.id}')"
        >
          play_circle
        </span>
        <span
          class="material-symbols-outlined iconReload"
          onClick="reloadRadio('${radiodifusora.id}')"
        >
          Refresh
        </span>
      </div>
      <div class="radioContenido">
        <div class="logoRadio">
          <img src="${radiodifusora.img}" alt="${radiodifusora.nameEstacion}" />
        </div>
        <div class="reproductorMedia">
          <audio id="${radiodifusora.id}" controls preload="none">
            <source src="${radiodifusora.audio}" type="audio/aac" />
          </audio>
        </div>
      </div>
    </article>
    `;
  });

  audio.innerHTML = contenidoAudioHtml;
}

/**
 * Reproduce o pausa el audio de una emisora de radio.
 * Si se reproduce una emisora, pausa automáticamente las demás.
 * También actualiza el icono del reproductor según su estado.
 *
 * @param {string} audioId - Identificador del elemento de audio que se desea controlar.
 * @returns {void}
 */
function playPause(audioId) {
  let audio = document.getElementById(audioId);
  const icono = document.getElementById(`icono-${audioId}`);
  // Pausar todos los demas audios
  document.querySelectorAll("audio").forEach((a) => {
    if (a !== audio) {
      a.pause();
    }
  });

  if (audio.paused) {
    audio.play().catch((err) => {
      console.log(err);
    });
    // Icono de google para pausar audio
    icono.textContent = "pause_circle";
  } else {
    audio.pause();
    icono.textContent = "play_circle";
  }
}

/**
 * Recarga la transmisión de audio de una emisora de radio.
 * Pausa las demás emisoras, restablece la fuente de audio y vuelve a iniciar la reproducción.
 *
 * @param {string} audioId - Identificador del elemento de audio que se desea recargar.
 * @returns {void}
 */
function reloadRadio(audioId) {
  let audio = document.getElementById(audioId);
  // Pausar los demas audios disponibles
  document.querySelectorAll("audio").forEach((a) => {
    if (a !== audio) {
      a.pause();
    }
  });
  let source = audio.querySelector("source");
  let original = source ? source.src : audio.src;

  audio.pause();
  audio.src = original;
  audio.load();

  audio.play().catch((err) => {
    console.log("No se pudo reproducir la estación", err);
  });
}

/**
 * Inicializa los eventos de los reproductores de audio.
 * Sincroniza los iconos y evita que varias emisoras
 * se reproduzcan simultáneamente.
 */
function inicializarReproductor() {
  arregloRadiodifusoras.forEach((radiodifusora) => {
    const audio = document.getElementById(radiodifusora.id);
    const icono = document.getElementById(`icono-${radiodifusora.id}`);

    audio.addEventListener("play", () => {
      icono.textContent = "pause_circle";
      // Pausar los demas audios disponibles
      document.querySelectorAll("audio").forEach((a) => {
        if (a !== audio) {
          a.pause();
        }
      });
    });

    audio.addEventListener("pause", () => {
      icono.textContent = "play_circle";
    });
  });
}

// TODO: Falta unificar las funciones para activar el modo oscuro, para que solo sea una funcion para acrivar o desactivar el modo oscuro
/**
 * Activa el modo oscuro en las tarjetas de las emisoras de radio y en el fondo de la página.
 */
function activarModoOscuro() {
  arregloRadiodifusoras.forEach((radiodifusora) => {
    const idTarjetaRadio = document.getElementById(
      `TarjetaRadio-${radiodifusora.id}`,
    );
    idTarjetaRadio.className = "tarjetaRadioBlack";
  });
  const h3Label = document.querySelectorAll("h3");
  h3Label.forEach((h3) => {
    h3.style.color = "white";
  });
  const bodyColor = document.querySelector("body");
  bodyColor.style.backgroundColor = "black";
}

/**
 * Desactiva el modo oscuro en las tarjetas de las emisoras de radio y en el fondo de la página.
 */
function desactivarModoOscuro() {
  arregloRadiodifusoras.forEach((radiodifusora) => {
    const idTarjetaRadio = document.getElementById(
      `TarjetaRadio-${radiodifusora.id}`,
    );
    idTarjetaRadio.className = "tarjetaRadio";
  });
  const h3Label = document.querySelectorAll("h3");
  h3Label.forEach((h3) => {
    h3.style.color = "black";
  });
  const bodyColor = document.querySelector("body");
  bodyColor.style.backgroundColor = "white";
}

/**
 * Inicializa el interruptor del modo oscuro.
 * Detecta los cambios de estado y ejecuta la función correspondiente.
 */
function inicializarModoOscuro() {
  idToggleBlack.addEventListener("change", () => {
    /* En cuanto detecta encendido el switch, agrega el modo oscuro;
     cuando se desactiva, se quita el modo oscuro. */
    document.body.classList.toggle("dark-mode", idToggleBlack.checked);
    if (idToggleBlack.checked) {
      activarModoOscuro();
      txtBtnBlack.textContent = "Desactivar modo oscuro";
    } else {
      desactivarModoOscuro();
      txtBtnBlack.textContent = "Activar modo oscuro";
    }
  });
}

// Establecer el color negro en todos los encabezados h3 al cargar la página.
// Esto evita que los estilos predeterminados de Blogger modifiquen su color.
h3Label.forEach((h3) => {
  h3.style.color = "black";
});

generarTarjetas();
inicializarReproductor();
inicializarModoOscuro();
