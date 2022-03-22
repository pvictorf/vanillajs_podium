const $$ = (el) => document.querySelector(el)

export async function fetchPodium() {
  const res = await fetch(`http://localhost:3000/utils/podiumdb.json`)
  const json = await res.json()

  return json;
}


export function draw(json) {
  const data = json.sort((a, b) => a.position - b.position)
  
  const podiumRender = $$('#podium-render')
  const rankingRender = $$('#ranking-render')

  const podium = orderPodium(data.filter(({position}) => position >= 1 && position <= 5));
  podiumRender.innerHTML = podium.map(p => podiumTemplate(p)).join('');

  const ranking = data;
  rankingRender.innerHTML = ranking.map(r => rankingTemplate(r)).join('');
}

function orderPodium(podium) {
  let order = []
  podium.forEach(p => {
    if(p.position % 2 === 0) order.push(p);
    else order.unshift(p)
  })
  return order;
}

function suffixNth(d) {
  if (d > 3 && d < 21) return 'th';
  switch (d % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
  }
};

function podiumTemplate(podium) {
  const barSize = {
    1: 100,
    2: 60,
    3: 50,
    4: 30,
    5: 20,
  };

  return `
  <div class="podium scale-in-ver-bottom " data-position="${podium.position}">
      <div class="podium_user">
          <img class="podium_avatar avatar" src="${podium.avatar}" onerror="this.onerror=null;this.src='./assets/images/no-image.svg'"/>
          <p class="podium_name">${podium.name}</p>
      </div>
      <div class="bar" style="height: ${barSize[podium.position]}%"></div>
      <small class="podium_position">${podium.position}</small>
  </div>`;
}

function rankingTemplate(raking) {
  return `
  <div class="ranking fade-in">
    <p class="ranking_position">${raking.position}°</p>
    <img class="ranking_avatar" src="${raking.avatar}" onerror="this.onerror=null;this.src='./assets/images/no-image.svg'"/>
    <div class="raking_info">
      <p class="ranking_name">${raking.name}</p>
      <p class="ranking_points">${raking.points}</p>
    </div>
  </div>
  `;
  
}
