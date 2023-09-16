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
          appointment_type: string | null;
          created_at: string | null;
          created_by: string | null;
          description: string | null;
          email: string;
          first_name: string;
          id: string;
          is_cancelled: boolean | null;
          is_emergency: boolean | null;
          is_scheduled: boolean | null;
          last_name: string;
          mobile_phone: string;
          practice_id: string | null;
          requested_date: Date | null;
          requested_time: string | null;
          scheduled_by: string | null;
          scheduled_date: string | null;
          scheduled_time: string | null;
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
          is_emergency?: boolean | null;
          is_scheduled?: boolean | null;
          last_name: string;
          mobile_phone: string;
          practice_id?: string | null;
          requested_date?: Date | null;
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
          practice_id?: string | null;
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
            foreignKeyName: 'Appointments_practice_id_fkey';
            columns: ['practice_id'];
            referencedRelation: 'Practice';
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
      Personnel: {
        Row: {
          created_at: string | null;
          first_name: string;
          id: string;
          is_provider: boolean | null;
          last_name: string;
          mobile: string | null;
          practice: number | null;
          title: Database['public']['Enums']['personnel_type'] | null;
        };
        Insert: {
          created_at?: string | null;
          first_name: string;
          id: string;
          is_provider?: boolean | null;
          last_name: string;
          mobile?: string | null;
          practice?: number | null;
          title?: Database['public']['Enums']['personnel_type'] | null;
        };
        Update: {
          created_at?: string | null;
          first_name?: string;
          id?: string;
          is_provider?: boolean | null;
          last_name?: string;
          mobile?: string | null;
          practice?: number | null;
          title?: Database['public']['Enums']['personnel_type'] | null;
        };
        Relationships: [
          {
            foreignKeyName: 'Personnel_id_fkey';
            columns: ['id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      Practice: {
        Row: {
          city: string;
          created_at: string | null;
          email: string | null;
          id: string;
          logo: string | null;
          name: string;
          owner: string | null;
          phone: string | null;
          practice_code: string | null;
          street_address: string | null;
          website: string | null;
        };
        Insert: {
          city: string;
          created_at?: string | null;
          email?: string | null;
          id?: string;
          logo?: string | null;
          name: string;
          owner?: string | null;
          phone?: string | null;
          practice_code?: string | null;
          street_address?: string | null;
        };
        Update: {
          city?: string;
          created_at?: string | null;
          email?: string | null;
          id?: string;
          logo?: string | null;
          name?: string;
          owner?: string | null;
          phone?: string | null;
          practice_code?: string | null;
          street_address?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'Practice_owner_fkey';
            columns: ['owner'];
            referencedRelation: 'Personnel';
            referencedColumns: ['id'];
          },
        ];
      };
      Users: {
        Row: {
          created_at: string | null;
          email: string | null;
          first_name: string;
          id: string;
          last_name: string;
          mobile_phone: string;
          practice_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          email?: string | null;
          first_name: string;
          id: string;
          last_name: string;
          mobile_phone: string;
          practice_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          email?: string | null;
          first_name?: string;
          id?: string;
          last_name?: string;
          mobile_phone?: string;
          practice_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'Users_id_fkey';
            columns: ['id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Users_practice_id_fkey';
            columns: ['practice_id'];
            referencedRelation: 'Practice';
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
      personnel_type: 'doctor' | 'support_staff';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
