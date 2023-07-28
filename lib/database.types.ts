export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      Appointments: {
        Row: {
          first_name: string;
          last_name: string;
          appointment_type: string | null;
          mobile_phone: string;
          email: string;
          requested_date: string | null;
          requested_time: string | null;
          description: string | null;
          created_at?: string | null;
          created_by?: string | null;
          id?: string;
          is_cancelled?: boolean | null;
          is_emergency?: boolean | null;
          is_scheduled?: boolean | null;
          scheduled_by?: string | null;
          scheduled_date?: string | null;
          scheduled_time?: string | null;
        };
        Insert: {
          appointment_type?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          description?: string | null;
          email: string;
          first_name: string;
          id?: string;
          is_cancelled?: boolean | null;
          is_emergency?: string | null;
          is_scheduled?: boolean | null;
          last_name: string;
          mobile_phone: string;
          requested_date?: string | null;
          requested_time?: string | null;
          scheduled_by?: string | null;
          scheduled_date?: string | null;
          scheduled_time?: string | null;
        };
        Update: {
          appointment_type?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          description?: string | null;
          email?: string;
          first_name?: string;
          id?: string;
          is_cancelled?: boolean | null;
          is_emergency?: boolean | null;
          is_scheduled?: boolean | null;
          last_name?: string;
          mobile_phone?: string;
          requested_date?: string | null;
          requested_time?: string | null;
          scheduled_by?: string | null;
          scheduled_date?: string | null;
          scheduled_time?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'Appointments_created_by_fkey';
            columns: ['created_by'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Appointments_scheduled_by_fkey';
            columns: ['scheduled_by'];
            referencedRelation: 'Users';
            referencedColumns: ['id'];
          },
        ];
      };
      Users: {
        Row: {
          appointments: string | null;
          created_at: string | null;
          email: string | null;
          first_name: string;
          id: string;
          last_name: string;
          mobile_phone: string;
        };
        Insert: {
          appointments?: string | null;
          created_at?: string | null;
          email?: string | null;
          first_name: string;
          id: string;
          last_name: string;
          mobile_phone: string;
        };
        Update: {
          appointments?: string | null;
          created_at?: string | null;
          email?: string | null;
          first_name?: string;
          id?: string;
          last_name?: string;
          mobile_phone?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'Users_appointments_fkey';
            columns: ['appointments'];
            referencedRelation: 'Appointments';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Users_id_fkey';
            columns: ['id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      appointment_type_enum:
        | 'Exam'
        | 'Hygiene'
        | 'Extraction'
        | 'Restoration'
        | 'Other';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
