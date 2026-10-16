// SAMPLE DATA. Replace with real inventory. Add `image: "/listings/xyz.jpg"` (in /public)
// or a remote URL to show a real photo instead of the generated placeholder.
export type Category = "Residential" | "Commercial" | "Plot";

export type Listing = {
  slug: string;
  title: string;
  category: Category;
  type: string;
  locality: string;
  price: string;
  priceValue: number; // in rupees, for sorting
  area: string;
  status: "For sale" | "For rent";
  beds?: number;
  baths?: number;
  facing?: string;
  highlights: string[];
  description: string;
  image?: string;
  seed: number;
};

export const categories: Category[] = ["Residential", "Commercial", "Plot"];

export const listings: Listing[] = [
  {
    slug: "3bhk-apartment-jhunsi",
    title: "3 BHK apartment with river-side balcony",
    category: "Residential", type: "3 BHK apartment", locality: "Jhunsi",
    price: "₹ 78 Lakh", priceValue: 7_800_000, area: "1,480 sq ft", status: "For sale",
    beds: 3, baths: 3, facing: "East",
    image: "/residential/image.png",
    highlights: ["Covered parking", "Lift and power backup", "Close to main road", "Ready to move"],
    description: "A bright, well-ventilated apartment on a high floor with a long east-facing balcony. Spacious bedrooms, a modular kitchen and a gated society with 24x7 security.",
    seed: 1,
  },
  {
    slug: "4bhk-independent-house-teliarganj",
    title: "4 BHK independent house with garden",
    category: "Residential", type: "Independent house", locality: "Teliarganj",
    price: "₹ 1.85 Crore", priceValue: 18_500_000, area: "2,600 sq ft", status: "For sale",
    beds: 4, baths: 4, facing: "North-East",
    image: "/residential/residentialA.png",
    highlights: ["Private garden", "Two-car parking", "Terrace room", "Wide approach road"],
    description: "A double-storey independent house on a corner plot, built for a joint family. Open living areas, a private garden and a terrace room for guests or a home office.",
    seed: 2,
  },
  {
    slug: "2bhk-builder-floor-mumfordganj",
    title: "2 BHK builder floor, quiet lane",
    category: "Residential", type: "Builder floor", locality: "Mumfordganj",
    price: "₹ 18,000 / month", priceValue: 18_000, area: "1,050 sq ft", status: "For rent",
    beds: 2, baths: 2, facing: "West",
    image: "/residential/residentialB.png",
    highlights: ["Semi-furnished", "Stilt parking", "Near schools", "Family preferred"],
    description: "A well-kept second-floor builder floor in a calm residential lane, close to schools and daily markets. Semi-furnished with wardrobes and modular kitchen.",
    seed: 3,
  },
  {
    slug: "ground-floor-showroom-civil-lines-road",
    title: "Ground-floor showroom on main road",
    category: "Commercial", type: "Showroom", locality: "Sulemsarai",
    price: "₹ 2.4 Crore", priceValue: 24_000_000, area: "1,800 sq ft", status: "For sale",
    image: "/commertial/appartmentA.png",
    highlights: ["35 ft frontage", "High footfall", "Basement storage", "Parking in front"],
    description: "A double-height showroom with wide frontage on a busy road. Suitable for retail, electronics, furniture or a bank branch.",
    seed: 4,
  },
  {
    slug: "office-space-kareli",
    title: "Furnished office floor, 20 workstations",
    category: "Commercial", type: "Office space", locality: "Kareli",
    price: "₹ 85,000 / month", priceValue: 85_000, area: "2,200 sq ft", status: "For rent",
    image: "/commertial/appartmentB.png",
    highlights: ["Reception and cabin", "Power backup", "Lift access", "Visitor parking"],
    description: "A ready-to-use office floor with reception, a manager cabin, two meeting rooms and workstations for around 20 people.",
    seed: 5,
  },
  {
    slug: "shop-complex-unit-daraganj",
    title: "Shop in a growing market complex",
    category: "Commercial", type: "Shop", locality: "Daraganj",
    price: "₹ 46 Lakh", priceValue: 4_600_000, area: "320 sq ft", status: "For sale",
    image: "/commertial/appartmentC.png",
    highlights: ["Corner unit", "Rental potential", "Established market", "Clear title"],
    description: "A corner shop in a busy market complex with steady customer traffic. A practical option for a first business or a rental investment.",
    seed: 6,
  },
  {
    slug: "residential-plot-jhunsi-1500",
    title: "Residential plot, 1,500 sq ft",
    category: "Plot", type: "Residential plot", locality: "Jhunsi",
    price: "₹ 32 Lakh", priceValue: 3_200_000, area: "1,500 sq ft", status: "For sale",
    image: "/plots/plotA.png",
    facing: "East",
    highlights: ["East facing", "30 ft road", "Boundary wall", "Registry ready"],
    description: "A regular-shaped east-facing plot on a 30 ft road, in a developing residential pocket with water and electricity connections nearby.",
    seed: 7,
  },
  {
    slug: "corner-plot-teliarganj-2400",
    title: "Corner plot, 2,400 sq ft",
    category: "Plot", type: "Corner plot", locality: "Teliarganj",
    price: "₹ 74 Lakh", priceValue: 7_400_000, area: "2,400 sq ft", status: "For sale",
    image: "/plots/plotB.png",
    facing: "North",
    highlights: ["Two-side open", "Premium locality", "Ideal for villa", "Clear title"],
    description: "A two-side open corner plot in an established locality. A strong choice for a villa or a small multi-unit build.",
    seed: 8,
  },
  {
    slug: "commercial-plot-main-road",
    title: "Commercial plot on main road",
    category: "Plot", type: "Commercial plot", locality: "Sulemsarai",
    price: "₹ 1.2 Crore", priceValue: 12_000_000, area: "2,000 sq ft", status: "For sale",
    image: "/plots/plotC.png",
    facing: "South",
    highlights: ["Main-road frontage", "Mixed-use zone", "Level land", "Registry ready"],
    description: "A level plot with road frontage, well suited for a showroom, clinic or small commercial building.",
    seed: 9,
  },
];

export const getListing = (slug: string) => listings.find((l) => l.slug === slug);
