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
      _accountToprofiles: {
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
            foreignKeyName: "_accountToprofiles_A_fkey"
            columns: ["A"]
            referencedRelation: "account"
            referencedColumns: ["phonenumber"]
          },
          {
            foreignKeyName: "_accountToprofiles_B_fkey"
            columns: ["B"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      account: {
        Row: {
          agentcode: string
          agentname: string
          phonenumber: string
        }
        Insert: {
          agentcode: string
          agentname: string
          phonenumber: string
        }
        Update: {
          agentcode?: string
          agentname?: string
          phonenumber?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          full_name: string
          id: string
          role: Database["public"]["Enums"]["role"]
          shopid: string
        }
        Insert: {
          full_name: string
          id: string
          role?: Database["public"]["Enums"]["role"]
          shopid: string
        }
        Update: {
          full_name?: string
          id?: string
          role?: Database["public"]["Enums"]["role"]
          shopid?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_shopid_fkey"
            columns: ["shopid"]
            referencedRelation: "shop"
            referencedColumns: ["id"]
          }
        ]
      }
      shop: {
        Row: {
          createAt: string
          id: string
          shop_informations: string
          shop_name: string
          updatedAt: string
        }
        Insert: {
          createAt?: string
          id: string
          shop_informations: string
          shop_name: string
          updatedAt: string
        }
        Update: {
          createAt?: string
          id?: string
          shop_informations?: string
          shop_name?: string
          updatedAt?: string
        }
        Relationships: []
      }
      sub_account: {
        Row: {
          account_number: string
          amount: number
          devise: Database["public"]["Enums"]["devise"]
          id: string
          type: string
        }
        Insert: {
          account_number: string
          amount: number
          devise: Database["public"]["Enums"]["devise"]
          id: string
          type: string
        }
        Update: {
          account_number?: string
          amount?: number
          devise?: Database["public"]["Enums"]["devise"]
          id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "sub_account_account_number_fkey"
            columns: ["account_number"]
            referencedRelation: "account"
            referencedColumns: ["phonenumber"]
          }
        ]
      }
      transaction: {
        Row: {
          amount: number
          clientName: string
          createAt: string
          id: string
          identityPiece: string
          numero_reference: string
          phoneNumber: string
          sub_account_id: string
          transation_genre: Database["public"]["Enums"]["genre_transation"]
          transation_type: Database["public"]["Enums"]["type_transaction"]
          updatedAt: string
          users_id: string
        }
        Insert: {
          amount: number
          clientName: string
          createAt?: string
          id: string
          identityPiece: string
          numero_reference: string
          phoneNumber: string
          sub_account_id: string
          transation_genre: Database["public"]["Enums"]["genre_transation"]
          transation_type: Database["public"]["Enums"]["type_transaction"]
          updatedAt: string
          users_id: string
        }
        Update: {
          amount?: number
          clientName?: string
          createAt?: string
          id?: string
          identityPiece?: string
          numero_reference?: string
          phoneNumber?: string
          sub_account_id?: string
          transation_genre?: Database["public"]["Enums"]["genre_transation"]
          transation_type?: Database["public"]["Enums"]["type_transaction"]
          updatedAt?: string
          users_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transaction_sub_account_id_fkey"
            columns: ["sub_account_id"]
            referencedRelation: "sub_account"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transaction_users_id_fkey"
            columns: ["users_id"]
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
      devise: "CDF" | "USD"
      genre_transation: "Equity" | "Airtel" | "Vodacom" | "Africell" | "Orange"
      role: "Admin" | "Manager" | "User"
      type_transaction: "Depot" | "Retrait" | "Approvisionement"
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
