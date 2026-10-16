export type TeamMember = { name: string; text: string; tag: string; image?: string };

export const team: TeamMember[] = [
  { name: "Ashutosh Maury", text: "Founder and principal broker. Leads every client relationship from first call to registry.", tag: "residential, commercial, plots", image: "/team/ashutosh.png" },
  { name: "Documentation partner", text: "Title verification, sale deeds and registry support.", tag: "legal", image: "/team/doc-partner.png" },
  { name: "Home loan advisor", text: "Compares lenders and prepares your loan application.", tag: "finance", image: "/team/home-loan-adv.png" },
  { name: "Site visit coordinator", text: "Schedules visits and keeps every shortlist organised.", tag: "operations", image: "/team/site-visitor.png" },
];
