const mongoose = require('mongoose');

const Conference = require('./models/Conference');
const RegistrationFee = require('./models/RegistrationFee');
const Archive = require('./models/Archive');
const Speaker = require('./models/Speaker');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/guni_conf')
    .then(() => console.log('MongoDB Connected for Seeding'))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

const seedData = {
    conference_id: 'coms2-2026',
    name: 'COMS2 – International Conference on Computing Communication Security',
    theme: 'Computing Communication Security',
    venue: 'Ganpat University',
    state: 'Gujarat',
    country: 'India',
    start_date: new Date('2026-10-09'),
    end_date: new Date('2026-10-10'),
    website: 'https://coms2.gnu.ac.in/',
    author_page: 'https://coms2.gnu.ac.in/for-authors/'
};

const registrationFees = [
    { type: "Author Registration: Academicians/ Researcher/ Students", indian: "10,000/- + Taxes", foreign: "400 USD", order: 1 },
    { type: "Author Registration: Industry Professional", indian: "12,000/- + Taxes", foreign: "500 USD", order: 2 },
    { type: "Attendee/Participating Registration: Academicians", indian: "1,500/- + Taxes", foreign: "100 USD", order: 3 },
    { type: "Attendee/Participating Registration: Industry Professional", indian: "2,000/- + Taxes", foreign: "150 USD", order: 4 },
    { type: "Attendee/Participating Registration: Student (Ph.D, PG, UG)", indian: "1,000/- + Taxes", foreign: "50 USD", order: 5 },
    { type: "Accompanying Guest/Spouse", indian: "1,000/- + Taxes", foreign: "100 USD", order: 6 }
];

const archives = [
    { title: "Media Coverage: First COMS2 2020", year: "2020", type: "media-coverage", order: 1 },
    { title: "Media Coverage: Second COMS2 2021", year: "2021", type: "media-coverage", order: 2 },
    { title: "Media Coverage: Third COMS2 2022", year: "2022", type: "media-coverage", order: 3 },
    { title: "Media Coverage: Fourth COMS2 2023", year: "2023", type: "media-coverage", order: 4 },
    { title: "Media Coverage: Fifth COMS2 2024", year: "2024", type: "media-coverage", order: 5 },
    { title: "Media Coverage: Sixth COMS2 2025", year: "2025", type: "media-coverage", order: 6 },
    { title: "Glimpse of COMS2 2025 Opening Ceremony", year: "2025", type: "glimpses", image: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=2070", order: 1 },
    { title: "Keynote Session COMS2 2024", year: "2024", type: "glimpses", image: "https://images.unsplash.com/photo-1475721027187-4024733924f7?q=80&w=2070", order: 2 }
];

const speakers = [
    {
        name: "Dr. Sandeep Kumar Shukla",
        designation: "Director",
        organization: "International Institute of Information Technology, Hyderabad, India",
        bio: "<p>Prof. Sandeep Shukla, is an expert in cyber-physical systems, formal verification, and cyber security. Prior to joining IIIT Hdyderbad, he served as Professor in the Department of Computer Science and Engineering and co-director of the National Interdisciplinary Centre for Cyber Security and Cyber Defence of Critical Infrastructure at Indian Institute of Technology, Kanpur.</p><p>He is a Fellow of IEEE, ACM Distinguished Scientist and has received numerous awards for his contributions to research and education. He has received the prestigious Presidential Early Career Award for Scientists and Engineers (PECASE) from the White House in 2004.</p><p>Recipient of the Frederich Wilhelm Bessel Award from the Humboldt Foundation, Germany. Professor Shukla has published over 200 journal and conference papers, edited several books, and supervised PhD students.</p>",
        year: 2025,
        date: "Friday, 12th September 2025",
        time: "09:30 A.M. IST",
        sessionTitle: "Plenary Session Talk 1: Security of AI based Systems",
        topic: "Security of AI based Systems",
        image: "https://avatar.iran.liara.run/public/11",
        links: [
            { name: "Governing Council", url: "https://www.iiit.ac.in/governing-council/" },
            { name: "Wikipedia", url: "https://en.wikipedia.org/wiki/Sandeep_Shukla" }
        ],
        order: 1
    },
    {
        name: "Mr. Abhishek Mahanty",
        designation: "Head of Partner Engineering, Google Cloud, [India Partners|APAC ISVs & Specialist PEs]",
        organization: "Google Cloud",
        bio: "<p>Abhishek Mahanty is a seasoned technology professional with over 20 years of experience in the tech industry. He currently holds the position of APAC Head of Partner Engineering (ISVs & Solution Specialists) for Google Cloud at Google.</p><p>Abhishek's extensive career in technology has led him to his current role at Google, where he focuses on partner engineering for Independent Software Vendors (ISVs) and solution specialists in the Asia-Pacific region. His position suggests a high level of expertise in cloud technologies and a leadership role in fostering partnerships between Google Cloud and various technology solutions providers in the APAC market.</p><p>Mr. Abhishek Mahanty completed Master of Science (IT Software Systems) from the The University of Glasgow, England, which likely contributed to his strong foundation in technology and business. Previously he worked with Software Engineering at HCL Technologies, Solution Architect at Sun Microsystems, Principal Consultant and Solution Architect at Hewlette-Packard and Head of Partner Core with Amazon Web Service( AWS).</p>",
        year: 2025,
        date: "Friday, 12th September 2025",
        time: "10:30 A.M. IST",
        sessionTitle: "Plenary Session Talk 2: “Agentic AI ERA”",
        topic: "Agentic AI ERA",
        image: "https://avatar.iran.liara.run/public/12",
        order: 2
    },
    {
        name: "Dr Kumar Gautam",
        designation: "Founder and President",
        organization: "QRACE and Director of Egreen Quanta LLP, New Delhi, India.",
        bio: "<p>Dr. Gautam extensively work in quantum technologies, serving as Founder and President of QRACE and Director of Egreen Quanta LLP. His academic credentials include a Ph.D. in quantum gate design from Delhi University and postdoctoral research at GIST, South Korea, focusing on quantum vehicle routing.</p><p>With over 8 years of teaching experience, he is proficient in MATLAB, quantum computation, Python, and QSDE. Dr. Gautam is actively involved in promoting innovation and entrepreneurship as a Regional Mentor of Change (RMoC) under Atal Innovation Mission, NITI Aayog, Government of India.</p><p>He is a senior IEEE member, fellow of IETE, affiliate member of Royal Society of Chemistry, and life member of VIBHA, reflecting his strong professional affiliations. His achievements include numerous publications, patents, and managed sponsored research projects. Dr. Gautam collaborates with industry and academia, mentoring young researchers and students, showcasing his commitment to advancing quantum technologies and sustainable solutions.</p>",
        year: 2025,
        date: "Friday, 12th September 2025",
        time: "11:30 A.M. IST",
        sessionTitle: "Plenary Session Talk 3: Quantum Secure Communication Network Infrastructure for ITS",
        topic: "Quantum Secure Communication Network Infrastructure for ITS",
        image: "https://avatar.iran.liara.run/public/13",
        order: 3
    },
    {
        name: "Dr. Mohit P. Tahiliani",
        designation: "Associate Professor of CSE",
        organization: "National Institute of Technology (NITK), Surathkal, Karnataka, India",
        bio: "<p>He holds a Ph.D. from NITK ( In year 2012), focusing on \"Optimizing Congestion Avoidance and Congestion Control in Wired and Wireless Networks.\" Dr. Tahiliani is a Member of the Steering Committee for the ns-3 Network Simulator and the India Internet Engineering Society.</p><p>His areas of interest include Internet Traffic Engineering, TCP optimizations, Linux queue disciplines, ECN, and 802.11 Rate Adaptation Algorithms. His research has been sponsored by prominent organizations like Intel Technology India, ABB Global, Robert Bosch, Tata Communications, NVIDIA, and Futurewei Technologies, involving cutting-edge technologies such as Network Function Virtualization, Named Data Networking, Distributed Ledger Technology, and Deterministic Networking.</p><p>An open-source enthusiast, Dr. Tahiliani's team contributed the 'FQ-PIE' packet scheduler to Linux kernel v5.6. He serves as a co-maintainer for TCP and traffic control (tc) modules in ns-3 and has been involved with Google Summer of Code (GSoC) as a mentor and org admin for ns-3. He was an org admin for Google Code-In (GCI) in 2019 and 2020 and served as Chairperson of the IEEE Mangalore Subsection in 2023.</p>",
        year: 2025,
        date: "Friday, 12th September 2025",
        time: "12:30 P.M. IST",
        sessionTitle: "Plenary Session Talk 4: The Race against Latency: Leveraging Advanced Tools for Faster Research.",
        topic: "The Race against Latency: Leveraging Advanced Tools for Faster Research",
        image: "https://avatar.iran.liara.run/public/14",
        order: 4
    },
    {
        name: "Dr. Prakash Murali",
        designation: "Associate Professor of Computer Science",
        organization: "University of Cambridge, England",
        bio: "<p>His research interests include quantum architecture, resource estimation and compilation. He was previously a Senior Quantum Systems Architect as part of Microsoft's quantum computing program where he designed the Azure Quantum Resource Estimator to understand the resource needs of practical-scale quantum applications.</p><p>He graduated with a Computer Science Ph.D. from Princeton University. His PhD research aimed at developing an efficient quantum computing stack to bridge the resources gap between quantum algorithms and hardware that is buildable in the near future. His work has been adopted by several industry compilers, influenced architecture and industry benchmarking practices.</p><p>His work has been recognized by the ACM SIGARCH/IEEE CS TCCA Outstanding Dissertation Award (2022), Communications of ACM Research Highlights (2022), an IBM PhD fellowship (2021) and an IEEE Micro Top Picks award (2019)</p>",
        year: 2025,
        date: "Friday, 12th September 2025",
        time: "02:30 P.M. IST",
        sessionTitle: "Plenary Session Talk 5: Architecting scalable quantum computers through resource modelling and estimation",
        topic: "Architecting scalable quantum computers through resource modelling and estimation",
        image: "https://avatar.iran.liara.run/public/15",
        order: 5
    },
    {
        name: "Dr. Xavier Fernando",
        designation: "Professor",
        organization: "Toronto Metropolitan University, Canada",
        bio: "<p>Xavier Fernando is a Professor at Toronto Metropolitan University, Canada. He has (co-)authored close to 300 research articles, three books (one translated to Mandarin) and holds a few patents. He is the Director of TMU Intelligent Communications and Computing Lab that has received total research funding over $5 Million from industry and government.</p><p>He is a USA Fulbright Research Chair in 2025. He was an Associate Editor for the IEEE IOT Journal. He was an IEEE Communications Society Distinguished Lecturer and delivered over 100 invited talks all over the world. He has chaired the IEEE Toronto Section (2012-13) and IEEE Canada Central Area (2016-17) under IEEE Region-7.</p><p>His work has won 30 awards and prizes so far including, number of IEEE awards, Professional Engineers Ontario Award, IEEE Microwave Theory and Techniques Society Prize, Sarnoff Symposium Prize, Opto-Canada best poster prize and CCECE best paper prize. TMU nominated him for the Top 25 Canadian Immigrants award in 2012 in which was a finalist. He has been in the organizing/steering/technical program committees of numerous conferences and journals. He was a visiting scholar at the Institute of Advanced Telecommunications (IAT), UK in 2008 and MAPNET Fellow visiting Aston University, UK in 2014.</p>",
        year: 2025,
        date: "Friday, 12th September 2025",
        time: "07:30 P.M. IST",
        sessionTitle: "Plenary Session Talk 6: Information and Communication Technologies for Sustainable Country",
        topic: "Information and Communication Technologies for Sustainable Country",
        image: "https://avatar.iran.liara.run/public/17",
        links: [
            { name: "Website", url: "http://www.ee.ryerson.ca/~fernando" }
        ],
        order: 6
    },
    {
        name: "Dr. Jagdish M. Rathod",
        designation: "Professor",
        organization: "Birla Vishvakarma Mahavidyalaya (BVM), Vallabh Vidyanagar, Gujarat, India",
        bio: "<p>Dr. Jagdish M. Rathod is a Professor at Birla Vishvakarma Mahavidyalaya (BVM), Vallabh Vidyanagar, Gujarat, India, serving as Associate Dean and Professor I/C of the Research Centre. He holds a Ph.D. in RF and Wireless Engineering from Sardar Patel University, Vallabh Vidyangar, Gujarat.</p><p>Dr. Rathod is a dedicated educator and researcher who has guided numerous students at B.Tech, M.Tech, and Ph.D. levels. He has established notable initiatives like the IE(I) Electronics Students' chapter at BVM and the Centre of Excellence ELARC (ELectromagnetics and Antenna Research Centre), a pioneering research centre in Gujarat.</p><p>His achievements include: Publications: 125 technical papers and 5 patents., Conferences: Organized 16 conferences., Ph.D. Guidance: Guided 8 Ph.D. scholars.</p><p>His Leadership Roles: Nodal Officer (AISHE-MHRD Project), Twinning Arrangements (TEQIP-III), Member of Research Foundation of India; Expert and Mentor for AICTE training. Received Awards: Two-time Academic Excellence award recipient, 5 Stars Edge India Times Award, I2OR National Eminent Researcher Award 2020, Shiksha Bharati award for contributions to nation-building. Dr. Rathod has fostered industry collaborations (MoUs), supported prototype testing for students and researchers from NITs and industries, and contributed significantly to academic and research development.</p>",
        year: 2025,
        date: "Saturday, 13th September 2025",
        time: "09:00 A.M. IST",
        sessionTitle: "Plenary Session Talk 7: Radio Frequency Testing for 5G Network",
        topic: "Radio Frequency Testing for 5G Network",
        image: "https://avatar.iran.liara.run/public/16",
        order: 7
    }
];

const seedDB = async () => {
    try {
        await Conference.deleteMany({});
        await Conference.create(seedData);
        await RegistrationFee.deleteMany({});
        await RegistrationFee.insertMany(registrationFees);
        await Archive.deleteMany({});
        await Archive.insertMany(archives);
        await Speaker.deleteMany({});
        await Speaker.insertMany(speakers);
        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();
