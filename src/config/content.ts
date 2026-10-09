// src/config/content.ts
export const I3_CONTENT = {
  hero: {
    superTitle: "ELITE IN THE FIELD. INVISIBLE IN THE FEED.",
    statement: "You don't build the whole house. But your work lives here, and the client who lives here is asking AI who to hire."
  },
  scenes: {
    scene1_curbAppeal: "25+ years of reputation. One search away from invisibility.",
    scene2_interiorAudio: "Master craftsmanship inside the room. Completely invisible to the machines outside.",
    scene3_outdoorOasis: "Your clients demand perfection. Conversational search recommends whoever it can read and trust.",
    scene4_motorCourt: "Reputation is built by hand. We make sure modern search engines cannot bypass it for louder competitors."
  },
  intakeConsole: {
    tagline: "MT Media AI: The Infrastructure Beneath YOUR Kingdom",
    header: "Verify Your Zip Code",
    subtext: "Enter your 5-digit zip code to see if your category seat is open, reserved, or currently held on the waiting list.",
    constraint: "One category leader per craft. One firm per zip code.",
    submitButton: "Check Seat Availability"
  },
  craftOptions: [
    { id: "REALTOR", label: "Luxury Real Estate Advisor", isConstant: true },
    { id: "BUILDER", label: "Custom Luxury Home Builder", isConstant: true },
    { id: "POOL_OUTDOOR", label: "Custom Pool & Outdoor Living Architect", isConstant: false },
    { id: "EURO_AUTO", label: "European Automotive & Performance Specialist", isConstant: false },
    { id: "SMART_HOME_AV", label: "Smart Home Automation & Estate Audio/Video", isConstant: false },
    { id: "REMODEL_LANDSCAPE", label: "Bespoke Architectural Remodeling & Landscape", isConstant: false },
    { id: "OTHER", label: "Other (Specify Your Craft)", isSensor: true }
  ]
};
