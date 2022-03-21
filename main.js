import './assets/css/podium.css'
import * as Podium from './assets/js/podium.js'

async function loadPodium() {
  const data = await Podium.fetchPodium()
  Podium.drawPodium({
    selector: '#podium-template',
    data,
  })
}

loadPodium();


