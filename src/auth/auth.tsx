"use client";
import { supabase } from "@/utility/supabase";

export const checkUserSession = async () => {
  const { error, data }: any = await supabase.auth.getSession();

  if (error) return false;
  if (!data.session) return false;

  const loginTime = new Date(data?.session?.user?.last_sign_in_at).getTime();

  // Calculate expiry time as 7 days after login time
  const expiryTime = new Date(loginTime + 7 * 24 * 60 * 60 * 1000).getTime();

  const currentTime = new Date().getTime();

  if (expiryTime < currentTime) return false;

  return true;
};

export const accessToken = async () => {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token;
};

export const refreshToken = async () => {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.refresh_token;
  return token;
};

export const logoutUser = async () => {
  supabase.auth.signOut();
};
