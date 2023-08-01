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
          dob: string | null;
          email: string;
          first_name: string;
          id: string;
          is_cancelled: boolean | null;
          is_emergency: boolean | null;
          is_scheduled: boolean | null;
          last_name: string;
          mobile_phone: string;
          requested_date: string | null;
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
          dob?: string | null;
          email: string;
          first_name: string;
          id?: string;
          is_cancelled?: boolean | null;
          is_emergency?: boolean | null;
          is_scheduled?: boolean | null;
          last_name: string;
          mobile_phone: string;
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
          dob?: string | null;
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
          {
            foreignKeyName: 'Personnel_practice_fkey';
            columns: ['practice'];
            referencedRelation: 'Practice';
            referencedColumns: ['id'];
          },
        ];
      };
      Practice: {
        Row: {
          city: string;
          created_at: string | null;
          email: string | null;
          id: number;
          name: string;
          owner: string | null;
          phone: string | null;
        };
        Insert: {
          city: string;
          created_at?: string | null;
          email?: string | null;
          id?: number;
          name: string;
          owner?: string | null;
          phone?: string | null;
        };
        Update: {
          city?: string;
          created_at?: string | null;
          email?: string | null;
          id?: number;
          name?: string;
          owner?: string | null;
          phone?: string | null;
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
      personnel_type: 'doctor' | 'support_staff';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
