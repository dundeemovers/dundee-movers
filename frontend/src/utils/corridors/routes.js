/**
 * Long-Distance & Intercity Corridors Data for Dundee Movers.
 * Targeted for high-value Scottish and UK routes (London, Edinburgh, Glasgow, Aberdeen, Manchester).
 * Complies strictly with AGENTS.md 500-line limits.
 */

export const UK_ROUTES = [
  {
    id: 'dundee-to-london',
    type: 'route',
    path: '/routes/dundee-to-london',
    areaName: 'Dundee to London & South UK',
    postcodes: 'DD1–DD5 ➔ London (All Postcodes) & Home Counties',
    title: 'Dundee to London Removals | Dedicated Non-Stop UK Transit | Dundee Movers',
    h1: 'Direct Non-Stop Removals: Dundee to London & South England',
    metaTitle: 'Dundee to London Removals | Dedicated Non-Stop UK Transit | Dundee Movers',
    metaDesc: 'Dedicated Dundee to London removals. 100% exclusive van with zero shared freight, direct transit, and fully insured Goods in Transit cover. Book your direct run.',
    transitBadge: 'Direct Door-to-Door • Zero Shared Cargo',
    heroSubtitle: 'Never share van space on long-distance moves. Your vehicle is 100% dedicated to your home from loading in Dundee straight to delivery in London.',
    highlights: [
      'Strict 1-move-at-a-time guarantee: zero shared courier loads',
      'Non-stop direct transit: no depot transfers or lost boxes',
      'Next-day delivery available with confirmed arrival windows',
      'Fully insured: Goods in Transit & Public Liability cover included'
    ],
    propertyTypes: [
      { name: 'City Flat Relocations', desc: 'Seamless moves from Dundee tenements to London apartments with lift or stair navigation.' },
      { name: 'Full Family Home Relocations', desc: 'Direct transit of 2 to 4-bedroom houses from Tayside to Greater London and the South East.' },
      { name: 'Career & Corporate Relocations', desc: 'Timely, stress-free moves for professionals relocating to London with guaranteed delivery dates.' }
    ],
    localLogistics: {
      title: 'London Moving Logistics & Direct Transit',
      points: [
        'Direct A90 ➔ M90 ➔ A1(M) / M6 corridor non-stop transit.',
        'Fully compliant with London Ultra Low Emission Zone (ULEZ) and Congestion Charge zones.',
        'Pre-arranged London curb loading and unloading permits.'
      ]
    },
    reviews: [
      {
        quote: 'Moved our complete 2-bed flat from Dundee to Clapham, London. The van loaded on Tuesday morning and arrived outside our London flat on Wednesday morning. Not a single item misplaced or damaged.',
        author: 'Callum & Rachel B.',
        route: 'DD1 Dundee ➔ Clapham, London'
      },
      {
        quote: 'Having the van dedicated only to our move gave total security. Every other company wanted to mix our goods with 4 other clients. Dundee Movers are in a class of their own.',
        author: 'Mark W.',
        route: 'Broughty Ferry ➔ Islington, London'
      }
    ],
    faqs: [
      {
        q: 'Why should I choose a dedicated van over shared courier freight to London?',
        a: 'Shared freight companies mix your belongings with other clients in multi-stop network hubs, leading to delays, damaged goods, and missed arrival dates. With Dundee Movers, our vehicle is 100% locked and dedicated to you from your Dundee door straight to your London door.'
      },
      {
        q: 'How long does a move from Dundee to London take?',
        a: 'We usually load in Dundee on Day 1 and deliver directly to your London address on Day 2 morning, ensuring zero downtime and exact scheduling.'
      }
    ]
  },
  {
    id: 'dundee-to-edinburgh',
    type: 'route',
    path: '/routes/dundee-to-edinburgh',
    areaName: 'Dundee to Edinburgh & Lothians',
    postcodes: 'DD1–DD5 ➔ EH1–EH26',
    title: 'Dundee to Edinburgh Removals | Same-Day Scottish Transit | Dundee Movers',
    h1: 'Express Same-Day Removals: Dundee to Edinburgh & Lothians',
    metaTitle: 'Dundee to Edinburgh Removals | Same-Day Scottish Transit | Dundee Movers',
    metaDesc: 'Fast same-day house and flat removals from Dundee to Edinburgh. 1-move-at-a-time dedicated vans, Queensferry Crossing routes, and fully insured transit.',
    transitBadge: 'Same-Day Scottish Intercity Removals',
    heroSubtitle: 'Morning load in Dundee, direct Queensferry Crossing transit, and afternoon delivery in Edinburgh. Express same-day service with exclusive vehicles.',
    highlights: [
      'Same-day morning load and afternoon delivery',
      'Edinburgh New Town & Old Town high-floor tenement specialists',
      'Full transit over the Queensferry Crossing with zero delay',
      'Fully insured with Goods in Transit cover automatically included'
    ],
    propertyTypes: [
      { name: 'City Centre Flats & Tenements', desc: 'Equipped with high-tensile lifting straps and padded furniture blankets for high-floor tenements across Marchmont, Bruntsfield, and Leith.' },
      { name: 'Suburban Houses', desc: 'Detached and semi-detached homes moving between Dundee and Edinburgh suburbs.' },
      { name: 'Commercial Office Moves', desc: 'Rapid intercity business moves between Dundee tech hubs and Edinburgh financial centers.' }
    ],
    localLogistics: {
      title: 'Edinburgh Access & Street Parking',
      points: [
        'Customer keeps a parking space outside their property; our team handles direct loading swiftly.',
        'High-tensile lifting straps and padded furniture blankets for 3rd and 4th floor traditional tenements.',
        'LEZ compliant fleet for low-emission central Edinburgh zones.'
      ]
    },
    reviews: [
      {
        quote: 'Loaded our Dundee flat at 8:30 AM and had everything safely carried into our 3rd floor flat in Stockbridge by 2:00 PM. Blown away by their speed and care.',
        author: 'Stuart P.',
        route: 'West End, Dundee ➔ Stockbridge, Edinburgh'
      },
      {
        quote: 'The smoothest moving day we have ever experienced. Fixed price, zero surprises, and two of the friendliest movers you will ever meet.',
        author: 'Jennifer M.',
        route: 'Dundee ➔ Morningside, Edinburgh'
      }
    ],
    faqs: [
      {
        q: 'Can a move from Dundee to Edinburgh be completed in a single day?',
        a: 'Yes, absolutely. The drive is approximately 80 minutes via the M90 and Queensferry Crossing. We load in the morning and deliver on the same afternoon.'
      },
      {
        q: 'Do you handle Edinburgh top-floor flats with spiral stairs?',
        a: 'Yes. Our crews are specially equipped with high-tensile lifting straps, padded furniture blankets, and corner protectors to safely transport heavy furniture through Edinburgh tenement stairwells.'
      }
    ]
  },
  {
    id: 'dundee-to-glasgow',
    type: 'route',
    path: '/routes/dundee-to-glasgow',
    areaName: 'Dundee to Glasgow & Central Belt',
    postcodes: 'DD1–DD5 ➔ G1–G84 & Greater Glasgow',
    title: 'Dundee to Glasgow Removals | Dedicated Van Moves | Dundee Movers',
    h1: 'Direct Removals from Dundee to Glasgow & Central Belt',
    metaTitle: 'Dundee to Glasgow Removals | Dedicated Van Moves | Dundee Movers',
    metaDesc: 'Professional house & flat removals from Dundee to Glasgow. Same-day direct delivery via A9/M80, West End tenement stairs & fully insured transit. Get a quote.',
    transitBadge: 'Same-Day Scottish Intercity Removals',
    heroSubtitle: 'Connecting Dundee to Glasgow, the West End, Southside, and Central Belt with 100% dedicated vans, expert handling, and zero shared loads.',
    highlights: [
      'Same-day direct moving via the A90 ➔ A9 ➔ M80 route',
      'Glasgow West End (Byres Road, Hillhead) and Shawlands tenement stairs specialists',
      'Dedicated vehicles: your furniture travels alone with zero transfers',
      'Fully insured: Goods in Transit protection on every run'
    ],
    propertyTypes: [
      { name: 'Traditional Glasgow Tenements', desc: 'Navigating high-ceiling stone tenements, close stairs, and communal entrances across Glasgow.' },
      { name: 'Student & Academic Relocations', desc: 'Regular transfers between University of Dundee and University of Glasgow / Strathclyde.' },
      { name: 'Suburban Family Homes', desc: 'Family relocations to Bearsden, Milngavie, Giffnock, and Newton Mearns.' }
    ],
    localLogistics: {
      title: 'Glasgow Moving Logistics & Parking',
      points: [
        'Navigating Glasgow City Council parking meters and loading restrictions in city and West End zones.',
        'LEZ compliant vehicles for city center Glasgow low-emission boundary compliance.',
        'Stair climbing gear and heavy lifting harness equipment for high-floor tenements.'
      ]
    },
    reviews: [
      {
        quote: 'Moved from Dundee City Quay to a 2nd floor flat in Shawlands, Glasgow. The team arrived on time, drove straight through, and put every piece of furniture in the exact right room. Brilliant experience.',
        author: 'Martin & Kirsty L.',
        route: 'City Quay, Dundee ➔ Shawlands, Glasgow'
      }
    ],
    faqs: [
      {
        q: 'How long does a move between Dundee and Glasgow take?',
        a: 'The drive is approximately 1 hour 45 minutes. We load at your Dundee home in the morning and deliver directly into your Glasgow property that same afternoon.'
      }
    ]
  },
  {
    id: 'dundee-to-aberdeen',
    type: 'route',
    path: '/routes/dundee-to-aberdeen',
    areaName: 'Dundee to Aberdeen & North East',
    postcodes: 'DD1–DD5 ➔ AB10–AB25 & Aberdeenshire',
    title: 'Dundee to Aberdeen Removals | Direct A90 Moves | Dundee Movers',
    h1: 'Direct Removals: Dundee to Aberdeen & North East Scotland',
    metaTitle: 'Dundee to Aberdeen Removals | Direct A90 Moves | Dundee Movers',
    metaDesc: 'Reliable removals between Dundee and Aberdeen. Direct A90 dual-carriageway transit, corporate & NHS relocations, and fully insured transit. Get a free fixed quote.',
    transitBadge: 'Direct A90 North-East Corridor Removals',
    heroSubtitle: 'Direct non-stop removals between Dundee and the Granite City via the dual-carriageway A90 corridor. Van and crew dedicated exclusively to your move.',
    highlights: [
      'Direct 75-minute non-stop transit straight up the A90 corridor',
      'Granite city townhouses, modern apartments, and coastal Aberdeenshire homes',
      'Corporate and energy-sector relocation experience',
      'Fully insured: Goods in Transit protection included'
    ],
    propertyTypes: [
      { name: 'Aberdeen City Flats & Townhouses', desc: 'Expert care for granite flats around Rosemount, West End, and Holburn.' },
      { name: 'NHS & Academic Transfers', desc: 'Smooth relocations between Ninewells Hospital and Aberdeen Royal Infirmary.' },
      { name: 'Suburban & Aberdeenshire Homes', desc: 'Detached properties in Cults, Westhill, Stonehaven, and Ellon.' }
    ],
    localLogistics: {
      title: 'Aberdeen Route & Parking Logistics',
      points: [
        'Direct dual-carriageway transit ensuring dependable, predictable arrival timing.',
        'Aberdeen City Council parking voucher and loading access coordination.',
        'Complete furniture blanket wrapping and padded door protection.'
      ]
    },
    reviews: [
      {
        quote: 'Relocated for work from Dundee to Cults in Aberdeen. Dundee Movers were professional from start to finish. Everything was delivered in perfect condition.',
        author: 'Euan McP.',
        route: 'West End, Dundee ➔ Cults, Aberdeen'
      }
    ],
    faqs: [
      {
        q: 'Can Dundee Movers handle moves from Aberdeen down to Dundee?',
        a: 'Yes, we operate two-way removals between Tayside and Grampian regularly.'
      }
    ]
  },
  {
    id: 'dundee-to-manchester',
    type: 'route',
    path: '/routes/dundee-to-manchester',
    areaName: 'Dundee to Manchester & North West UK',
    postcodes: 'DD1–DD5 ➔ M1–M99, Greater Manchester & Cheshire',
    title: 'Dundee to Manchester Removals | Dedicated UK Moves | Dundee Movers',
    h1: 'Dedicated Removals: Dundee to Manchester & North West England',
    metaTitle: 'Dundee to Manchester Removals | Dedicated UK Moves | Dundee Movers',
    metaDesc: 'Direct Dundee to Manchester removals. 100% exclusive Luton van with zero shared freight, direct door-to-door transit & fully insured protection. Book your direct move.',
    transitBadge: 'Direct Scottish ➔ England Dedicated Route',
    heroSubtitle: 'Long-distance relocations connecting Dundee and Scotland to Manchester, Salford, and Cheshire with zero shared cargo and direct door-to-door transit.',
    highlights: [
      '100% dedicated vehicle: your belongings travel alone with zero multi-drop delays',
      'Direct M74 ➔ M6 non-stop route with guaranteed delivery windows',
      'Manchester city center apartment and Cheshire suburban house experience',
      'Fully insured: Goods in Transit & Public Liability insurance included'
    ],
    propertyTypes: [
      { name: 'Manchester City Center Apartments', desc: 'Dock access, lift bookings, and concierge coordination for high-rise city center flats.' },
      { name: 'Cheshire & Greater Manchester Homes', desc: 'Full 2 to 4-bedroom family houses relocating south from Scotland.' },
      { name: 'Career & University Moves', desc: 'Seamless relocations for professionals and postgraduates moving between Scottish and North West hubs.' }
    ],
    localLogistics: {
      title: 'Manchester Long-Distance Logistics',
      points: [
        'Direct non-stop driving route via M90, M74, and M6 with confirmed arrival scheduling.',
        'Manchester and Salford inner-city loading dock and concierge parking management.',
        'Full protective sofa covers, mattress bags, and wardrobe cartons provided.'
      ]
    },
    reviews: [
      {
        quote: 'Moved from Dundee to Didsbury, Manchester. Having the van exclusively dedicated to us took all the stress away. They loaded on Thursday morning and unloaded in Manchester on Friday morning. Superb team.',
        author: 'Tom & Rebecca S.',
        route: 'Broughty Ferry ➔ Didsbury, Manchester'
      }
    ],
    faqs: [
      {
        q: 'Do you combine our move to Manchester with other people’s furniture?',
        a: 'Never. Unlike national courier networks, we operate a strict 1-move-at-a-time guarantee. The vehicle is loaded at your Dundee address, locked, and driven directly to your Manchester address.'
      }
    ]
  }
];
