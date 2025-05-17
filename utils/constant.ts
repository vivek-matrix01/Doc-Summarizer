 export const pricingPlans = [
    {
      id: "basic",
      name: "Basic",
      price: 9,
      description: "Basic plan for individuals",
      items: [
        "5 PDF summaries per month",
        "Standard processing Speed",
        "Email support",
      ],
      paymentLink: process.env.NODE_ENV==='development' ? "https://buy.stripe.com/test_14k8zW7ucdNY76wdQS":"",
      priceId: process.env.NODE_ENV ? 'price_1RIwDr2e3ofOYLWmeOnWeUyw':'',
    },
    {
      id: "pro",
      name: "Pro",
      price: 19,
      description: "For professionals and teams",
      items: [
        "Unlimited PDF summaries",
        "Priority processing",
        "24/7 priority support",
        "Markdown Export",
      ],
      paymentLink: process.env.NODE_ENV==='development' ? "https://buy.stripe.com/test_aEUdUgdSA6lwfD23cd":'',
      priceId: process.env.NODE_ENV ? 'price_1RIwDr2e3ofOYLWm4rW7dBfs':'',
    },
  ];

  export const containerVariants={
    hidden:{opacity:0},
    visible:{
      opacity:1,
      transition:{
        staggerChildren:0.2,
        delayChildren:0.1,
      }
    }
  }
  export const itemVariants={
    hidden:{opacity:0,y:20},
    visible:{
      opacity:1, 
      transition:{
        type:'spring',
        damping:15,
        stiffness:50,
        duration:0.8,
        
      }
    }
  }