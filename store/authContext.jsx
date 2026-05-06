import { createContext, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { Loader2 } from "lucide-react";

const UserAuthContext = createContext({
    SignUp:() => {},
    SignIn:() => {},
    SignOut:() => {}
})


export const UserAuthContextProvider =  ({children}) => {

    const [session,setSession] = useState(null);
    const [isLoading,setIsLoading] = useState(true);
//  signup logic goes here

const signUp = async (email,password,username)=>{

    const {data,error} = await supabase.auth.signUp({
     email:email,
     password:password,
     options:{
        data:{
            username:username
        }
    }
    })
    if(error){
        return {succes:false,error}
    }
    return{successs:true,data}
}

//signin logic here

const signIn = async (email,password) => {
    try{
    const {data,error} = await supabase.auth.signInWithPassword({
        email:email,
        password:password
    });
    if(error){
        return {success:false , error}
    }
    return{success:true ,data }
    }catch(error){
        console.log("There was an error caught during sining in",error)
    }
}

//session goes here using useEffect  hook

useEffect(() => {
    supabase.auth.getSession().then(({data:session})=>{
    setSession(session)
     setIsLoading(false)
    })

    supabase.auth.onAuthStateChange((_event,session) => {
        setSession(session);
        setIsLoading(false)
    })
},[]);


//logout goes here
const signOut = async () => {
    const {error} = supabase.auth.signOut();
    if(error){
        console.error("an error occured",error)
    }

}

const userAuthContext = {
    signUp,
    signIn,
    signOut,
    session
}

    return(
    <>
     <UserAuthContext.Provider value={userAuthContext}> 
        {isLoading ? children : <Loader2 className="flex  mx-auto animate-spin text-red-600 my-60"/>}
         </UserAuthContext.Provider>

    </>
    ) 
 }


export default UserAuthContext;