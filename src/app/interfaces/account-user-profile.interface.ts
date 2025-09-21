export interface AccountUserProfile {
  id?: number;
  user_id?: number;
  title?: string;
  hourly_rate?: number;
  overtime_rate?: number;
  hire_date?: string;
  is_active?: boolean;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  zip?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  created_at?: string;
  updated_at?: string;
}