import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Calendar, MapPin, Globe, User, Award, Briefcase } from 'lucide-react';
import { useSocketRefresh } from '../hooks/useSocketRefresh';
import { useYear } from '../context/YearContext';

const Speakers = () => {
    const { selectedYear } = useYear();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const year = searchParams.get('year') || String(selectedYear);
    const [speakers, setSpeakers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSpeakers = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/speakers?year=${year}`);
            if (response.data && response.data.length > 0) {
                const normalized = response.data.map(s => ({
                    ...s,
                    title: s.designation || s.title,
                    affiliation: s.organization || s.affiliation
                }));
                setSpeakers(normalized);
            } else {
                // Keep the static fallback for previous years if not in DB
                setSpeakers(speakersData[year] || []);
            }
        } catch (error) {
            console.error('Error fetching speakers:', error);
            setSpeakers(speakersData[year] || []);
        } finally {
            setLoading(false);
        }
    }, [year]);

    useEffect(() => {
        fetchSpeakers();
    }, [fetchSpeakers]);

    useSocketRefresh(() => {
        console.log('Refreshing speakers...');
        fetchSpeakers();
    });

    const speakersData = {
        '2026': [], // Pending
        '2025': [
            {
                name: "Prof. Sandeep Kumar Shukla",
                title: "Director, International Institute of Information Technology, Hyderabad, India",
                affiliation: "IIIT Hyderabad, India",
                role: "Plenary Session Talk 1",
                topic: "Security of AI based systems",
                time: "September 12, 2025 | 09:30 A.M.",
                bio: "Prof. Sandeep Shukla, is an expert in cyber-physical systems, formal verification, and cyber security. Prior to joining IIIT Hdyderbad, he served as Professor in the Department of Computer Science and Engineering and co-director of the National Interdisciplinary Centre for Cyber Security and Cyber Defence of Critical Infrastructure at Indian Institute of Technology, Kanpur. He is a Fellow of IEEE, ACM Distinguished Scientist and has received numerous awards for his contributions to research and education. He has received the prestigious Presidential Early Career Award for Scientists and Engineers (PECASE) from the White House in 2004. Recipient of the Frederich Wilhelm Bessel Award from the Humboldt Foundation, Germany. Professor Shukla has published over 200 journal and conference papers, edited several books, and supervised PhD students.",
                image: "https://avatar.iran.liara.run/public/11"
            },
            {
                name: "Mr. Abhishek Mahanty",
                title: "Head of Partner Engineering, Google Cloud",
                affiliation: "Google Cloud, APAC",
                role: "Plenary Session Talk 2",
                topic: "Agentic AI ERA",
                time: "September 12, 2025 | 10:30 A.M.",
                bio: "Abhishek Mahanty is a seasoned technology professional with over 20 years of experience in the tech industry. He currently holds the position of APAC Head of Partner Engineering (ISVs & Solution Specialists) for Google Cloud at Google. Abhishek’s extensive career in technology has led him to his current role at Google, where he focuses on partner engineering for Independent Software Vendors (ISVs) and solution specialists in the Asia-Pacific region. His position suggests a high level of expertise in cloud technologies and a leadership role in fostering partnerships between Google Cloud and various technology solutions providers in the APAC market. Mr. Abhishek Mahanty completed Master of Science (IT Software Systems) from the The University of Glasgow, England. Previously he worked with Software Engineering at HCL Technologies, Solution Architect at Sun Microsystems, Principal Consultant and Solution Architect at Hewlette-Packard and Head of Partner Core with Amazon Web Service( AWS).",
                image: "https://avatar.iran.liara.run/public/12"
            },
            {
                name: "Dr. Kumar Gautam",
                title: "Founder and President of QRACE",
                affiliation: "Director of Egreen Quanta LLP, New Delhi, India",
                role: "Plenary Session Talk 3",
                topic: "Quantum Secure Communication Network Infrastructure for ITS",
                time: "September 12, 2025 | 11:30 A.M.",
                bio: "Dr. Gautam extensively work in quantum technologies, serving as Founder and President of QRACE and Director of Egreen Quanta LLP. His academic credentials include a Ph.D. in quantum gate design from Delhi University and postdoctoral research at GIST, South Korea, focusing on quantum vehicle routing. With over 8 years of teaching experience, he is proficient in MATLAB, quantum computation, Python, and QSDE. Dr. Gautam is actively involved in promoting innovation and entrepreneurship as a Regional Mentor of Change (RMoC) under Atal Innovation Mission, NITI Aayog, Government of India. He is a senior IEEE member, fellow of IETE, affiliate member of Royal Society of Chemistry, and life member of VIBHA.",
                image: "https://avatar.iran.liara.run/public/13"
            },
            {
                name: "Dr. Mohit P. Tahiliani",
                title: "Associate Professor of CSE",
                affiliation: "National Institute of Technology (NITK), Surathkal, Karnataka, India",
                role: "Plenary Session Talk 4",
                topic: "The Race against Latency: Leveraging Advanced Tools for Faster Research",
                time: "September 12, 2025 | 12:30 P.M.",
                bio: "He holds a Ph.D. from NITK ( In year 2012), focusing on “Optimizing Congestion Avoidance and Congestion Control in Wired and Wireless Networks.” Dr. Tahiliani is a Member of the Steering Committee for the ns-3 Network Simulator and the India Internet Engineering Society. His areas of interest include Internet Traffic Engineering, TCP optimizations, Linux queue disciplines, ECN, and 802.11 Rate Adaptation Algorithms. His research has been sponsored by prominent organizations like Intel Technology India, ABB Global, Robert Bosch, Tata Communications, NVIDIA, and Futurewei Technologies. An open-source enthusiast, Dr. Tahiliani’s team contributed the ‘FQ-PIE’ packet scheduler to Linux kernel v5.6.",
                image: "https://avatar.iran.liara.run/public/14"
            },
            {
                name: "Dr. Prakash Murali",
                title: "Associate Professor of Computer Science",
                affiliation: "University of Cambridge, England",
                role: "Plenary Session Talk 5",
                topic: "Architecting scalable quantum computers through resource modelling and estimation",
                time: "September 12, 2025 | 02:30 P.M.",
                bio: "His research interests include quantum architecture, resource estimation and compilation. He was previously a Senior Quantum Systems Architect as part of Microsoft’s quantum computing program where he designed the Azure Quantum Resource Estimator to understand the resource needs of practical-scale quantum applications. He graduated with a Computer Science Ph.D. from Princeton University. His PhD research aimed at developing an efficient quantum computing stack to bridge the resources gap between quantum algorithms and hardware that is buildable in the near future. His work has been recognized by the ACM SIGARCH/IEEE CS TCCA Outstanding Dissertation Award (2022).",
                image: "https://avatar.iran.liara.run/public/15"
            },
            {
                name: "Dr. Jagdish M. Rathod",
                title: "Professor & Associate Dean",
                affiliation: "Birla Vishvakarma Mahavidyalaya (BVM), Vallabh Vidyanagar, Gujarat, India",
                role: "Plenary Session Talk 7",
                topic: "Radio Frequency Testing for 5G Network",
                time: "September 13, 2025 | 09:00 A.M.",
                bio: "Dr. Jagdish M. Rathod is a Professor at Birla Vishvakarma Mahavidyalaya (BVM), Vallabh Vidyanagar, Gujarat, India, serving as Associate Dean and Professor I/C of the Research Centre. He holds a Ph.D. in RF and Wireless Engineering from Sardar Patel University, Vallabh Vidyangar, Gujarat. Dr. Rathod is a dedicated educator and researcher who has guided numerous students at B.Tech, M.Tech, and Ph.D. levels. He has established notable initiatives like the IE(I) Electronics Students’ chapter at BVM and the Centre of Excellence ELARC. His achievements include: Publications: 125 technical papers and 5 patents. He has received Two-time Academic Excellence award recipient, 5 Stars Edge India Times Award, and I2OR National Eminent Researcher Award 2020.",
                image: "https://avatar.iran.liara.run/public/16"
            }
        ],
        '2023': [
            {
                name: "Dr. Ashok Jhunjhunwala",
                title: "Padmashri and Institute Professor",
                affiliation: "IIT Madras, India",
                role: "Plenary Session Talk 1",
                topic: "Energy, Climate Change and Entrepreneurship",
                time: "February 6, 2023 | 09:30 A.M.",
                bio: "Ashok Jhunjhunwala, Institute Professor at IIT Madras, President, IITM Research Park, IITM Incubation Cell and RTBI, did his B.Tech degree from IIT Kanpur and MS and Ph.D. from University of Maine, USA, and was a faculty at Washington State University, USA for a year and half before joining as a faculty at IIT Madras in 1981. In 2017-18, he was on sabbatical from IITM and was Principal Advisor to the Minister of Power, MNRE, and Railways, Government of India, New Delhi. Prof. Jhunjhunwala is considered a pioneer in nurturing Industry-Academia interaction in India toward R&D, Innovation, and Product Development. He heads the IITM Incubation Cell and Rural Technology and Business Incubator (RTBI).",
                image: "https://avatar.iran.liara.run/public/31"
            },
            {
                name: "Dr. Hironori Washizaki",
                title: "Professor and Associate Dean of Research",
                affiliation: "School of Fundamental Science and Engineering, Waseda University, Tokyo, Japan",
                role: "Plenary Session Talk 2",
                topic: "Machine Learning Software Engineering and ML Design Pattern",
                time: "February 6, 2023 | 10:20 A.M.",
                bio: "Hironori Washizaki is a Professor and the Associate Dean of the Research Promotion Division at Waseda University in Tokyo, and a Visiting Professor at the National Institute of Informatics. He also works in industry as Outside Directors of SYSTEM INFORMATION and eXmotion. Hironori currently serves as IEEE Computer Society First Vice-President. He has been on IEEE CS Board of Governors since 2021. He was awarded Golden Core Member and Distinguished Contributor from IEEE CS. He is leading professional and educational activities, including the development of the Guide to the Software Engineering Body of Knowledge (SWEBOK).",
                image: "https://avatar.iran.liara.run/public/32"
            },
            {
                name: "Dr. Priyanka Sinha",
                title: "IoT Analytics lead",
                affiliation: "Zenatix Solutions, India",
                role: "Plenary Session Talk 4",
                topic: "IPv6 Neighbour Discovery Protocol enhancements for Wireless Network",
                time: "February 6, 2023 | 11:00 A.M.",
                bio: "Dr. Priyanka Sinha is IoT Analytics lead at Zenatix Solutions, India. She worked at Redback Networks on the SmartEdge 800, Itaas on interactive TV, and TCS Research on social IoT. She earned a Computer Science and Engineering (CSE) B.Tech from IIT Guwahati in 2004, an MS in Computer Engineering from Auburn University in 2007, and a Computer Science and Engineering (CSE) Ph.D from IIT Kharagpur in 2022. At Auburn she was a Vodafone fellow focussing on autoconfiguration in multi hop mobile adhoc networks.",
                image: "https://avatar.iran.liara.run/public/33"
            },
            {
                name: "Dr. Jyotika Athavale",
                title: "President-Elect of the IEEE Computer Society",
                affiliation: "NVIDIA, USA",
                role: "Plenary Session Talk 3",
                topic: "Standard For Functional Safety Data Format For Interoperability Within The Dependability Lifecycle",
                time: "February 6, 2023 | 07:30 P.M.",
                bio: "Jyotika Athavale is the 2023 President-Elect of the IEEE Computer Society. She is an experienced leader and influencer in emerging technologies and international standardization initiatives. She was awarded the IEEE Computer Society Golden Core Award in 2022. Jyotika chairs the IEEE P2851 Standard on Functional Safety interoperability. With over 25 years of industry experience, Jyotika is currently a senior technical leader in automotive functional safety at NVIDIA.",
                image: "https://avatar.iran.liara.run/public/34"
            }
        ],
        '2024': [
            {
                name: "Dr. Neeli Prasad",
                title: "Founder and Chief Executive Officer",
                affiliation: "SmartAvatar B.V., Netherlands/USA",
                role: "Plenary Session Talk 1",
                topic: "The Human-AI Collaboration: Navigating the Ethical and Digital Privacy Challenges of the Digital Age",
                time: "February 6, 2024 | 09:30 A.M.",
                bio: "Dr. Neeli Prasad, a great 5G Strategist, an entrepreneur and consultant in Silicon Valley and a distinguished Professor at International Technological University, San Jose, USA. Dr. Neeli Prasad is a visionary CEO and technology thought leader with a proven track record of driving strategic growth and global expansion initiatives. With deep expertise in telecommunications, cyber security, and wireless technology, Neeli has positioned herself as a driving force in shaping the future of technology and communications. As a cyber security and wireless technology expert, Neeli has spent her career driving business and technology innovation, from incubation to prototyping to validation.",
                image: "https://avatar.iran.liara.run/public/21"
            },
            {
                name: "Professor Dr. Manoj S. Gaur",
                title: "Director",
                affiliation: "Indian Institute of Technology (IIT), Jammu, India",
                role: "Plenary Session Talk 3",
                topic: "TBD",
                time: "February 6, 2024 | 10:30 P.M.",
                bio: "Prof Manoj Singh Gaur has been serving as the founding director of the Indian Institute of Technology Jammu since June 2017 and is also a Professor at the Department of Computer Science & Engineering; he is now in his second term. Before joining IIT Jammu, he was a Professor and Head of the Department of Computer Science and Engineering at Malaviya National Institute of Technology (MNIT) Jaipur, India. Prof Gaur has also been Dean of Students Affairs and Head of the Central Computer Centre at MNIT Jaipur. His current research areas include Computer and Network Security, Mobile Platform Security, and Data Privacy.",
                image: "https://avatar.iran.liara.run/public/22"
            },
            {
                name: "Dr. Ketan Kotecha",
                title: "Professor and Director",
                affiliation: "Symbiosis Institute of Technology, Pune, India",
                role: "Plenary Session Talk 3",
                topic: "Research Directions in AI",
                time: "February 6, 2024 | 11:30 A.M.",
                bio: "Dr. Ketan Kotecha is a highly acclaimed researcher and educator in artificial intelligence, computer algorithms, and machine learning. He has mentored over 20 PhD students to success, and his editorial board appointments with IEEE Access, PeerJ Computer Science journal, Cogent Journal by Taylor & Francis, and Frontiers Journals reflect his standing as a thought leader in the field. He has over 30 years of experience at the forefront of the field in AI and deep learning. He has recently achieved global recognition as one of the top 2% scientists worldwide, a distinction conferred by Stanford University.",
                image: "https://avatar.iran.liara.run/public/23"
            },
            {
                name: "Dr. Himanshu Soni",
                title: "Provost",
                affiliation: "CVM University, Vallabh Vidyangar, Gujarat, India",
                role: "Plenary Session Talk 3",
                topic: "IoT with Ultra-wideband Communication",
                time: "February 7, 2024 | 09:30 A.M.",
                bio: "Dr. Himanshu Soni currently working as a Provost at the CVM University, Vallabh Vidynagar, Anand, Gujarat. He did his Bachelors from the BVM Engineering College in the year 1997 and joined Master’s program at BITS, Pilani in the year 2001. Dr Soni completed Master’s degree with CGPA of 9.90 by securing first rank among the all PG courses at BITS, Pilani. In March 2023 he has been appointed as founder Provost of the CVM University. His current research interests include Wireless and Mobile Communication, Ultra wideband (UWB) communication, Multi user Communication etc.",
                image: "https://avatar.iran.liara.run/public/24"
            }
        ],
        '2022': [
            {
                name: "Professor (Dr.) Prabhat Ranjan",
                title: "Vice Chancellor",
                affiliation: "D.Y.Patil International University, Pune, India",
                role: "Plenary Session Talk 1",
                topic: "Building a Future Focused Research University",
                time: "February 6, 2022 | 08:30 A.M.",
                bio: "Professor (Dr.) Prabhat Ranjan, Vice Chancellor, D. Y. Patil International University, Pune, India and Former Executive Director, TIFAC, Govt. of India. Prof Ranjan is a Nuclear Fusion Scientist, a Futurist, an Educator, an Innovator, an Entrepreneur and a Science Communicator. From 2013-18, he was heading India’s Technology Think Tank, TIFAC (Technology Information, Forecasting and Assessment Council) in Delhi as its Executive Director. His research areas include Wireless Sensor Networks and Embedded Systems – applications to Planetary Exploration, Brain-Computer Interface, Wildlife, Nuclear Fusion, Assistive Technology for persons with severe disability.",
                image: "https://avatar.iran.liara.run/public/41"
            },
            {
                name: "Professor (Dr.) Ashutosh Dutta",
                title: "IEEE Fellow, Senior Scientist and 5G Strategist",
                affiliation: "Johns Hopkins University, Maryland, USA",
                role: "Plenary Session Talk 2",
                topic: "5G Security – Opportunities and Challenges",
                time: "February 6, 2022 | 09:30 A.M.",
                bio: "Ashutosh Dutta is currently Chief 5G Strategist and JHU/APL Sabbatical Fellow at Johns Hopkins University Applied Physics Labs (JHU/APL), USA. He also serves as Chair for Electrical and Computer Engineering for Engineering Professional Program at JHU. His career, spanning more than 30 years, includes Director of Technology Security and Lead Member of Technical Staff at AT&T, CTO of Wireless at a Cybersecurity company NIKSUN, Inc. As a Technical Leader in 5G and security, Ashutosh has been serving as the founding Co-Chair for the IEEE Future Networks Initiative.",
                image: "https://avatar.iran.liara.run/public/42"
            },
            {
                name: "Professor (Dr.) Sudip Misra",
                title: "IEEE Fellow, Professor",
                affiliation: "Indian Institute of Technology (IIT), Kharagpur, India",
                role: "Plenary Session Talk 3",
                topic: "IoT in Healthcare",
                time: "February 6, 2022 | 10:30 A.M.",
                bio: "Professor (Dr.) Sudip Misra is a Professor, Fellow of IEEE, and Abdul Kalam Technology Innovation National Fellow in the Department of Computer Science and Engineering at the Indian Institute of Technology Kharagpur. He was awarded the IEEE ComSoc Asia Pacific Outstanding Young Researcher Award at IEEE GLOBECOM 2012, California, USA. He was also the recipient of several academic awards and fellowships such as the Faculty Excellence Award (IIT Kharagpur) and Young Scientist Award (National Academy of Sciences, India).",
                image: "https://avatar.iran.liara.run/public/43"
            },
            {
                name: "Dr. Balaji Rajendran",
                title: "Associate Director",
                affiliation: "Centre for Development of Advanced Computing (C-DAC), Bangalore, India",
                role: "Plenary Session Talk 4",
                topic: "Cyber Resilience: Inspiration from the Internet Addressing Systems",
                time: "February 7, 2022 | 09:00 A.M.",
                bio: "Dr. Balaji Rajendran is working as an Associate Director at C-DAC Bangalore. He is leading the Centre of Excellence in DNS Security and also leading a national level project effort for developing Next Generation Smart Applications enabled with digital signatures and public key infrastructure. He is an Internet evangelist and had established a forum (Indian Internet Research and Engineering Forum) for promoting the development of Internet Protocol Standards in India.",
                image: "https://avatar.iran.liara.run/public/44"
            },
            {
                name: "Professor (Dr.) Martin Maier",
                title: "Professor",
                affiliation: "National Institute for Scientific Research (INRS), Montreal, Canada",
                role: "Plenary Session Talk 5",
                topic: "Internet of No Things in the Era of 6th Generation Networks",
                time: "February 7, 2022 | 10:00 A.M.",
                bio: "MARTIN MAIER is a full professor with the Institut National de la Recherche Scientifique (INRS), Montréal, Canada. He was educated at the Technical University of Berlin, Germany, and received M.Sc. and Ph.D. degrees in electrical engineering both with distinctions (summa cum laude). He was a co-recipient of the 2009 IEEE Communications Society Best Tutorial Paper Award. Further, he was a Marie Curie IIF Fellow of the European Commission. He is co-author of the book “Toward 6G: A New Era of Convergence”.",
                image: "https://avatar.iran.liara.run/public/45"
            }
        ],
        '2021': [
            {
                name: "Professor (Dr.) Ian T. Foster",
                title: "Distinguished Service Professor",
                affiliation: "University of Chicago & Argonne National Laboratory, USA",
                role: "Plenary Session Talk",
                topic: "Artificial Intelligence for Science",
                time: "February 6, 2021",
                bio: "Ian Foster, Father of Grid Computing, is the Arthur Holly Compton Distinguished Service Professor of Computer Science at the University of Chicago, USA and an Argonne Distinguished Fellow at Argonne National Laboratory. He was the Director of Argonne’s Computation Institute from 2006 to 2016. Foster’s research contributions span high-performance computing, distributed systems, and data-driven discovery. He has published hundreds of scientific papers and eight books. Dr. Foster is one of the highly cited authors in computer science and engineering worldwide.",
                image: "https://avatar.iran.liara.run/public/51"
            },
            {
                name: "Professor (Dr.) Rajkumar Buyya",
                title: "Redmond Barry Distinguished Professor",
                affiliation: "The University of Melbourne, Australia",
                role: "Plenary Session Talk",
                topic: "Neoteric Frontiers in Cloud and Edge Computing",
                time: "February 6, 2021",
                bio: "Professor (Dr.) Rajkumar Buyya is a Redmond Barry Distinguished Professor and Director of the Cloud Computing and Distributed Systems (CLOUDS) Lab, The University of Melbourne, Australia. He is also serving as the founding CEO of Manjrasoft, a spin-off company of the University. He has authored over 850 publications and seven text books including “Mastering Cloud Computing”. Dr. Buyya is one of the highly cited authors in computer science and software engineering worldwide.",
                image: "https://avatar.iran.liara.run/public/52"
            },
            {
                name: "Dr. Akshai Aggarwal",
                title: "Professor Emeritus",
                affiliation: "University of Windsor, Canada",
                role: "Plenary Session Talk",
                topic: "Resetting Universities After COVID-19",
                time: "February 6, 2021",
                bio: "Dr. Akshai Aggarwal (Life Senior Member of IEEE), Professor Emeritus, University of Windsor, Canada, Former Vice Chancellor, Gujarat Technological University (GTU), Ahmedabad, India (June 2010 to May 2016). Before joining as the Vice-Chancellor, of Gujarat Technological University, he worked as the Director of School of Computer Science, University of Windsor, Canada. He graduated with a B.Sc.(EE) from Punjab Engineering College, Punjab in year 1964 and completed Master’s and Doctoral work at Maharaja Sayajirao University of Baroda, Gujarat.",
                image: "https://avatar.iran.liara.run/public/53"
            },
            {
                name: "Prof. Arup R. Dasgupta",
                title: "Former Dy. Director",
                affiliation: "Space Application Centre (SAC), ISRO, India",
                role: "Plenary Session Talk",
                topic: "Security and AI : Social Dimensions",
                time: "February 6, 2021",
                bio: "Prof. Arup R. Dasgupta, Former Dy. Director, Space Application Centre (SAC), ISRO, India. He is a Managing Editor of Geospatial World magazine. He was a Distinguished Professor at the Bhaskaracharya Institute for Space Applications and Geoinformatics. He began his career in the Satellite Instructional Television Experiment (SITE). Later he was involved in the management of applications programmes for several remote sensing satellites including Bhaskara and IRS as well as development of Image and Information Processing systems.",
                image: "https://avatar.iran.liara.run/public/54"
            },
            {
                name: "Dr. K. K. Soundra Pandian",
                title: "Scientist",
                affiliation: "Ministry of Electronics & IT, Govt. of India",
                role: "Plenary Session Talk",
                topic: "Impact of Emerging Technologies and Challenges in Cyber Physical System",
                time: "February 7, 2021",
                bio: "Dr. K. K. Soundra Pandian, currently serving as Scientist for Government of India (GoI), Ministry of Electronics and Information Technology, Office of Controller of Certifying Authority (CCA), New Delhi, India with the responsibility to handle the “Digital Signature Certification, PKI” and Internet of Things (IoT). Dr. Pandian, received Ph.D from Indian Institute of Technology (IIT) Patna and Postdoctoral Fellow (PDF) from New York University, USA.",
                image: "https://avatar.iran.liara.run/public/55"
            }
        ],
        '2020': [
            {
                name: "Dr. Himanshu Mazumdar",
                title: "Professor and Head R&D Center",
                affiliation: "D.D. University, Nadiad, Gujarat, India",
                role: "Plenary Session Talk",
                topic: "Big Data in Life Science",
                time: "March 26, 2020",
                bio: "Dr. Himanshu Mazumdar, Senior member IEEE, currently Professor and Head R&D Center, D.D. University, Nadiad, Gujarat, India, has over 41 years of extensive experience in Airborne and Ground based instrumentation in Rocket, Satellite, Space Shuttle, Radio Telescope, Infrared Telescope, Industrial Automation, Process Control, Robotics, Communication, Signal and Image processing projects.",
                image: "https://avatar.iran.liara.run/public/61"
            },
            {
                name: "Dr. D. P. Kothari",
                title: "IEEE Fellow, Former Vice Chancellor",
                affiliation: "Wainganga College of Engineering & Management, India",
                role: "Plenary Session Talk",
                topic: "Ph.D Pursuing Areas",
                time: "March 26, 2020",
                bio: "Dr. D. P. Kothari, IEEE Fellow, Former Vice Chancellor, VIT Vellore, Former Director i/c IIT Delhi. Dr. Kothari, who is a recipient of the most Active Researcher Award, has published and presented 812 research papers in various national as well as international journals, conferences, guided 50 Ph.D scholars and 68 M. Tech students, and authored 50 books in various allied areas.",
                image: "https://avatar.iran.liara.run/public/62"
            },
            {
                name: "Dr. Mohit P. Tahiliani",
                title: "Assistant Professor",
                affiliation: "National Institute of Technology (NIT), Surathkal, Karnataka, India",
                role: "Plenary Session Talk",
                topic: "Networking using Network Namespaces in Linux",
                time: "March 26, 2020",
                bio: "Dr. Mohit P. Tahiliani is currently working as an Assistant Professor, National Institute of Technology (NIT), Surathkal, Karnataka, India. He did his B.E and M.Tech in Computer Science & Engineering from Visvesvaraya Technological University (VTU), Karnataka, INDIA and Ph.D in area of TCP from NIT, Karnataka, India. His areas of research interest include Computer Networks and Storage Technology. He worked with the development team of network simulation ns-3.",
                image: "https://avatar.iran.liara.run/public/63"
            }
        ]
    };

    // const speakers = speakersData[year] || [];

    return (
        <div className="bg-gray-50 min-h-screen pt-28 pb-12">
            <div className="container mx-auto px-6">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in-up">
                        Keynote Speakers {year}
                    </h1>
                    <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mt-6"></div>
                </div>

                <div className="grid lg:grid-cols-1 gap-12">
                    {/* LEFT COLUMN (Speakers List) */}
                    <div className="w-full space-y-8 animate-fade-in-up">
                        {speakers.length > 0 ? (
                            speakers.map((speaker, index) => (
                                <div key={index} className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-8 md:p-12 hover:shadow-2xl transition-all duration-500 overflow-hidden relative group">
                                    {/* Session Metadata Header */}
                                    <div className="text-center mb-10 space-y-2">
                                        {speaker.date && (
                                            <p className="text-gray-500 font-medium text-sm tracking-wide">
                                                Date: <span className="text-gray-800 font-bold">{speaker.date}</span>
                                            </p>
                                        )}
                                        {speaker.time && (
                                            <p className="text-gray-500 font-medium text-sm tracking-wide">
                                                Time: <span className="text-gray-800 font-bold">{speaker.time}</span>
                                            </p>
                                        )}
                                        {speaker.sessionTitle && (
                                            <h4 className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-700 to-sky-600 bg-clip-text text-transparent italic">
                                                {speaker.sessionTitle}: {speaker.topic}
                                            </h4>
                                        )}
                                        <div className="pt-2">
                                            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">
                                                Speaker: <span className="text-blue-600">{speaker.name}</span>
                                            </h2>
                                            <p className="text-lg text-gray-700 font-semibold max-w-2xl mx-auto leading-tight">
                                                {speaker.title}, {speaker.affiliation}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
                                        {/* Image Section */}
                                        <div className="flex-shrink-0 mx-auto md:mx-0">
                                            <div className="relative p-1 rounded-full bg-gradient-to-tr from-yellow-400 via-orange-500 to-yellow-200">
                                                <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-2xl transition-transform duration-700 group-hover:scale-105">
                                                    <img
                                                        src={speaker.image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop'}
                                                        alt={speaker.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bio & Links Section */}
                                        <div className="flex-grow space-y-6">
                                            <div>
                                                <p className="text-gray-600 leading-relaxed text-base md:text-lg text-justify font-primary">
                                                    {speaker.bio}
                                                </p>
                                                {speaker.topicDescription && (
                                                    <div className="mt-6 p-5 bg-blue-50/50 rounded-2xl border border-blue-100 italic text-gray-700 relative">
                                                        <div className="absolute -top-3 left-6 px-3 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-full uppercase tracking-widest shadow-lg">Talk Abstract</div>
                                                        {speaker.topicDescription}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Social/Reference Links */}
                                            <div className="flex flex-wrap gap-x-8 gap-y-4 pt-4 border-t border-gray-100">
                                                {(speaker.links || []).map((link, lIdx) => (
                                                    <a
                                                        key={lIdx}
                                                        href={link.url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="group flex flex-col gap-0.5"
                                                    >
                                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-blue-500 transition-colors">
                                                            {link.name || 'Official Link'}
                                                        </span>
                                                        <span className="text-sky-600 group-hover:text-blue-700 transition-all font-bold text-sm underline decoration-sky-300 decoration-2 underline-offset-4 break-all">
                                                            {link.url}
                                                        </span>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                                <div className="p-4 bg-gray-50 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-6">
                                    <User className="w-10 h-10 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Speakers Details Coming Soon</h3>
                                <p className="text-gray-500">The speaker list for {year} has not been announced yet. Please check back later.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Speakers;
