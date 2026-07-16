const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

function getSupabase() {
  return createClient(SUPABASE_URL, SUPABASE_KEY);
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET')
    return res.status(405).json({ success: false, errors: ['Method not allowed'] });

  try {
    const supabase = getSupabase();

    const { data, error } = await supabase
      .from('bhakt_registrations')
      .select('*')
      .order('id', { ascending: false });

    if (error) throw error;

    return res.status(200).json({
      success: true,
      total: data.length,
      data
    });

  } catch (err) {
    console.error('Fetch error:', err.message);
    return res.status(500).json({ success: false, errors: [err.message] });
  }
};