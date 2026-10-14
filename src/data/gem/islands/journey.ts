export interface JourneyStop {
  id: string;
  order: number;
  city: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
    display: string;
  };
  years: string;
  institutionRole: string;
  whatIBuiltOrLearned: string;
  relatedArtifacts: { title: string; href: string; type: 'essay' | 'project' }[];
  svgX: number; // approximate 0..800 equirectangular projection
  svgY: number; // approximate 0..400
}

export const journeyStops: JourneyStop[] = [
  {
    id: 'dinajpur',
    order: 1,
    city: 'Dinajpur',
    country: 'Bangladesh',
    coordinates: {
      lat: 25.6279,
      lng: 88.6332,
      display: '25.6279° N, 88.6332° E'
    },
    years: '2000 – 2016',
    institutionRole: 'Roots & Foundations · Early Mathematics & Cricket',
    whatIBuiltOrLearned: 'Grew up with local mathematics olympiads, notebook physics, and dusty street cricket pitch construction. Formed instincts for probabilistic outcomes and tape-ball bowling variations.',
    relatedArtifacts: [
      { title: 'SWAT vs Royal Phoenix: Seven to Defend', href: '/gem/field-notes/', type: 'essay' },
      { title: 'Captains View Cricket Engine', href: '/gem/garage/', type: 'project' }
    ],
    svgX: 597,
    svgY: 143
  },
  {
    id: 'changshu',
    order: 2,
    city: 'Changshu',
    country: 'China',
    coordinates: {
      lat: 31.6539,
      lng: 120.7522,
      display: '31.6539° N, 120.7522° E'
    },
    years: '2016 – 2018',
    institutionRole: 'United World College (UWC) Changshu China · International Scholar',
    whatIBuiltOrLearned: 'Moved across continents on full scholarship at sixteen into a campus of students from 100+ countries on Kuncheng Lake. Immersed in economics, systems philosophy, and cross-cultural decision modeling.',
    relatedArtifacts: [
      { title: 'Worldview: An Atlas of Everyday Choices', href: '/gem/garage/', type: 'project' },
      { title: 'The Open Syllabus: 55 YouTube Channels', href: '/gem/field-notes/', type: 'essay' }
    ],
    svgX: 668,
    svgY: 130
  },
  {
    id: 'iowa',
    order: 3,
    city: 'Decorah / Des Moines',
    country: 'Iowa, United States',
    coordinates: {
      lat: 43.3017,
      lng: -91.7896,
      display: '43.3017° N, 91.7896° W'
    },
    years: '2018 – 2022',
    institutionRole: 'Data Science & Quantitative Economics · BlackRock, SkyBridge, Mayo Clinic',
    whatIBuiltOrLearned: 'Studied quantitative modeling and data science in the Midwest. Internships across health informatics at Mayo Clinic, alternative investments research at SkyBridge Capital (reading Good to Great), and institutional asset systems at BlackRock.',
    relatedArtifacts: [
      { title: 'I Applied to Blackstone. I Interviewed at BlackRock.', href: '/gem/field-notes/', type: 'essay' },
      { title: 'CAIA Knowledge Hub', href: '/gem/garage/', type: 'project' }
    ],
    svgX: 196,
    svgY: 104
  },
  {
    id: 'tampa',
    order: 4,
    city: 'Tampa Bay',
    country: 'Florida, United States',
    coordinates: {
      lat: 27.9506,
      lng: -82.4572,
      display: '27.9506° N, 82.4572° W'
    },
    years: '2022 – Present',
    institutionRole: 'Solutions Engineer at Dasseti · Institutional Private Markets & League Cricket',
    whatIBuiltOrLearned: 'Architecting regulatory data infrastructure, SEC Form ADV & 13F parsing pipelines, LLM/MCP research engines, and playing weekly weekend cricket league matches across Tampa Bay (Waverly, Evans Park).',
    relatedArtifacts: [
      { title: 'Regulatory Lens Engine', href: '/gem/garage/', type: 'project' },
      { title: 'The Universe of Form ADV (56,000+ Advisers)', href: '/gem/field-notes/', type: 'essay' },
      { title: 'Four Wickets and a Chase at Waverly', href: '/gem/field-notes/', type: 'essay' }
    ],
    svgX: 217,
    svgY: 138
  }
];

export function calculateGreatCircleDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): { km: number; miles: number } {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const km = Math.round(R * c);
  const miles = Math.round(km * 0.621371);
  return { km, miles };
}
