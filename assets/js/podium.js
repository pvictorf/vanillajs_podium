const $$ = (el) => document.querySelector(el)

export async function fetchPodium() {
  const res = await fetch(`http://localhost:3000/utils/podiumdb.json`)
  const json = await res.json()

  return json;
}

export function drawPodium({selector, data}) {
  const template = $$(selector)
  const avatar = template.querySelector('.avatar')
  
}