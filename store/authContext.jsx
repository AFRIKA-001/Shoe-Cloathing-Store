 import { createContext, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { Loader2 } from "lucide-react";

const UserAuthContext = createContext({
    signUp: () => {},
    signIn: () => {},
    signOut: () => {},
    session: null
});

export const UserAuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Signup logic
    const signUp = async (email, password, username) => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    username: username
                }
            }
        });

        if (error) {
            return { success: false, error };
        }
        return { success: true, data };
    };

    // Signin logic
    const signIn = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) {
                return { success: false, error };
            }
            return { success: true, data };
        } catch (error) {
            console.log("There was an error caught during signing in", error);
            return { success: false, error };
        }
    };

    // Session handling with useEffect
    useEffect(() => {
        
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setIsLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setIsLoading(false);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    // Logout logic
    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("An error occurred during sign out", error);
        } else {
            setSession(null);
        }
    };

    const userAuthContextValue = {
        signUp,
        signIn,
        signOut,
        session
    };

    return (
        <UserAuthContext.Provider value={userAuthContextValue}>
            {isLoading ? (
                <div className="flex h-screen items-center justify-center">
                    <Loader2 className="animate-spin text-red-600 size-12" />
                </div>
            ) : (
                children
            )}
        </UserAuthContext.Provider>
    );
};

export default UserAuthContext;