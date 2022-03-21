const $$ = (el) => document.querySelector(el)

export async function fetchPodium() {
  const res = await fetch(`http://localhost:3000/utils/podiumdb.json`)
  const json = await res.json()

  return json;
}

export function drawPodium({selector, data}) {
   const podium = data.filter(({position}) => position >= 1 && position <= 5)
   podium.map(p => podiumTemplate(p))  

   const ranking = data
   ranking.map(r => rankingTemplate(r))

}

function podiumTemplate(winner) {
  const podium = $$(`[data-position="${winner.position}"]`)
  podium.querySelector('.podium_name').innerText = winner.name
  podium.querySelector('.podium_avatar').setAttribute('src', winner.avatar) 
  podium.querySelector('.podium_avatar').setAttribute('onerror', "this.onerror=null;this.src='./assets/images/no-image.svg'")
}

function rankingTemplate(winner) {

}
