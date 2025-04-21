import { IconBriefcase, IconMapPin } from "@tabler/icons-react";

const fields = [
  {
    label: "Job Title",
    placeholder: "Enter Job Title",
    options: [
      "Designer",
      "Developer",
      "Product Manager",
      "Marketing Specialist",
      "Data Analyst",
      "Sales Executive",
      "Content Writer",
      "Customer Support",
      "Software Engineer"
    ],
    leftSection: IconBriefcase,
  },
  {
    label: "Company",
    placeholder: "Enter Company Name",
    options: [
      "Hylobiz",
      "Teknospire",
      "Vayana",
      "Viccas"
    ],
    leftSection: IconBriefcase,
  },
  {
    label: "Location",
    placeholder: "Enter Job Location",
    options: [
      "India",
      "Middle East",
      "Asia Pacific",
      "Dubai",
    ],
    leftSection: IconMapPin,
  },
];

export default fields;
