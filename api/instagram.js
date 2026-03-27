// Vercel Serverless Function — Proxy Instagram Graph API
// Evita CORS e protege o access token no servidor

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const accountId = process.env.INSTAGRAM_ACCOUNT_ID;

  if (!token || !accountId) {
    return res.status(500).json({ error: 'INSTAGRAM_ACCESS_TOKEN e INSTAGRAM_ACCOUNT_ID não configurados nas variáveis de ambiente do Vercel.' });
  }

  const { endpoint = 'profile' } = req.query;

  try {
    let data = {};

    if (endpoint === 'profile') {
      // Dados básicos do perfil @cinex.goiania
      const profileRes = await fetch(
        `https://graph.instagram.com/${accountId}?fields=id,username,followers_count,follows_count,media_count,biography,profile_picture_url&access_token=${token}`
      );
      data = await profileRes.json();
    }

    else if (endpoint === 'insights') {
      // Métricas de conta (últimos 30 dias)
      const insightsRes = await fetch(
        `https://graph.instagram.com/${accountId}/insights?metric=impressions,reach,profile_views,follower_count&period=day&since=${Math.floor(Date.now()/1000)-2592000}&until=${Math.floor(Date.now()/1000)}&access_token=${token}`
      );
      data = await insightsRes.json();
    }

    else if (endpoint === 'media') {
      // Posts recentes com métricas
      const mediaRes = await fetch(
        `https://graph.instagram.com/${accountId}/media?fields=id,caption,media_type,timestamp,thumbnail_url,media_url,permalink,like_count,comments_count&limit=12&access_token=${token}`
      );
      data = await mediaRes.json();
    }

    else if (endpoint === 'audience') {
      // Dados de audiência
      const audienceRes = await fetch(
        `https://graph.instagram.com/${accountId}/insights?metric=audience_city,audience_gender_age&period=lifetime&access_token=${token}`
      );
      data = await audienceRes.json();
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
