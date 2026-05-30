


















import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  try {
    const { amount, phone, orderId } = await req.json()

    // 1. Sanitize Phone Number (Ensures it starts with 254...)
    const cleanPhone = phone.replace(/\D/g, '').replace(/^0/, '254').replace(/^\+/, '');

    // 2. Generate Access Token
    const consumerKey = Deno.env.get('MPESA_CONSUMER_KEY')
    const consumerSecret = Deno.env.get('MPESA_CONSUMER_SECRET')
    
    const auth = btoa(`${consumerKey}:${consumerSecret}`)
    const tokenRes = await fetch("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
      headers: { Authorization: `Basic ${auth}` }
    })
    
    if (!tokenRes.ok) throw new Error("Failed to fetch M-Pesa token");
    const { access_token } = await tokenRes.json()

    // 3. Prepare Password & Timestamp
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14)
    const shortCode = Deno.env.get('MPESA_SHORTCODE')
    const passKey = Deno.env.get('MPESA_PASSKEY')
    const password = btoa(`${shortCode}${passKey}${timestamp}`)

    // 4. Request STK Push
    const mpesaRes = await fetch("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
      method: "POST",
      headers: { 
        "Authorization": `Bearer ${access_token}`, 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline", // Use 'CustomerBuyGoodsOnline' for Till Numbers
        Amount: Math.round(amount), // M-Pesa doesn't like decimals in some instances
        PartyA: cleanPhone,
        PartyB: shortCode,
        PhoneNumber: cleanPhone,
        CallBackURL: Deno.env.get('MPESA_CALLBACK_URL'), 
        AccountReference: `JAHA-${orderId}`,
        TransactionDesc: "Jaha Shoe Store Payment"
      })
    })

    const result = await mpesaRes.json()
    return new Response(JSON.stringify(result), { 
      status: 200, 
      headers: { "Content-Type": "application/json" } 
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 400, 
      headers: { "Content-Type": "application/json" } 
    })
  }
})






















// import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// serve(async (req) => {
//   const { amount, phone, orderId } = await req.json()
  
//   // 1. Generate Access Token
//   const auth = btoa(`${Deno.env.get('MPESA_CONSUMER_KEY')}:${Deno.env.get('MPESA_CONSUMER_SECRET')}`)
//   const tokenRes = await fetch("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
//     headers: { Authorization: `Basic ${auth}` }
//   })
//   const { access_token } = await tokenRes.json()

//   // 2. Prepare Password & Timestamp
//   const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14)
//   const password = btoa(`${Deno.env.get('MPESA_SHORTCODE')}${Deno.env.get('MPESA_PASSKEY')}${timestamp}`)

//   // 3. Request STK Push
//   const res = await fetch("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
//     method: "POST",
//     headers: { Authorization: `Bearer ${access_token}`, "Content-Type": "application/json" },
//     body: JSON.stringify({
//       BusinessShortCode: Deno.env.get('MPESA_SHORTCODE'),
//       Password: password,
//       Timestamp: timestamp,
//       TransactionType: "CustomerPayBillOnline",
//       Amount: amount,
//       PartyA: phone,
//       PartyB: Deno.env.get('MPESA_SHORTCODE'),
//       PhoneNumber: phone,
//       CallBackURL: `https://your-project-id.functions.supabase.co/mpesa-callback`, 
//       AccountReference: `JAHA-${orderId}`,
//       TransactionDesc: "Shoe Store Payment"
//     })
//   })

//   const result = await res.json()
//   return new Response(JSON.stringify(result), { headers: { "Content-Type": "application/json" } })
// })
