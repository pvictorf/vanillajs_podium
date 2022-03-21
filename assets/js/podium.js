const $$ = (el) => document.querySelector(el)

export async function fetchPodium() {
  const res = await fetch(`http://localhost:3000/utils/podiumdb.json`)
  const json = await res.json()

  return json;
}

export function drawPodium({selector, data}) {
   const winners = data
    .filter(({position}) => position >= 1 && position <= 5)
    .map(winner => podiumTemplate(winner))  
    .join('')

}

function podiumTemplate(winner) {
  const podium = $$(`[data-position="${winner.position}"]`)
  podium.querySelector('.podium_name').innerText = winner.name
  podium.querySelector('.podium_avatar').setAttribute('src', winner.avatar) 
  podium.querySelector('.podium_avatar').setAttribute('onerror', "this.onerror=null;this.src='./assets/images/no-image.svg'")
}
