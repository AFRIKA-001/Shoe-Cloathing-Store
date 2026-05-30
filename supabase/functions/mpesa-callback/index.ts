

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  // 1. Handle CORS Preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { 
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      } 
    })
  }

  try {
    const body = await req.json()
    const callbackData = body.Body.stkCallback

    // 2. Initialize Supabase
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const checkoutId = callbackData.CheckoutRequestID
    const resultCode = callbackData.ResultCode

    // 3. Log the raw callback for auditing (Highly recommended for support)
    console.log(`Processing M-Pesa Callback for ID: ${checkoutId} | Result: ${resultCode}`)

    // 4. Handle Successful Payment (ResultCode 0)
    if (resultCode === 0) {
      const metadata = callbackData.CallbackMetadata.Item
      const receipt = metadata.find((i: any) => i.Name === "MpesaReceiptNumber")?.Value
      const amount = metadata.find((i: any) => i.Name === "Amount")?.Value

      const { error } = await supabase
        .from('orders')
        .update({ 
          status: 'paid', 
          mpesa_receipt: receipt,
          amount_paid: amount,
          updated_at: new Date().toISOString() 
        })
        .eq('checkout_id', checkoutId)
        // Ensure we don't accidentally overwrite an already processed order
        .neq('status', 'paid') 

      if (error) throw error
    } else {
      // 5. Handle Failures (User cancelled, insufficient funds, etc.)
      await supabase
        .from('orders')
        .update({ 
          status: 'failed', 
          error_message: callbackData.ResultDesc,
          updated_at: new Date().toISOString() 
        })
        .eq('checkout_id', checkoutId)
    }

    // 6. ALWAYS respond with 200 to Safaricom
    // Even if your DB update fails, you don't want Safaricom retrying indefinitely.
    return new Response(JSON.stringify({ ResultCode: 0, ResultDesc: "Success" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })

  } catch (err) {
    console.error("Callback Error:", err.message)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 200, // Still return 200 to Safaricom to stop the retry loop
      headers: { "Content-Type": "application/json" },
    })
  }
})a





















// import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
// import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// serve(async (req) => {
//   // Handle CORS Preflight requests (Important for React Frontend)
//   if (req.method === 'OPTIONS') {
//     return new Response('ok', { 
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
//       } 
//     })
//   }

//   try {
//     const body = await req.json()
//     const callbackData = body.Body.stkCallback

//     // Initialize Supabase with Service Role Key (Server-side bypass RLS)
//     const supabase = createClient(
//       Deno.env.get('SUPABASE_URL') ?? '',
//       Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
//     )

//     // ResultCode 0 means the user entered their PIN successfully
//     if (callbackData.ResultCode === 0) {
//       const checkoutId = callbackData.CheckoutRequestID
//       // Extract the Receipt Number from the M-Pesa Metadata array
//       const metadata = callbackData.CallbackMetadata.Item
//       const receipt = metadata.find((i: any) => i.Name === "MpesaReceiptNumber")?.Value

//       const { error } = await supabase
//         .from('orders')
//         .update({ 
//           status: 'paid', 
//           mpesa_receipt: receipt,
//           updated_at: new Date().toISOString() 
//         })
//         .eq('checkout_id', checkoutId)

//       if (error) throw error
//     }

//     return new Response(JSON.stringify({ message: "Callback processed" }), {
//       status: 200,
//       headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' },
//     })

//   } catch (err) {
//     return new Response(JSON.stringify({ error: err.message }), {
//       status: 400,
//       headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': '*' },
//     })
//   }
// })