import { RegistrationFormSchema } from "@/components/forms/Registration/RegistrationForm";

export const GenderOptions = ["male", "female", "other"] as const;

export const Doctors = [
  {
    image: "/assets/images/dr-smith.png",
    name: "Emily Smith",
  },
  {
    image: "/assets/images/dr-jones.png",
    name: "Michael Jones",
  },
  {
    image: "/assets/images/dr-taylor.png",
    name: "Sarah Taylor",
  },
  {
    image: "/assets/images/dr-brown.png",
    name: "Chris Brown",
  },
  {
    image: "/assets/images/dr-miller.png",
    name: "Jessica Miller",
  },
  {
    image: "/assets/images/dr-wilson.png",
    name: "Daniel Wilson",
  },
  {
    image: "/assets/images/dr-moore.png",
    name: "Sophia Moore",
  },
  {
    image: "/assets/images/dr-thomas.png",
    name: "David Thomas",
  },
  {
    image: "/assets/images/dr-jackson.png",
    name: "Olivia Jackson",
  },
];

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
] as const;

export const PatientFormDefaultValues: RegistrationFormSchema = {
  name: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "male",
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};
export const Compliments = [ 
  "Hello, Genius 🧠",
  "Hello, Beautiful 🌺",
  "Hello, Handsome 🌟",
  "Hello, Visionary 🚀",
  "Hello, Leader 🏆",
  "Hello, Champion 🥇",
  "Hello, Superstar 🌟",
  "Hello, Rockstar 🎸",
  "Hello, Legend 🏅",
  "Hello, Warrior ⚔️",
  "Hello, Trailblazer 🌠",
  "Hello, Innovator 🧪",
  "Hello, Hero 🦸",
]
