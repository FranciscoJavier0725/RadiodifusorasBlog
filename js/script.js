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
    img: "https://cdn.instant.audio/images/logos/emisoras-com-mx/exa-97-3-fm-monterrey.png",
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
let contenidoAduioHtml = "";
arregloRadiodifusoras.forEach((radiodifusora, index) => {
  contenidoAduioHtml += `
        <article class="tarjetaRadio">
        <h3>${index + 1}.- ${radiodifusora.nameEstacion}</h3>
        <div class="botonesRadio">
        <span id="icono-${radiodifusora.id}" class="material-symbols-outlined iconPlay" onClick="playPause('${radiodifusora.id}')">
            play_circle
        </span>
        <span class="material-symbols-outlined iconReload" onClick="reloadRadio('${radiodifusora.id}')">
            Refresh
        </span>
        </div>
        <div class="radioContenido">
        <div class="logoRadio">
            <img
              src="${radiodifusora.img}"
              alt="${radiodifusora.nameEstacion}"
            />
        </div>
        <div class="reproductorMedia">
            <audio
             id="${radiodifusora.id}"
             controls
             preload="none">
             <source
              src="${radiodifusora.audio}"
              type="audio/aac" />
            </audio>
        </div>
        </div>
        </article>
        `;
});

audio.innerHTML = contenidoAduioHtml;

// TODO: Agregar documentación a las funciones del audio

function playPause(audioId) {
  console.log("audioId", audioId);
  let audio = document.getElementById(audioId);
  const icono = document.getElementById(`icono-${audioId}`);
  console.log("audio", audio);
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

// Sincronizar los iconos de audio dependiendo si se esta reproduciendo o no
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
