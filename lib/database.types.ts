export interface Database {
  public: {
    Tables: {
      polls: {
        Row: {
          id: string;
          user_id: string | null;
          question_text: string;
          option_text: string;
          created_at: string;
          updated_at: string;
          is_active: boolean;
          expires_at: string | null;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          question_text: string;
          option_text: string;
          created_at?: string;
          updated_at?: string;
          is_active?: boolean;
          expires_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          question_text?: string;
          option_text?: string;
          created_at?: string;
          updated_at?: string;
          is_active?: boolean;
          expires_at?: string | null;
        };
      };
      poll_options: {
        Row: {
          id: string;
          poll_id: string;
          option_text: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          poll_id: string;
          option_text: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          poll_id?: string;
          option_text?: string;
          created_at?: string;
        };
      };
      votes: {
        Row: {
          id: string;
          poll_id: string;
          option_id: string;
          voter_id: string | null;
          voter_ip: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          poll_id: string;
          option_id: string;
          voter_id?: string | null;
          voter_ip?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          poll_id?: string;
          option_id?: string;
          voter_id?: string | null;
          voter_ip?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Helper types for common operations
export type Poll = Database['public']['Tables']['polls']['Row'];
export type PollInsert = Database['public']['Tables']['polls']['Insert'];
export type PollUpdate = Database['public']['Tables']['polls']['Update'];

export type PollOption = Database['public']['Tables']['poll_options']['Row'];
export type PollOptionInsert = Database['public']['Tables']['poll_options']['Insert'];
export type PollOptionUpdate = Database['public']['Tables']['poll_options']['Update'];

export type Vote = Database['public']['Tables']['votes']['Row'];
export type VoteInsert = Database['public']['Tables']['votes']['Insert'];
export type VoteUpdate = Database['public']['Tables']['votes']['Update'];

// Extended types for UI display
export interface PollWithOptions extends Poll {
  options: PollOption[];
  total_votes: number;
}

export interface PollWithVotes extends PollWithOptions {
  votes: Vote[];
}
