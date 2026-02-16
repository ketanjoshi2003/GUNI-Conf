const mongoose = require('mongoose');

const Conference = require('./models/Conference');
const RegistrationFee = require('./models/RegistrationFee');
const Archive = require('./models/Archive');
const Speaker = require('./models/Speaker');
const Committee = require('./models/Committee');
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
    short_name: 'COMS2',
    year: '2026',
    edition: '7th Edition',
    mode: 'Hybrid Mode',
    description: `<p>The 7th Edition COMS2 will be held in hybrid mode at the vibrant campus of Ganpat University, Gujarat, India on the 12-13 September 2025. The theme of COMS2 2025 is “Sustainable Computing and Intelligent Network Systems,” focusing on cutting-edge research, innovations, and applications in computing, intelligent networking and communication technologies and related areas.</p>

<p>COMS2 aims to unite leading academicians, researchers, scientists, and professionals from industry and academia, providing a platform to share research findings, experiences, and insights on networking, communication, and future trends. The conference will foster academic-industry collaboration, serving the research community on a larger scale.</p>

<p>We cordially invite authors, researchers, and industry practitioners to submit their original, high-quality research papers showcasing the latest advancements and innovations in the fields of Computing, Networking, Communication, and Security, including but not limited to:</p>`,
    theme: 'Computing Communication Security',
    venue: 'Ganpat University',
    state: 'Gujarat',
    country: 'India',
    start_date: new Date('2026-09-10'),
    end_date: new Date('2026-09-11'),
    website: 'https://coms2.gnu.ac.in/',
    author_page: 'https://coms2.gnu.ac.in/for-authors/',
    university_about: `<p>Ganpat University is a well reputed State Private University established in 2005 through the State Legislative Act No.19/2005 on 12th April 2005, Government of Gujarat, and recognized by the UGC under the section 2(f) of the UGC Act, 1956 having campus spread over more than 300 acres of land with world-class infrastructure and more than 10,000 students on campus.</p> 

<p>The University offers Diplomas, Under Graduate, Post Graduate, and Research Programs in the field of Engineering and Technology, Computer Applications, Management, Pharmacy, Sciences, Commerce & Social Science, Architecture, Design & Planning, Maritime Studies, Nursing, & Agriculture, etc.</p>`
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

        const technicalCommitteeData = [
            "Ruoyu Wang, Arizona State University, USA",
            "Kevin Gary, Arizona State University, USA",
            "Tatyana Ryutov, University of Southern California, USA",
            "George Sklivanitis, Florida Atlantic University, USA",
            "Koushik A. Manjunatha, Idaho National Laboratory, USA",
            "Sathyan Munirathinam, ASML Corporation, USA",
            "Yogesh Patel, SalesForce, USA",
            "Priyanshukumar Jha, Amazon, USA",
            "El Sayed Mahmoud, Sheridan College, Canada",
            "Jigisha Patel, Sheridan College, Canada",
            "Pawan Lingra, St. Marry University, Canada",
            "Xing Liu, Kwantlen Polytechnic University, Canada",
            "Muhammad Dangana, University of Glasgow, U.K.",
            "Gisa Fuatai Purcel, Victoria University of Wellingtons, U.K.",
            "Gyu Myoung Lee, Liverpool John Moores University, U.K.",
            "Stefano Cirillo, University of Salerno, Italy",
            "Flavio Vella, Free University of Bozen, Italy",
            "Alessandro Barbiero, Università degli Studi di Milano, Italy",
            "Lelio Campanile, Università degli studi della Campania L.Vanvitelli, Italy",
            "Asmerilda Hitaj, University of Milano Bicocca, Italy",
            "Abdallah Handoura, Ecole Nationale Supérieure des Télécommunications de, France",
            "Gua Xiangfa, National University of Singapore, Singapore",
            "Raman Singh, The University of Dublin, Ireland",
            "Ahmed M. Elmisery, Waterford Institute of Technology, Ireland",
            "Shahzad Ashraf, Hohai University, China",
            "Moharram Challenger, University of Antwerp, Belgium",
            "Mamoun Alazab, Charles Darwin University, Australia",
            "Dragi Kimovski, Klagenfurt University, Australia",
            "Iwan Adhicandra, University of Sydney, Australia",
            "Payal Mahida, Victorian Institute of Technology, Australia",
            "Tarandeep Kaur Bhatia, Deakin University, Australia",
            "Siddharth Patel, Eaton Corporation, Australia",
            "Marcin Paprzycki, Polish Academy of Sciences, Poland",
            "Sabyasachi Chakraborty, Inje University, South Korea",
            "Sayan K. Ray, Manukau Institute of Technology, New Zealand",
            "Ahmed Al-Sa’di, Auckland University of Technology, New Zealand",
            "Clementine Gritti, University of Canterbury, New Zealand",
            "Samaneh Madanian, Auckland University of Technology, New Zealand",
            "Aravind Nair, KTH Royal Institute of Technology, Sweden",
            "Yehia Abd Alrahman, Chalmers University of Technology, Sweden",
            "Karl Andersson, Luleå University of Technology, Sweden",
            "Jose M. Molina, Universidad Carlos III de Madrid, Spain",
            "Manuel Chica, Universidad De Granada, Spain",
            "Jose Angel Diaz-Garcia, Universidad De Granada, Spain",
            "Carlos Fernandez-Basso, University of Granada, Spain",
            "George Papakostas, Eastern Macedonia and Thrace Institute of Technology, Greece",
            "Dimitris Karampatzakis, International Hellenic University, Greece",
            "Ioannis Tollis, University of Crete, Greece",
            "Christos J. Bouras, University of Patras, Greece",
            "Loannis Tollis, University of Crete, Greece",
            "Zitong Yu, University of Oulu, Finland",
            "Akien Paul, University of the West Indies, West Indies",
            "Rakhee, University of the West Indies, West Indies",
            "Ammar Muthanna, Saint Petersburg State University of Telecommunications, Russia",
            "Noor Zaman Jhanjhi, Taylor’s University, Malaysia",
            "Irdayanti Mat Nashir, Universiti Pendidikan Sultan Idris, Malaysia",
            "Jing Rui Tang, University Sains Malaysia, George Town, Malaysia",
            "Jing Rui Tang, University Pendidikan Sultan Idris, Malaysia",
            "Zaliza Hanapi, Universiti Pendidikan Sultan Idris, Malaysia",
            "Encik Ong Jia Hui, Tunku Abdul Rahman University College, Malaysia",
            "Qusay Medhat Salih, University Malaysia Pahang, Malaysia",
            "Dalal A. Hammood, Universiti Malaysia Perlis, Malaysia",
            "Muhammad Asif Khan, Qatar University, Qatar",
            "Ashraf A. M. Khalaf, Minia University, Egypt",
            "Dimiter G. Velev, University of National and World Economy, Bulgaria",
            "Pahlaj Moolio, Pannasastra University of Cambodia, Cambodia",
            "Mudassir Khan, King Khalid University, Saudi Arabia",
            "Lamia Berriche, Prince Sultan University, Saudi Arabia",
            "Lal Bihari Barik, King Abdulaziz University, Kingdom of Saudi Arabia",
            "Shermin Shamsudheen, Jazan University, Saudi Arabia",
            "Tran Cong Hung, Posts and Telecommunication Institute of Technology, VietNam",
            "Anand Nayyar, Duy Tan University, Vietnam",
            "Pao-Ann Hsiung, National Chung Cheng University, Taiwan",
            "Seyyed Ahmad Edalatpanah, Ayandegan Institute of Higher Education, Iran",
            "Aws Zuheer Yonis, Ninevah University, Iraq",
            "Razan Abdulhammed, Northern Technical University, Iraq",
            "Moharram Challenger, International Computer Institute at Ege University, Turkey",
            "Sandeep Kautish, LBEF campus, Kathmandu, Nepal",
            "A.A Gde Satia Utama, Universitas Airlangga, Indonesia",
            "Eva Shayo, University of Dar es Salaam, Tanzania",
            "Anil Audumbar Pise, University of the Witwatersrand Johannesburg, South Africa",
            "Sarang C. Dhongdi, BITS Pilani, India",
            "Satyabrata Jit, IIT(BHU), India",
            "Pratik Chattopadhyay, IIT(BHU), India",
            "Amrita Chaturvedi, IIT(BHU), India",
            "Amit Kumar Singh, IIT(BHU), India",
            "Amrita Mishra, IIIT Naya Raipur, India",
            "Panchami V., IIIT, Kottayam, India",
            "Bhuvaneswari Amma N.G., IIIT, Una, India",
            "Jitendra Tembhurne, IIIT, Nagpur, India",
            "Renjith P., IIIT, Kurnool, India",
            "Sachin Jain, IIIT, Jabalpur, India",
            "Priyanka Mishra, IIIT, Kota, India",
            "Chetna Sharma, IIIT, Kota, India",
            "Eswaramoorthy K., IIIT, Kurnool, India",
            "Pandiyarasan Veluswamy, IIITDM Kancheepuram, India",
            "Sahil, IIIT, Una, India",
            "Sanya Anees, IIIT, Guwahati, India",
            "Suvrojit Das, NIT, Durgapur, India",
            "Aruna Jain, Birla Institute of Technology, India",
            "Amit Kumar Gupta, DRDO, Hyderbad, India",
            "R. Kumar, SRM University, India",
            "B Ramachandran, SRM University, India",
            "Iyyanki V Muralikrishna, J.N.Technological University, India",
            "Apurv Shah, M.S. University, India",
            "Manoj Kumar, Infliblnet University Grants Commission, India",
            "U. Dinesh Kumar, IIM, Bangalore, India",
            "Saurabh Bilgaiyan, KIIT, Deemed to be University, India",
            "Raja Sarath Kumar Boddu, Jawaharlal Nehru Technological University, India",
            "Kiran Sree Pokkuluri, SVECM, India",
            "Devesh Kumar Srivastava, Manipal University, India",
            "P. Muthulakshmi, SRM University, India",
            "R. Anandan, VELS University, India",
            "Amol Dhondse, IBM India Software Labs, India",
            "R. Amirtharajan, SASTRA Deemed University, India",
            "Padma Priya V., SASTRA Deemed University, India",
            "Deepak H Sharma, K. J. Somaiya College of Engineering, India",
            "Ravi Subban, Pondicherry University, India",
            "Parameshachari B D, Visvesvaraya Technological University, India",
            "Nilakshi Jain, University of Mumbai, India",
            "Archana Mire, University of Mumbai, India",
            "Sonali Bhutad, University of Mumbai, India",
            "Anand Kumar, Visvesvaraya Technological University, India",
            "Jyoti Pareek, Gujarat University, India",
            "Sanjay Garg, Jaypee University of Engineering and Technology, India",
            "Madhuri Bhavsar, Nirma University, India",
            "Vijay Ukani, Nirma University, India",
            "Mayur Vegad, BVM Engineering College, India",
            "N. M. Patel, BVM Engineering College, India",
            "J. M. Rathod, BVM Engineering College, India",
            "Maulika Patel, CVM University, India",
            "Nikhil Gondalia, CVM University, India",
            "Priyanka Sharma, Rashtriya Raksha University, India",
            "Digvijaysinh Rathod, National Forensic Science University, India",
            "Kalpesh Parikh, Intellisense IT, India",
            "Balaji Rajendran, CDAC, Bangaluru, India",
            "Mehul C. Parikh, Gujarat Technological University, India",
            "G. R. Kulkarni, Shivaji University, India",
            "Amol C. Adamuthe, Shivaji University, India",
            "Shrihari Khatawkar, Shivaji University, India",
            "Snehal Joshi, Veer Narmad South Gujarat University, India",
            "Ambika Nagaraj, Bengaluru Central University, India",
            "Ashok Solanki, Veer Narmad South Gujarat University, India",
            "Aditya Sinha, CDAC, India",
            "Harshal Arolkar, GLS University, India",
            "Binod Kumar, University of Pune, India",
            "Maulin Joshi, Gujarat Technological University, India",
            "Vrushank Shah, Indus University, India",
            "Manish Patel, Sankalchand Patel University, India",
            "Ankit Bhavsar, GLS University, India",
            "Seema Mahajan, Indus University, India",
            "S. K. Vij, ITM University, India",
            "Vishal Jain, Sharda University, India",
            "D. B. Choksi, Sardar Patel University, India",
            "Paresh Virpariya, Sardar Patel University, India",
            "Priti Srinivas Sajja, Sardar Patel University, India",
            "C. K. Bhensdadia, Dharmsinh Desai University, India",
            "Vipul K. Dabhi, Dharmsinh Desai University, India",
            "N. J. Kothari, Dharmsinh Desai University, India",
            "Narayan Joshi, Dharmsinh Desai University, India",
            "S. D. Panchal, Gujarat Technological University, India",
            "M. T. Savaliya, Gujarat Technological University, India",
            "Vinod Desai, Gujarat Vidyapith, India",
            "Himanshu Patel, Dr. Babasaheb Ambedkar Open University, India",
            "Chhaya Patel, Gujarat Technological University, India",
            "Jignesh Doshi, Gujarat Technological University, India",
            "Bhaveshkumar Prajapati, Gujarat Technological University, India",
            "Nisha Somani, Gujarat Technological University, India",
            "Desai Archana Natvarbhai, Gujarat Technological University, India",
            "Akhilesh Ladha, Gujarat Technological University, India",
            "Jaymin Bhalani, Gujarat Technological University, India",
            "Dhananjay Yadav, Gujarat Technological University, India",
            "Keyur Jani, Gujarat Technological University, India",
            "Jeegar Trivedi, Sardar Patel University, India"
        ];

        const technicalCommittees = technicalCommitteeData.map((item, index) => {
            const parts = item.split(',').map(p => p.trim());

            let name = parts[0];
            let organization = "";
            let designation = "";

            // Heuristic for title/designation
            if (name.includes("Dr. ")) {
                designation = "Dr.";
                name = name.replace("Dr. ", "");
            } else if (name.includes("Prof. ")) {
                designation = "Prof.";
                name = name.replace("Prof. ", "");
            } else if (name.includes("Mr. ")) {
                designation = "Mr.";
                name = name.replace("Mr. ", "");
            } else {
                designation = "Member";
            }

            // Extract Name and potentially designation from it first? 
            // Actually the manual map below is safer but I used a data array above. 
            // Let's refine the parsing.

            if (parts.length >= 2) {
                organization = parts.slice(1).join(', ');
            }

            return {
                name: name,
                designation: designation, // Set a default or extract if possible
                organization: organization,
                type: "Technical Program Committee Members",
                sectionOrder: 3,
                year: 2026,
                order: index + 1
            };
        });

        await Committee.deleteMany({ type: { $in: ["Technical Program Committee", "Technical Program Committee Members"] } });
        await Committee.insertMany(technicalCommittees);
        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();
