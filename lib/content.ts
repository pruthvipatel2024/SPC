/**
 * Central content source for Shree Padma Charitable Trust.
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
  name: 'Shree Padma Charitable Trust',
  shortName: 'S.P.C. Seva Trust',
  location: 'Bhavnagar, Gujarat',
  mission: 'Building a Child Beggar-Free Bhavnagar.',
  tagline: 'Every child deserves a future beyond begging.',
  instagram: 'https://www.instagram.com/shree.padma.charitable.trust',
  instagramHandle: '@shree.padma.charitable.trust',
  // Placeholder contact details — replace with verified organization details.
  email: 'contact@shreepadmatrust.org',
  phone: '+91 00000 00000',
  whatsapp: '+910000000000',
  addressLines: ['Shree Padma Charitable Trust', 'Bhavnagar, Gujarat, India'],
  mapQuery: 'Bhavnagar, Gujarat, India',
}

export const navLinks = [
  { label: 'About Us', href: '#about' },
  { label: 'Our Work', href: '#work' },
  { label: 'Impact', href: '#journey' },
  { label: 'Stories', href: '#stories' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Get Involved', href: '#volunteer' },
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

// Stories are illustrative composites written to protect privacy and dignity.
// Replace with consented, verified stories from the organization.
export const stories = [
  {
    image: '/images/story-1.png',
    alt: 'A hopeful young girl holding a school notebook in a classroom',
    title: 'From the Streets to the Classroom',
    situation: 'A child spending long days seeking coins at a busy junction.',
    intervention: 'Outreach, family conversations and help enrolling in school.',
    outcome: 'A daily routine now built around learning rather than the street.',
    quote:
      'Behind every child we meet is a story, a family and a future waiting to be supported.',
  },
  {
    image: '/images/story-2.png',
    alt: 'A young boy in school uniform writing on a slate',
    title: 'A Place to Belong',
    situation: 'A boy who had never sat inside a classroom.',
    intervention: 'Patient guidance, learning support and encouragement.',
    outcome: 'Growing confidence and a genuine love for writing and reading.',
    quote: 'When a child feels they belong, everything begins to change.',
  },
  {
    image: '/images/story-3.png',
    alt: 'A mother and her child smiling together outside their home',
    title: 'Families at the Centre',
    situation: 'A family unsure how education could fit into daily survival.',
    intervention: 'Trust, guidance and practical support over time.',
    outcome: 'A family that now sees school as part of their child\u2019s future.',
    quote: 'Change lasts when the whole family can believe in it.',
  },
]

export const galleryImages = [
  { src: '/images/gallery-1.png', category: 'Education', alt: 'Children raising hands in an outdoor learning session' },
  { src: '/images/gallery-2.png', category: 'Outreach', alt: 'Volunteers distributing books and school supplies to children' },
  { src: '/images/gallery-5.png', category: 'Children', alt: 'A smiling child in school uniform outdoors' },
  { src: '/images/gallery-4.png', category: 'Awareness', alt: 'A community awareness gathering in a Bhavnagar neighbourhood' },
  { src: '/images/gallery-3.png', category: 'Education', alt: "Children's hands writing in notebooks together" },
  { src: '/images/gallery-6.png', category: 'Volunteers', alt: 'Volunteers and children together after a community event' },
  { src: '/images/about.png', category: 'Community Work', alt: 'Volunteers teaching children in an outdoor community setting' },
  { src: '/images/initiative.png', category: 'Outreach', alt: 'An outreach worker speaking gently with a child' },
]

export const galleryFilters = [
  'All',
  'Community Work',
  'Education',
  'Children',
  'Awareness',
  'Events',
  'Volunteers',
  'Outreach',
]

export const instagramPosts = [
  { src: '/images/gallery-1.png', alt: 'Outdoor learning session' },
  { src: '/images/gallery-6.png', alt: 'Volunteers and children together' },
  { src: '/images/gallery-2.png', alt: 'Distributing school supplies' },
  { src: '/images/gallery-5.png', alt: 'A smiling child' },
  { src: '/images/gallery-4.png', alt: 'Community awareness gathering' },
  { src: '/images/story-1.png', alt: 'A child with her notebook' },
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
