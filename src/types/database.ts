export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      authors: {
        Row: {
          avatar_path: string | null
          bio: string | null
          created_at: string
          id: number
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          avatar_path?: string | null
          bio?: string | null
          created_at?: string
          id?: never
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          avatar_path?: string | null
          bio?: string | null
          created_at?: string
          id?: never
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      bookmarks: {
        Row: {
          created_at: string
          story_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          story_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          story_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookmarks_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "stories"
            referencedColumns: ["id"]
          },
        ]
      }
      chapter_contents: {
        Row: {
          chapter_id: number
          content: string
          content_format: string
          updated_at: string
        }
        Insert: {
          chapter_id: number
          content: string
          content_format?: string
          updated_at?: string
        }
        Update: {
          chapter_id?: number
          content?: string
          content_format?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "chapter_contents_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: true
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      chapters: {
        Row: {
          access_level: string
          chapter_number: number
          coin_price: number
          created_at: string
          id: number
          is_hot: boolean
          publication_status: string
          published_at: string | null
          slug: string
          story_id: number
          title: string
          updated_at: string
          word_count: number
        }
        Insert: {
          access_level?: string
          chapter_number: number
          coin_price?: number
          created_at?: string
          id?: never
          is_hot?: boolean
          publication_status?: string
          published_at?: string | null
          slug: string
          story_id: number
          title: string
          updated_at?: string
          word_count?: number
        }
        Update: {
          access_level?: string
          chapter_number?: number
          coin_price?: number
          created_at?: string
          id?: never
          is_hot?: boolean
          publication_status?: string
          published_at?: string | null
          slug?: string
          story_id?: number
          title?: string
          updated_at?: string
          word_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "chapters_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "stories"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          body: string
          chapter_id: number | null
          created_at: string
          id: number
          like_count: number
          parent_id: number | null
          status: string
          story_id: number
          updated_at: string
          user_id: string
        }
        Insert: {
          body: string
          chapter_id?: number | null
          created_at?: string
          id?: never
          like_count?: number
          parent_id?: number | null
          status?: string
          story_id: number
          updated_at?: string
          user_id: string
        }
        Update: {
          body?: string
          chapter_id?: number | null
          created_at?: string
          id?: never
          like_count?: number
          parent_id?: number | null
          status?: string
          story_id?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_story_chapter_fkey"
            columns: ["story_id", "chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["story_id", "id"]
          },
          {
            foreignKeyName: "comments_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "stories"
            referencedColumns: ["id"]
          },
        ]
      }
      genres: {
        Row: {
          description: string | null
          id: number
          name: string
          slug: string
          sort_order: number
        }
        Insert: {
          description?: string | null
          id?: never
          name: string
          slug: string
          sort_order?: number
        }
        Update: {
          description?: string | null
          id?: never
          name?: string
          slug?: string
          sort_order?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_path: string | null
          bio: string | null
          created_at: string
          display_name: string
          id: string
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_path?: string | null
          bio?: string | null
          created_at?: string
          display_name: string
          id: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_path?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string
          id?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      reading_progress: {
        Row: {
          chapter_id: number
          last_read_at: string
          progress_percent: number
          scroll_offset: number
          story_id: number
          updated_at: string
          user_id: string
        }
        Insert: {
          chapter_id: number
          last_read_at?: string
          progress_percent?: number
          scroll_offset?: number
          story_id: number
          updated_at?: string
          user_id: string
        }
        Update: {
          chapter_id?: number
          last_read_at?: string
          progress_percent?: number
          scroll_offset?: number
          story_id?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reading_progress_story_chapter_fkey"
            columns: ["story_id", "chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["story_id", "id"]
          },
          {
            foreignKeyName: "reading_progress_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "stories"
            referencedColumns: ["id"]
          },
        ]
      }
      stories: {
        Row: {
          alternative_title: string | null
          author_id: number
          chapter_count: number
          cover_path: string | null
          created_at: string
          follow_count: number
          id: number
          is_featured: boolean
          is_hot: boolean
          is_vip: boolean
          latest_chapter_number: number | null
          latest_published_at: string | null
          publication_status: string
          published_at: string | null
          rating_average: number
          rating_count: number
          read_count: number
          search_vector: unknown
          slug: string
          story_status: string
          synopsis: string
          title: string
          updated_at: string
        }
        Insert: {
          alternative_title?: string | null
          author_id: number
          chapter_count?: number
          cover_path?: string | null
          created_at?: string
          follow_count?: number
          id?: never
          is_featured?: boolean
          is_hot?: boolean
          is_vip?: boolean
          latest_chapter_number?: number | null
          latest_published_at?: string | null
          publication_status?: string
          published_at?: string | null
          rating_average?: number
          rating_count?: number
          read_count?: number
          search_vector?: unknown
          slug: string
          story_status?: string
          synopsis: string
          title: string
          updated_at?: string
        }
        Update: {
          alternative_title?: string | null
          author_id?: number
          chapter_count?: number
          cover_path?: string | null
          created_at?: string
          follow_count?: number
          id?: never
          is_featured?: boolean
          is_hot?: boolean
          is_vip?: boolean
          latest_chapter_number?: number | null
          latest_published_at?: string | null
          publication_status?: string
          published_at?: string | null
          rating_average?: number
          rating_count?: number
          read_count?: number
          search_vector?: unknown
          slug?: string
          story_status?: string
          synopsis?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "stories_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "authors"
            referencedColumns: ["id"]
          },
        ]
      }
      story_genres: {
        Row: {
          genre_id: number
          is_primary: boolean
          story_id: number
        }
        Insert: {
          genre_id: number
          is_primary?: boolean
          story_id: number
        }
        Update: {
          genre_id?: number
          is_primary?: boolean
          story_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "story_genres_genre_id_fkey"
            columns: ["genre_id"]
            isOneToOne: false
            referencedRelation: "genres"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "story_genres_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "stories"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      search_stories: {
        Args: {
          cursor_id?: number
          cursor_rank?: number
          page_size?: number
          search_query: string
        }
        Returns: {
          author_name: string
          cover_path: string
          id: number
          latest_chapter_number: number
          latest_published_at: string
          rank: number
          slug: string
          story_status: string
          synopsis: string
          title: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
