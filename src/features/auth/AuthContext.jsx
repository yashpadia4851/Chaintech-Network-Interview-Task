import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { clearSession, getSession, getUsers, setSession, setUsers } from "./authStorage";
import { SESSION_DURATION_MS } from "./auth.constants";

export const AuthContext = createContext(null);

const now = () => Date.now();

function isSessionValid(session) {
  if (!session) return false;
  if (!session.expiresAt) return false;
  return now() < session.expiresAt;
}

function sanitizeUser(user) {
  if (!user) return null;
  const { password, ...rest } = user;
  return rest;
}

export function AuthProvider({ children }) {
  const [session, setSessionState] = useState(() => getSession());
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (session && !isSessionValid(session)) {
      clearSession();
      setSessionState(null);
      toast.error("Your session was over please login again!");
    }
  }, [session, tick]);

  const register = useCallback(({ name, email, password }) => {
    const users = getUsers();
    const normalizedEmail = String(email || "").trim().toLowerCase();
    if (!normalizedEmail || !password || !name) {
      return { ok: false, error: "All fields are required." };
    }
    const exists = users.some((u) => u.email.toLowerCase() === normalizedEmail);
    if (exists) return { ok: false, error: "Email already registered." };
    const newUser = { id: crypto.randomUUID(), name, email: normalizedEmail, password };
    setUsers([newUser, ...users]);
    return { ok: true };
  }, []);

  const login = useCallback(({ email, password }) => {
    const users = getUsers();
    const normalizedEmail = String(email || "").trim().toLowerCase();
    const user = users.find((u) => u.email.toLowerCase() === normalizedEmail);
    if (!user || user.password !== password) {
      return { ok: false, error: "Credentials are not valid." };
    }
    const nextSession = {
      userId: user.id,
      email: user.email,
      createdAt: now(),
      expiresAt: now() + SESSION_DURATION_MS,
    };
    setSession(nextSession);
    setSessionState(nextSession);
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setSessionState(null);
  }, []);

  const currentUser = useMemo(() => {
    if (!isSessionValid(session)) return null;
    const users = getUsers();
    const user = users.find((u) => u.id === session.userId) || null;
    return sanitizeUser(user);
  }, [session, tick]);

  const updateProfile = useCallback((updates) => {
    const sess = getSession();
    if (!isSessionValid(sess)) return { ok: false, error: "Session expired. Please login again." };
    const users = getUsers();
    const idx = users.findIndex((u) => u.id === sess.userId);
    if (idx === -1) return { ok: false, error: "User not found." };

    const nextEmail = updates.email ? String(updates.email).trim().toLowerCase() : users[idx].email;
    const emailConflict = users.some((u, i) => i !== idx && u.email.toLowerCase() === nextEmail);
    if (emailConflict) return { ok: false, error: "Email already in use." };

    const nextUser = {
      ...users[idx],
      name: updates.name ?? users[idx].name,
      email: nextEmail,
      password: updates.password ?? users[idx].password,
    };
    const nextUsers = [...users];
    nextUsers[idx] = nextUser;
    setUsers(nextUsers);

    const nextSession = { ...sess, email: nextUser.email };
    setSession(nextSession);
    setSessionState(nextSession);
    return { ok: true };
  }, []);

  const sessionRemainingMs = useMemo(() => {
    if (!isSessionValid(session)) return 0;
    return Math.max(0, session.expiresAt - now());
  }, [session, tick]);

  const value = useMemo(
    () => ({
      isAuthenticated: isSessionValid(session),
      user: currentUser,
      register,
      login,
      logout,
      updateProfile,
      sessionRemainingMs,
    }),
    [session, currentUser, register, login, logout, updateProfile, sessionRemainingMs],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

