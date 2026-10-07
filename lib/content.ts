/**
 * Central content source for Shree Padm Charitable Trust.
 *
 * This file is intentionally structured so every list below can later be
 * moved to a CMS/database without touching the components. Components read
 * from these exports only — they never hardcode copy.
 *
 * CONTENT RULE: Nothing here invents statistics, registration numbers,
 * 80G/12A/FCRA status, awards, partnerships or named individuals. Where a
 * verified figure is not yet available we use qualitative statements and
 * clearly marked placeholders the organization can fill in later.
 */

export const org = {
  name: 'Shree Padm Charitable Trust',
  shortName: 'S.P.C. Seva Trust',
  location: 'Bhavnagar, Gujarat',
  mission: 'Building a Child Beggar-Free Bhavnagar.',
  tagline: 'Every child deserves a future beyond begging.',
  instagram: 'https://www.instagram.com/shree.padma.charitable.trust/',
  instagramHandle: '@shree.padma.charitable.trust',
  // Placeholder contact details — replace with verified organization details.
  email: 'contact@shreepadmtrust.org',
  phone: '+91 00000 00000',
  whatsapp: '+910000000000',
  addressLines: ['Shree Padm Charitable Trust', 'Bhavnagar, Gujarat, India'],
  mapQuery: 'Bhavnagar, Gujarat, India',
}

export const navLinks = [
  { label: 'About Us', href: '#about' },
  { label: 'Our Work', href: '#work' },
  { label: 'Impact', href: '#journey' },
  { label: 'Video Stories', href: '#stories' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Media & News', href: '#news' },
]

export type VideoStory = {
  id: string
  title: string
  subtitle: string
  category: string
  badge: string
  location: string
  situation: string
  intervention: string
  outcome: string
  quote: string
  description: string
  src: string
  poster: string
  durationLabel: string
}

export const videoStories: VideoStory[] = [
  {
    id: 'street-outreach',
    title: 'From Streets to School: Direct Field Outreach',
    subtitle: 'Meeting children at traffic intersections and opening the doorway to education',
    category: 'Ground Outreach',
    badge: 'Real Work Video',
    location: 'Crossroads & Slums of Bhavnagar, Gujarat',
    situation: 'Children spending long hours seeking coins at busy traffic junctions.',
    intervention: 'Dedicated outreach workers holding empathetic family dialogues and securing school enrollments.',
    outcome: 'A daily routine built around books and learning rather than the street.',
    quote: 'Behind every child we meet on the street is a story, a family, and a future waiting to be supported.',
    description: 'Watch the complete on-the-ground documentation as our team meets vulnerable children and families across Bhavnagar, guiding parents and providing immediate educational pathways.',
    src: '/videos/story-street-outreach.mp4',
    poster: '/images/real-work-1.jpg',
    durationLabel: 'Full Video',
  },
  {
    id: 'classroom-empowerment',
    title: 'Classroom Learning & Community Empowerment',
    subtitle: 'Building literacy, life skills, and collective hope among children and families',
    category: 'Classroom & Community',
    badge: 'Real Work Video',
    location: 'Bhavnagar Learning Center & Community Hall',
    situation: 'Children who had never sat inside a formal, encouraging classroom environment.',
    intervention: 'Patient foundational education, writing practice, and community awareness assemblies with educators.',
    outcome: 'Growing confidence, active participation, and genuine joy in reading and writing.',
    quote: 'When a child feels they belong in a classroom, their entire world begins to transform.',
    description: 'Step inside our classroom sessions and community events in Bhavnagar where children develop foundational literacy and discipline with dedicated teachers.',
    src: '/videos/story-classroom-community.mp4',
    poster: '/images/real-work-2.jpg',
    durationLabel: 'Full Video',
  },
]

// Qualitative "impact" statements — no invented numbers.
export const impactPillars = [
  { title: 'Children First', note: 'Every decision starts with a child\u2019s safety and dignity.' },
  { title: 'Education Focused', note: 'Learning is the pathway beyond the street.' },
  { title: 'Community Driven', note: 'Change built together with families and neighbours.' },
  { title: 'Bhavnagar Based', note: 'Rooted in and accountable to our own city.' },
]

export const values = [
  { title: 'Dignity', note: 'Every child is met with respect, never pity.' },
  { title: 'Education', note: 'Learning opens doors that begging never can.' },
  { title: 'Compassion', note: 'We lead with understanding, not judgement.' },
  { title: 'Opportunity', note: 'A fair chance changes the shape of a life.' },
  { title: 'Community', note: 'Lasting change is a shared responsibility.' },
]

export const initiativeSteps = [
  {
    no: '01',
    title: 'Identify',
    body: 'Finding children who are vulnerable or involved in begging across the streets and communities of Bhavnagar.',
  },
  {
    no: '02',
    title: 'Understand',
    body: 'Listening to each child and their family to understand their educational, social and personal circumstances.',
  },
  {
    no: '03',
    title: 'Support',
    body: 'Providing guidance, intervention and the practical support a family needs to imagine a different path.',
  },
  {
    no: '04',
    title: 'Education',
    body: 'Helping children access schooling and learning opportunities so they can build real skills and confidence.',
  },
  {
    no: '05',
    title: 'Empower',
    body: 'Walking alongside children toward a safer, more independent and self-determined future.',
  },
]

export const workAreas = [
  {
    title: 'Education',
    body: 'Helping children access education and learning opportunities so the classroom becomes a real alternative to the street.',
  },
  {
    title: 'Child Welfare',
    body: 'Supporting vulnerable children and their families with care that centres safety, health and dignity.',
  },
  {
    title: 'Community Outreach',
    body: 'Reaching children and families directly within the community, where trust is built face to face.',
  },
  {
    title: 'Awareness',
    body: 'Creating awareness around child begging and the importance of education across Bhavnagar.',
  },
  {
    title: 'Guidance & Support',
    body: 'Helping families understand the pathways toward education and a better future for their children.',
  },
]

export const journeyStages = [
  { label: 'Street', note: 'A child\u2019s starting point \u2014 met with dignity, not judgement.' },
  { label: 'Support', note: 'Guidance and intervention alongside the family.' },
  { label: 'School', note: 'A place to learn, belong and imagine more.' },
  { label: 'Growth', note: 'Confidence, skills and steady progress.' },
  { label: 'Future', note: 'A safer, more independent path ahead.' },
]

// Real work video stories are documented in videoStories above.


export const galleryImages = [
  {
    src: '/images/real-work-2.jpg',
    category: 'Classroom',
    alt: 'Classroom learning session with Gujarati learning charts and dedicated educator in Bhavnagar',
  },
  {
    src: '/images/real-work-3.jpg',
    category: 'Community Event',
    alt: 'Shree Padm Charitable Trust community assembly and awareness address in Bhavnagar',
  },
  {
    src: '/images/real-work-1.jpg',
    category: 'Street Outreach',
    alt: 'Field volunteers connecting with children outdoors in Bhavnagar',
  },
  {
    src: '/images/real-work-4.jpg',
    category: 'Classroom',
    alt: 'Teacher guiding students through interactive learning activity on the classroom floor',
  },
]

export const galleryFilters = [
  'All',
  'Classroom',
  'Street Outreach',
  'Community Event',
]

export const founder = {
  name: 'Puja Pandit Jani',
  role: 'Founder & Managing Trustee',
  titles: 'Gold Medalist Painting Artist • National Iconic Woman (2019) • Nari Ratna Awardee (2017)',
  bio: 'Daughter of respected educator and social reformer Late Arvindbhai Pandit. Continuing her family’s legacy of public service, she initiated the mission to make Bhavnagar free of child begging. Her grassroots model has rehabilitated 82+ children into formal schooling and garnered commendation from Gujarat Home Minister Harsh Sanghavi and Prime Minister Narendra Modi.',
  image: '/news-articles/article-8.jpg',
  address: '34, Omkar, Dharmraj Society, Airport Road, Subhashnagar, Bhavnagar, Gujarat',
  phone: '7211112411',
}

export type NewsArticle = {
  id: string
  titleGujarati: string
  titleEnglish: string
  publication: string
  date?: string
  badge: string
  summary: string
  image: string
  category: 'Divya Bhaskar' | 'Gujarat Chhaya' | 'Saurashtra Aaspas' | 'Regional Press'
}

export const newsArticles: NewsArticle[] = [
  {
    id: 'news-divya-bhaskar-ahmedabad',
    titleGujarati: '82 બાળકોને ભિક્ષાવૃત્તિમાંથી હટાવી શાળામાં ભણતાં કર્યા : ભાવનગરની દીકરીએ શરૂ કર્યું બાલ ભિક્ષુક મુક્તિ અભિયાન',
    titleEnglish: '82 Children Rescued from Begging and Enrolled into School: Bhavnagar’s Daughter Leads Transformative Movement',
    publication: 'Divya Bhaskar (દિવ્ય ભાસ્કર) — Monday Positive',
    date: 'Ahmedabad Edition',
    badge: '82 Children Milestone',
    summary:
      'Front-page coverage on Divya Bhaskar’s Monday Positive. Highlights Puja Pandit Jani’s comprehensive model providing clean drinking water, uniforms, teachers, and rickshaw transportation to children. Gujarat Home Minister Harsh Sanghavi praised the initiative and recommended its implementation at the state level.',
    image: '/news-articles/article-5.jpg',
    category: 'Divya Bhaskar',
  },
  {
    id: 'news-gujarat-chhaya-law',
    titleGujarati: 'કોઈ પણ બાળક ભીક્ષા માંગતો જ ન હોવો જોઈએ, કાયદો બનાવો : પૂજા પંડિત જાની',
    titleEnglish: 'No Child Should Ever Have to Beg, Make Strong Laws: Exclusive Interview with Founder Puja Pandit Jani',
    publication: 'Gujarat Chhaya (ગુજરાત છાયા)',
    date: 'Exclusive Feature',
    badge: 'Founder Interview',
    summary:
      'Full-page interview with founder Puja Pandit Jani advocating for strong legal protections against child begging, structured police coordination, parental livelihood support, and a nationwide drive against child exploitation.',
    image: '/news-articles/article-8.jpg',
    category: 'Gujarat Chhaya',
  },
  {
    id: 'news-gujarat-chhaya-father-legacy',
    titleGujarati: 'એક સમાજ સુધારક શિક્ષકની દિકરી, નામ એનું પૂજા પંડિત',
    titleEnglish: 'Daughter of a Social Reformer Teacher, Her Name is Puja Pandit',
    publication: 'Gujarat Chhaya (ગુજરાત છાયા)',
    date: 'Special Edition',
    badge: 'Inspiring Legacy',
    summary:
      'Traces the inspirational roots back to 1982 when her father Arvindbhai Pandit established a village school in Vikliya. Highlights Prime Minister Narendra Modi’s appreciation letter and recognition of Puja Jani’s humanitarian artistry and mission.',
    image: '/news-articles/article-3.jpg',
    category: 'Gujarat Chhaya',
  },
  {
    id: 'news-divya-bhaskar-bhavnagar',
    titleGujarati: 'ભાવનગરની દીકરીના પ્રોજેક્ટનું રાજ્યકક્ષાએ કરાયેલું અમલીકરણ',
    titleEnglish: 'State-Level Recognition and Implementation of Bhavnagar’s Child Beggar-Free Project',
    publication: 'Divya Bhaskar (દિવ્ય ભાસ્કર)',
    date: 'Bhavnagar Edition',
    badge: 'State Recognition',
    summary:
      'Details the step-by-step methodology: police coordination with B-Division PI Anand Desai and Lady Constable Chetna Jani, child documentation, parental counseling, and school transport assistance.',
    image: '/news-articles/article-6.jpg',
    category: 'Divya Bhaskar',
  },
  {
    id: 'news-saurashtra-aaspas',
    titleGujarati: 'પૂજા જાની : ભાવનગરની આ યુવતી ભિક્ષુક બાળકોને "સ્વચ્છ" રાખવા અભિયાન છેડે છે',
    titleEnglish: 'Puja Jani: Young Woman from Bhavnagar Launches Campaign for Health and Dignity of Beggar Children',
    publication: 'Saurashtra Aaspas (સૌરાષ્ટ્ર આસપાસ)',
    date: 'Humanitarian Profile',
    badge: 'National Awardee',
    summary:
      'Profiles Gold Medalist Artist and National Iconic Woman awardee Puja Pandit Jani’s early initiative "Harsharvind Group" and street-level drives ensuring clean clothes, hygiene, medical care, and food for street children.',
    image: '/news-articles/article-1.jpg',
    category: 'Saurashtra Aaspas',
  },
  {
    id: 'news-tribute-initiative',
    titleGujarati: 'ભાવનગરમાં બાળ-ભિક્ષુક મુક્ત અભિયાન : પિતાને શ્રદ્ધાંજલિ આપવા દીકરીની આગવી પહેલ',
    titleEnglish: 'Child Beggar-Free Movement in Bhavnagar: Unique Initiative by Daughter Puja Pandit Jani',
    publication: 'Regional Press Bhavnagar',
    date: 'Field Report',
    badge: 'Father’s Tribute',
    summary:
      'Report on the grassroots intervention across Bhavnagar’s Aatabhai Chowk, Gadhediya Field, Tilaknagar, and Balhanuman areas, successfully preventing child labor and petty crime through education.',
    image: '/news-articles/article-2.jpg',
    category: 'Regional Press',
  },
  {
    id: 'news-methodology-framework',
    titleGujarati: 'આર્ટિસ્ટ પૂજા પંડિત-જાનીનું માનવસેવા અભિયાન અને અમલીકરણ પગલાં',
    titleEnglish: 'Operational Framework: How 82+ Children Were Successfully Integrated into Mainstream Schooling',
    publication: 'Divya Bhaskar Special Report',
    date: 'Analytical Report',
    badge: 'Action Framework',
    summary:
      'An analytical breakdown of the 4 pillar action plan: Police Department Alignment, Parental Economic Support (Pushcarts/Vending), Official School Enrollment & Aadhaar ID Documentation, and Transportation & Hygiene.',
    image: '/news-articles/article-7.jpg',
    category: 'Divya Bhaskar',
  },
  {
    id: 'news-full-page-bhavnagar',
    titleGujarati: 'ભાવનગરમાં બાળ-ભિક્ષુક મુક્ત અભિયાનની વિસ્તૃત સફળતા',
    titleEnglish: 'Comprehensive Media Feature on the Transformation of Bhavnagar’s Street Children',
    publication: 'Gujarat Regional Press',
    date: 'Community Report',
    badge: 'Citywide Impact',
    summary:
      'Full-page documentation highlighting citizen involvement, teacher dedication, and the reduction of street begging across major crossroads in Bhavnagar.',
    image: '/news-articles/article-4.jpg',
    category: 'Regional Press',
  },
]

export const donationTiers = [
  { amount: 500, label: '\u20B9500', note: 'Learning materials for a child' },
  { amount: 1000, label: '\u20B91,000', note: 'Support for ongoing outreach' },
  { amount: 2500, label: '\u20B92,500', note: 'Help a family through a transition' },
  { amount: 5000, label: '\u20B95,000', note: 'Sustained support for a child\u2019s journey' },
]

export const transparencyCards = [
  {
    title: 'Our Mission',
    body: 'A clear, single purpose: helping children move away from begging and toward education and dignity.',
  },
  {
    title: 'How We Work',
    body: 'Identify, understand, support, educate and empower \u2014 a step-by-step approach rooted in the community.',
  },
  {
    title: 'Where Your Support Goes',
    body: 'Support is directed toward outreach, education access and family guidance in Bhavnagar.',
  },
  {
    title: 'Reports',
    body: 'Activity summaries and reports will be published here as they become available.',
    pending: true,
  },
  {
    title: 'Financial Transparency',
    body: 'Financial information will be shared here once verified and approved by the organization.',
    pending: true,
  },
  {
    title: 'Registration & Compliance',
    body: 'Registration details and any applicable tax-benefit information will appear here once verified.',
    pending: true,
  },
]

// Events use real dates/locations once provided. These are structured
// placeholders the team can edit or replace.
export const events = [
  {
    date: 'Ongoing',
    title: 'Community Outreach — Bhavnagar',
    location: 'Bhavnagar, Gujarat',
    body: 'Regular outreach connecting with children and families across the city.',
  },
  {
    date: 'Ongoing',
    title: 'Learning Support Sessions',
    location: 'Community Spaces, Bhavnagar',
    body: 'Guided learning sessions helping children build confidence and skills.',
  },
  {
    date: 'Upcoming',
    title: 'Awareness Drive',
    location: 'To be announced',
    body: 'Raising awareness on child begging and the importance of education.',
  },
]

export const volunteerInterests = [
  'Education & Tutoring',
  'Community Outreach',
  'Awareness Campaigns',
  'Events & Logistics',
  'Content & Social Media',
  'Wherever Needed',
]

export const contactReasons = [
  'General Enquiry',
  'Volunteering',
  'Donations',
  'Partnership',
  'Media',
  'Other',
]
