const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

function getSupabase() {
  return createClient(SUPABASE_URL, SUPABASE_KEY);
}

function validate({ full_name, phone, visit_type }) {
  const errors = [];
  if (!full_name || full_name.trim().length < 2)
    errors.push('full_name is required (min 2 characters)');
  const phoneClean = (phone || '').replace(/\D/g, '');
  if (phoneClean.length !== 10)
    errors.push('phone must be a 10-digit number');
  if (!['yes', 'no', 'special'].includes(visit_type))
    errors.push('visit_type must be: yes | no | special');
  return errors;
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST')
    return res.status(405).json({ success: false, errors: ['Method not allowed'] });

  const { full_name, phone, visit_type } = req.body || {};

  const errors = validate({ full_name, phone, visit_type });
  if (errors.length)
    return res.status(400).json({ success: false, errors });

  const phoneClean = phone.replace(/\D/g, '');

  try {
    const supabase = getSupabase();

    const { data: existing } = await supabase
      .from('bhakt_registrations')
      .select('id')
      .eq('phone', phoneClean)
      .maybeSingle();

    if (existing)
      return res.status(409).json({
        success: false,
        errors: ['This phone number is already registered.']
      });

    const { data, error } = await supabase
      .from('bhakt_registrations')
      .insert([{ full_name: full_name.trim(), phone: phoneClean, visit_type }])
      .select()
      .maybeSingle();

    if (error) throw error;

    return res.status(201).json({
      success: true,
      message: 'Bhakt registered successfully!',
      id: data.id,
      data
    });

  } catch (err) {
    console.error('Registration error:', err.message);
    return res.status(500).json({ success: false, errors: [err.message] });
  }
};