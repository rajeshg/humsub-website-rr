import { Phone, Mail } from "lucide-react"

// Define contact info type
interface ContactInfo {
  title: string
  name: string
  phone: string
  email: string
}

// Reusable card for officers and committees
function buildTelLink(phone: string): string {
  // Extract DTMF extension numbers after each 'Option' or 'Sub Option'
  const regex = /(?:Option|Sub Option)[^\d]*(\d+)/gi
  const matches = phone.matchAll(regex)
  const digits = Array.from(matches, (match) => match[1])
  if (digits.length > 0) {
    return `tel:9193714470${digits.map((d) => ",," + d).join("")}`
  }
  // fallback to all digits in string if no matches
  const fallback = phone.replace(/\D/g, "")
  return fallback ? `tel:${fallback}` : "tel:9193714470"
}

function ContactCard({ title, name, phone, email }: { title: string; name: string; phone: string; email: string }) {
  const extMatch = phone.match(/Option.+/)
  const extension = extMatch ? extMatch[0] : null
  const tel = buildTelLink(phone)
  return (
    <div className="rounded-lg border bg-muted/30 p-3 flex flex-col gap-1">
      <div className="font-bold text-base text-card-foreground mb-1">{title}</div>
      <div className="text-sm text-muted-foreground mb-1">{name}</div>
      <a href={tel} className="flex items-center gap-1 text-xs hover:text-primary underline" title={`Call ${title}`}>
        <Phone aria-hidden="true" className="w-4 h-4" />
        <span>{extension ? `Ext: ${extension}` : phone}</span>
      </a>
      <div className="flex items-center gap-1 text-xs">
        <Mail aria-hidden="true" className="w-4 h-4" />
        <a href={`mailto:${email}`} className="underline hover:text-primary" title={`Email ${title}`}>
          {email}
        </a>
      </div>
    </div>
  )
}

export default function ContactUs() {
  // Officers data
  const officers: ContactInfo[] = [
    {
      title: "President",
      name: "Usha Sankar",
      phone: "919-371-4470, Option 1, Sub Option 1",
      email: "president@humsub.net",
    },
    {
      title: "Vice President",
      name: "Rajesh Gollapudi",
      phone: "919-371-4470, Option 1, Sub Option 2",
      email: "vicepresident@humsub.net",
    },
    {
      title: "Treasurer",
      name: "Pratik Nanavati",
      phone: "919-371-4470, Option 1, Sub Option 3",
      email: "treasurer@humsub.net",
    },
    {
      title: "Secretary",
      name: "Ekta Bhatia",
      phone: "919-371-4470, Option 1, Sub Option 4",
      email: "secretary@humsub.net",
    },
  ]

  // Committees data
  const committees: ContactInfo[] = [
    {
      title: "Cultural Programs",
      name: "Shraddha Joshi",
      phone: "919-371-4470, Option 2, Sub Option 1",
      email: "cultural_programs@humsub.net",
    },
    {
      title: "Vendor",
      name: "Dipendra Lamichhane",
      phone: "919-371-4470, Option 2, Sub Option 2",
      email: "vendor@humsub.net",
    },
    {
      title: "Marketing/Social Media",
      name: "Hema Pandey",
      phone: "919-371-4470, Option 2, Sub Option 3",
      email: "socialmedia@humsub.net",
    },
    {
      title: "Sponsorship",
      name: "Anandakrishnan Narayanan",
      phone: "919-371-4470, Option 2, Sub Option 4",
      email: "sponsorship@humsub.net",
    },
    {
      title: "VIP Liaison",
      name: "Usha Sankar",
      phone: "919-371-4470, Option 2, Sub Option 5",
      email: "president@humsub.net",
    },
    {
      title: "Exhibition",
      name: "Gurleen Bajaj",
      phone: "919-371-4470, Option 2, Sub Option 6",
      email: "exhibition@humsub.net",
    },
    {
      title: "Professional",
      name: "Prakash Punj",
      phone: "919-371-4470, Option 2, Sub Option 8",
      email: "professional@humsub.net",
    },
    {
      title: "Youth Ambassador",
      name: "Ekta Bhatia",
      phone: "919-371-4470, Option 2, Sub Option 9",
      email: "youthambassadors@humsub.net",
    },
    {
      title: "Youth Achievement Award",
      name: "Sandeep Sharma",
      phone: "919-371-4470, Option 2, Sub Option 10",
      email: "youthaward@humsub.net",
    },
    {
      title: "Special Events such as Holi",
      name: "Ekta Bhatia, Nishant Munjal, Prakash Punj",
      phone: "919-371-4470, Option 1, Sub Option 4",
      email: "special_events@humsub.net",
    },
  ]

  return (
    <div className="prose dark:prose-invert max-w-none">
      <title>Contact Us | Hum Sub</title>
      <h1>Contact Us</h1>
      <h2 className="text-2xl font-bold mb-4">Officers</h2>
      <p className="text-sm mb-4 text-muted-foreground">Main Phone: 919-371-4470</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {officers.map((officer) => (
          <ContactCard key={officer.title} {...officer} />
        ))}
      </div>
      <h2 className="text-2xl font-bold mt-8 mb-4">Committees</h2>
      <p className="text-sm mb-4 text-muted-foreground">Main Phone: 919-371-4470</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {committees.map((committee) => (
          <ContactCard key={committee.title} {...committee} />
        ))}
      </div>
    </div>
  )
}
