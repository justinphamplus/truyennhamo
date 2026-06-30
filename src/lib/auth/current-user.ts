import "server-only";

import { createServerSupabaseClient } from "@/lib/supabase/server";

export type CurrentProfile = {
  id: string;
  email: string;
  displayName: string;
  username: string | null;
  avatarPath: string | null;
  bio: string | null;
};

export async function getCurrentProfile(): Promise<CurrentProfile | null> {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user?.email) return null;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, username, display_name, avatar_path, bio")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) return null;

  return {
    id: profile.id,
    email: user.email,
    displayName: profile.display_name,
    username: profile.username,
    avatarPath: profile.avatar_path,
    bio: profile.bio,
  };
}
