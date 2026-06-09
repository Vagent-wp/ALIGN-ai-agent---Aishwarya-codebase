import { supabase } from '../utils/supabase.js';
import { hashPhone, encryptPhone } from '../utils/crypto.js';
import { logger } from '../utils/logger.js';

// ============================================================
// PROFILE MANAGER
// ============================================================

// Get or create a user record by phone number
export async function getOrCreateUser(rawPhone, role = 'seeker') {
  const phoneHash = hashPhone(rawPhone);

  // Try to find existing user
  const { data: existing } = await supabase
    .from('users')
    .select('*')
    .eq('phone_hash', phoneHash)
    .single();

  if (existing) return existing;

  // Create new user
  const encryptedPhone = encryptPhone(rawPhone);
  const { data: newUser, error } = await supabase
    .from('users')
    .insert({
      phone_number: encryptedPhone,
      phone_hash: phoneHash,
      role,
    })
    .select()
    .single();

  if (error) {
    logger.error('getOrCreateUser failed', { error: error.message });
    return null;
  }

  logger.info('New user created', { userId: newUser.id, role });
  return newUser;
}

// Get user by phone hash
export async function getUserByPhone(rawPhone) {
  const phoneHash = hashPhone(rawPhone);
  const { data } = await supabase
    .from('users')
    .select('*')
    .eq('phone_hash', phoneHash)
    .single();
  return data || null;
}

// Create a new profile from registration slots
export async function createProfile(userId, slots) {
  const category = slots.reg_category || 'freelancer';
  const services = slots.reg_services
    ? slots.reg_services.split(',').map(s => s.trim()).filter(Boolean)
    : [];
  const industries = slots.reg_industries
    ? slots.reg_industries.split(',').map(s => s.trim()).filter(Boolean)
    : [];

  const [pricingMin, pricingMax] = parsePricing(slots.reg_pricing || '');

  const { data: profile, error } = await supabase
    .from('profiles')
    .insert({
      user_id: userId,
      name: slots.reg_name,
      category,
      tagline: slots.reg_tagline,
      description: slots.reg_description,
      services,
      industries_served: industries,
      pricing_min: pricingMin,
      pricing_max: pricingMax,
      website: slots.reg_website !== 'skip' ? slots.reg_website : null,
      is_active: false, // pending admin review
    })
    .select()
    .single();

  if (error) {
    logger.error('createProfile failed', { error: error.message });
    return null;
  }

  // Update user role to provider
  await supabase.from('users').update({ role: 'provider' }).eq('id', userId);

  logger.info('Profile created (pending review)', { profileId: profile.id, name: profile.name });
  return profile;
}

// Get profile by user_id
export async function getProfileByUserId(userId) {
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .eq('is_active', true)
    .single();
  return data || null;
}

// Simple price string parser — "₹5000-₹20000" → [5000, 20000]
function parsePricing(pricingStr) {
  const numbers = pricingStr.replace(/[₹,\s]/g, '').match(/\d+/g);
  if (!numbers) return [null, null];
  if (numbers.length === 1) return [parseInt(numbers[0]), null];
  return [parseInt(numbers[0]), parseInt(numbers[1])];
}
