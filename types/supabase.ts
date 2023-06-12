export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      _AccountToprofiles: {
        Row: {
          A: string
          B: string
        }
        Insert: {
          A: string
          B: string
        }
        Update: {
          A?: string
          B?: string
        }
        Relationships: [
          {
            foreignKeyName: "_AccountToprofiles_A_fkey"
            columns: ["A"]
            referencedRelation: "Account"
            referencedColumns: ["phoneNumber"]
          },
          {
            foreignKeyName: "_AccountToprofiles_B_fkey"
            columns: ["B"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      Account: {
        Row: {
          agentCode: string
          agentName: string
          phoneNumber: string
        }
        Insert: {
          agentCode: string
          agentName: string
          phoneNumber: string
        }
        Update: {
          agentCode?: string
          agentName?: string
          phoneNumber?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          fullName: string
          id: string
          role: Database["public"]["Enums"]["Role"]
          shopId: string | null
        }
        Insert: {
          fullName: string
          id: string
          role?: Database["public"]["Enums"]["Role"]
          shopId?: string | null
        }
        Update: {
          fullName?: string
          id?: string
          role?: Database["public"]["Enums"]["Role"]
          shopId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_shopId_fkey"
            columns: ["shopId"]
            referencedRelation: "Shop"
            referencedColumns: ["id"]
          }
        ]
      }
      Shop: {
        Row: {
          createAt: string
          id: string
          shopInformation: string
          shopName: string
          updatedAt: string
        }
        Insert: {
          createAt?: string
          id: string
          shopInformation: string
          shopName: string
          updatedAt: string
        }
        Update: {
          createAt?: string
          id?: string
          shopInformation?: string
          shopName?: string
          updatedAt?: string
        }
        Relationships: []
      }
      SubAccount: {
        Row: {
          accountNumber: string
          amount: number
          devise: Database["public"]["Enums"]["Devise"]
          id: string
          type: string
        }
        Insert: {
          accountNumber: string
          amount: number
          devise: Database["public"]["Enums"]["Devise"]
          id: string
          type: string
        }
        Update: {
          accountNumber?: string
          amount?: number
          devise?: Database["public"]["Enums"]["Devise"]
          id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "SubAccount_accountNumber_fkey"
            columns: ["accountNumber"]
            referencedRelation: "Account"
            referencedColumns: ["phoneNumber"]
          }
        ]
      }
      Transations: {
        Row: {
          amount: number
          clientName: string
          createAt: string
          id: string
          identityPiece: string
          numeroReference: string
          phoneNumber: string
          subAccountId: string
          transationGenre: Database["public"]["Enums"]["GenreTransation"]
          transationType: Database["public"]["Enums"]["TypeTransaction"]
          updatedAt: string
          usersId: string
        }
        Insert: {
          amount: number
          clientName: string
          createAt?: string
          id: string
          identityPiece: string
          numeroReference: string
          phoneNumber: string
          subAccountId: string
          transationGenre: Database["public"]["Enums"]["GenreTransation"]
          transationType: Database["public"]["Enums"]["TypeTransaction"]
          updatedAt: string
          usersId: string
        }
        Update: {
          amount?: number
          clientName?: string
          createAt?: string
          id?: string
          identityPiece?: string
          numeroReference?: string
          phoneNumber?: string
          subAccountId?: string
          transationGenre?: Database["public"]["Enums"]["GenreTransation"]
          transationType?: Database["public"]["Enums"]["TypeTransaction"]
          updatedAt?: string
          usersId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Transations_subAccountId_fkey"
            columns: ["subAccountId"]
            referencedRelation: "SubAccount"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Transations_usersId_fkey"
            columns: ["usersId"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      Devise: "CDF" | "USD"
      GenreTransation: "Equity" | "Airtel" | "Vodacom" | "Africell" | "Orange"
      Role: "Admin" | "Manager" | "User"
      TypeTransaction: "Depot" | "Retrait" | "Approvisionement"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "objects_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
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
