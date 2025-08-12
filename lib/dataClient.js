import { createClient } from '@supabase/supabase-js';

// Grab keys from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// This one is optional for future server-side admin calls
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Toggle between mock and live without touching code
const MODE = process.env.DATA_MODE || 'mock';

// Create the Supabase client for live mode
const liveClient = createClient(supabaseUrl, supabaseAnonKey);

// --- Mock data for development ---
const mockDevice = {
  id: 'demo-device-1',
  device_code: 'YND-6J9Q-4C2M-AX7T',
  child_name: 'Avery',
  language: 'en'
};

const mockContacts = [
  { id: 'c1', slot: 1, name: 'Mom', method: 'sms+app', phone_e164: '+15555550001' },
  { id: 'c2', slot: 2, name: 'Dad', method: 'sms', phone_e164: '+15555550002' },
  { id: 'c3', slot: 3, name: 'Sam', method: 'yonda', yonda_device_code: 'YND-ABCD-1234-EFGH' },
];

const mockMessages = [
  { id: 'm1', direction: 'from_device', transcript: 'Got to school!', created_at: new Date().toISOString(), from_slot: 1, status: 'sent' },
  { id: 'm2', direction: 'to_device', transcript: 'Have a great day', created_at: new Date().toISOString(), to_slot: 1, status: 'delivered' },
];

const mockPlaces = [
  { id: 'p1', label: 'Home', lat: 43.6532, lng: -79.3832, radius_m: 150 },
  { id: 'p2', label: 'School', lat: 43.6629, lng: -79.3957, radius_m: 200 },
];

// --- Exported API ---
export function getDataClient() {
  if (MODE === 'live') {
    return {
      async getDevice() {
        const { data, error } = await liveClient
          .from('devices')
          .select('*')
          .limit(1)
          .maybeSingle();
        if (error) throw error;
        return data;
      },
      async getContacts(deviceId) {
        if (!deviceId) return [];
        const { data, error } = await liveClient
          .from('device_contacts')
          .select('*')
          .eq('device_id', deviceId)
          .order('slot');
        if (error) throw error;
        return data || [];
      },
      async getMessages(deviceId) {
        if (!deviceId) return [];
        const { data, error } = await liveClient
          .from('messages')
          .select('*')
          .eq('device_id', deviceId)
          .order('created_at', { ascending: false })
          .limit(20);
        if (error) throw error;
        return data || [];
      },
      async getPlaces(userId) {
        const { data, error } = await liveClient
          .from('places')
          .select('*')
          .order('label');
        if (error) throw error;
        return data || [];
      }
    };
  }

  // Mock mode fallback
  return {
    async getDevice() { return mockDevice; },
    async getContacts() { return mockContacts; },
    async getMessages() { return mockMessages; },
    async getPlaces() { return mockPlaces; },
  };
}
