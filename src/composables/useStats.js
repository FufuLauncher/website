const GITHUB_REPO = 'FufuLauncher/FufuLauncher'

const CACHE_KEY = 'fufu_stats_cache'
const CACHE_TTL = 50 * 60 * 1000

const MANUAL_VISITORS = 480090

function getCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const cached = JSON.parse(raw)
    if (Date.now() - cached.timestamp > CACHE_TTL) return null
    return cached.data
  } catch {
    return null
  }
}

function setCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data }))
  } catch {}
}

async function fetchGitHubStats() {
  try {
    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}`)
    const data = await res.json()
    const stars = data.stargazers_count || 0
    const forks = data.forks_count || 0

    const SUB_REPO = 'FufuLauncher/FufuLauncher.UnlockerIsland'
    const [mainContrib, subContrib] = await Promise.all([
      fetch(`https://api.github.com/repos/${GITHUB_REPO}/contributors?per_page=100`).then(r => r.json()).catch(() => []),
      fetch(`https://api.github.com/repos/${SUB_REPO}/contributors?per_page=100`).then(r => r.json()).catch(() => []),
    ])
    const mainList = Array.isArray(mainContrib) ? mainContrib : []
    const subList = Array.isArray(subContrib) ? subContrib : []
    const uniqueLogins = new Set([...mainList.map(c => c.login), ...subList.map(c => c.login)])
    let contributors = uniqueLogins.size

    return { stars, forks, contributors }
  } catch (e) {
    console.warn('[Stats] GitHub fetch failed:', e)
    return { stars: 0, forks: 0, contributors: 0 }
  }
}

export async function fetchAllStats() {
  const cached = getCache()
  if (cached) return cached

  const github = await fetchGitHubStats()

  const stats = {
    visitors: MANUAL_VISITORS,
    stars: github.stars,
    forks: github.forks,
    contributors: github.contributors,
  }

  setCache(stats)
  return stats
}
