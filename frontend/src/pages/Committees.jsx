import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { User, Users, Award, Briefcase, Globe, Monitor, Code, Megaphone, Calendar, MapPin } from 'lucide-react';

const Committees = () => {
    const { search } = useLocation();
    const [activeTab, setActiveTab] = useState('advisory');

    useEffect(() => {
        const query = new URLSearchParams(search);
        const tab = query.get('tab');
        if (tab && ['advisory', 'conference-chairs', 'technical-program', 'organizing'].includes(tab)) {
            setActiveTab(tab);
        }
    }, [search]);

    const advisoryCommitteeData = {
        patron: {
            title: "Patron-in-Chief & President",
            members: ["Shri. Ganpatbhai Patel, President, Ganpat University"]
        },
        proChancellor: {
            title: "Pro- Chancellor and Director General",
            members: ["Dr. Mahendra Sharma, Pro-Chancellor, Ganpat University"]
        },
        proViceChancellor: {
            title: "Pro- Vice Chancellor",
            members: [
                "Dr. Rakesh Patel, Pro-Vice Chancellor, Ganpat University",
                "Dr. Amit Patel, Pro-Vice Chancellor, Ganpat University"
            ]
        },
        internationalBoard: {
            title: "International Advisory Board",
            members: [
                "Dr. Sartaj Sahni, University of Florida, USA",
                "Dr. Akshai Aggarwal, University of Windsor, Canada",
                "Mr. Dipak Mathur, IEEE Asia Pacific Region 10 IEEE R10 Director-Elect",
                "Dr. Kevin Daimi, University of Detroit, USA",
                "Dr. Hamid R. Arabnia, University of Georgia, USA",
                "Dr. Bala Natarajan, Kansas State University, USA",
                "Dr. Sanjay Madria, Missouri University of Science and Technology, USA",
                "Dr. Arvind Shah, Georgia Southwestern State University, USA",
                "Dr. P. Balasubramanian, Nanyang Technological University, Singapore",
                "Dr. Rutvij H. Jhaveri, PDPU, India",
                "Mr. Shyam Iyer(ACM Journal Reviewer), Dell EMC, USA",
                "Dr. Virendra C. Bhavsar, University of New Brunswick, Canada",
                "Dr. Xing Liu, Kwantlen Polytechnic University, Canada",
                "Dr. Kalpdrum Passi, Laurential University, Canada",
                "Dr. Ratvinder Grewal, Laurential University, Canada",
                "Dr. Ali Mostafaeipour, Yazd University, Iran",
                "Dr. Ramesh Bansal, University of Sharjah, United Arab Emirates",
                "Dr. Neville Watson, University of Canterbury, New Zealand",
                "Dr. Yuan Miao, Victoria University, Australia",
                "Dr. Shah Miah, Victoria University, Australia",
                "Dr. Mohan Kolhe, University of Agder, Norway",
                "Dr. Akhtar Kalam, Victoria University, Melbourne, Australia",
                "Dr. Pao-Ann Hsiung, National Chung Cheng University, Taiwan",
                "Dr. Prateek Agrawal, ITEC Research Centre, University of Klagenfurt, Austria",
                "Dr. Anatoliy Zabrovskiy, ITEC Research Centre, University of Klagenfurt, Austria",
                "Prof. Valentina Emilia Balas, Researcher, \"Aurel Vlaicu\", University of Arad, Romania",
                "Dr. Ashok Karania, EMEA, UK",
                "Dr. D.P. Kothari, Ex Vice Chancellor, VIT University, India",
                "Dr. H.S. Mazumdar, Director, R&D, Dharmsinh Desai University, India",
                "Dr. Debajyoti Mukhopadhyay, NHITM, Mumbai University, India"
            ]
        }
    };

    const chairs = {
        honorary: {
            title: "Honorary Chairs",
            icon: <Award className="w-5 h-5" />,
            members: [
                "Rajkumar Buyya, University of Melbourne, Australia",
                "Jose Manuel Molina López, Universidad Carlos III de Madrid, Spain"
            ]
        },
        general: {
            title: "General Chairs",
            icon: <User className="w-5 h-5" />,
            members: [
                "Satyen Parikh, Ganpat University, India",
                "Mohammed Atiquzzaman, University of Oklahoma, USA"
            ]
        },
        program: {
            title: "Program Chairs",
            icon: <Code className="w-5 h-5" />,
            members: [
                "Om Prakash Vyas, IIIT, Allahabad, India",
                "Sabu M. Thampi, IIITM-K, India"
            ]
        },
        technical: {
            title: "Technical Program Chairs",
            icon: <Monitor className="w-5 h-5" />,
            members: [
                "Nirbhay Chaubey, Ganpat University, India",
                "Noor Zaman, Taylor's University, Malaysia",
                "Mohit Tahiliani, National Institute of Technology, Surathkal, Karnataka, India"
            ]
        },
        track: {
            title: "Track Chairs",
            icon: <Users className="w-5 h-5" />,
            members: [
                "B. Venkatesan, IIIT, Allahabad, India",
                "Savita R. Gandhi, Gujarat University, India"
            ]
        },
        organizing: {
            title: "Organizing Chairs",
            icon: <Briefcase className="w-5 h-5" />,
            members: [
                "Kiran Amin, Ganpat University, India",
                "Mamoun Alazab, Charles Darwin University, Australia"
            ]
        },
        organizingMembers: {
            title: "Organizing Committee",
            icon: <Users className="w-5 h-5" />,
            members: [
                "Ajay Patel, Ganpat University, India",
                "Ketan Patel, Ganpat University, India",
                "Paresh M. Solanki, Ganpat University, India",
                "Savan Patel, Ganpat University, India",
                "Ravi Patel, Ganpat University, India",
                "Ritesh Joshi, Ganpat University, India",
                "Swati Patel, Ganpat University, India",
                "Vishnuba Chavda, Ganpat University, India",
                "Pravesh Patel, Ganpat University, India",
                "Bhavesh Patel, Ganpat University, India",
                "Jyotindra Dharwa, Ganpat University, India",
                "Ketan Sarvakar, Ganpat University, India",
                "Amit Suthar, Ganpat University, India",
                "Ketan J. Patel, Ganpat University, India",
                "Kimal Patel, Ganpat University, India"
            ]
        },
        industry: {
            title: "Industry/University Connect Chair",
            icon: <Globe className="w-5 h-5" />,
            members: [
                "R. D. Vanzara, Ganpat University, India",
                "Nikesh Modi, Dr. Babasaheb Ambedkar Open University, India"
            ]
        },
        website: {
            title: "Website Chairs",
            icon: <Monitor className="w-5 h-5" />,
            members: [
                "Amit Suthar, Ganpat University, India",
                "Kimal Patel, Ganpat University, India"
            ]
        },
        publicity: {
            title: "Publicity Chair",
            icon: <Megaphone className="w-5 h-5" />,
            members: [
                "Dr. R.K. Patel, Charotar University of Science and Technology, India",
                "Ravi Patel, Ganpat University, India"
            ]
        },
        technicalMembers: {
            title: "Technical Program Committee Members",
            icon: <Users className="w-5 h-5" />,
            members: [
                "Ruoyu Wang, Arizona State University, USA",
                "Kevin Gary, Arizona State University, USA",
                "Tatyana Ryutov, University of Southern California, USA",
                "George Sklivanitis, Florida Atlantic University, USA",
                "Koushik A. Manjunatha, Idaho National Laboratory, USA",
                "Sathyan Munirathinam, ASML Corporation, USA",
                "Yogesh Patel, Researchers, SalesForce, USA",
                "Priyanshukumar Jha, Researcher, Amazon, USA",
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
            ]
        }
    };

    const renderMembersSection = (key) => {
        const section = chairs[key];
        if (!section) return null;

        const isLongList = section.members.length > 6;

        return (
            <div className={`bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-xl transition-shadow ${isLongList ? 'md:col-span-2' : ''}`}>
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-3 pb-3 border-b border-gray-100">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                        {section.icon}
                    </div>
                    {section.title}
                </h3>
                <div className={isLongList ? "grid md:grid-cols-2 gap-x-8 gap-y-4" : "space-y-4"}>
                    {section.members.map((member, mIdx) => (
                        <div key={mIdx} className={isLongList ? "text-sm border-b border-gray-50 pb-2 last:border-0" : "text-sm"}>
                            <div className="font-semibold text-gray-800">{member.split(',')[0]}</div>
                            <div className="text-xs text-gray-500 mt-0.5">{member.split(',').slice(1).join(',')}</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="bg-gray-50 min-h-screen pt-28 pb-12">
            <div className="container mx-auto px-6">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in-up">
                        Committees
                    </h1>
                    <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mt-6"></div>
                </div>

                <div className="max-w-6xl mx-auto">
                    {/* Main Content Area */}
                    <div className="w-full">
                        {/* Tab Navigation */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
                            {[
                                { id: 'advisory', label: 'Advisory Committee' },
                                { id: 'conference-chairs', label: 'Conference Chairs' },
                                { id: 'technical-program', label: 'Technical Program Committee' },
                                { id: 'organizing', label: 'Organizing Committee' }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all border ${activeTab === tab.id ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'}`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Content Area */}
                        <div className="animate-fade-in-up">
                            {activeTab === 'advisory' && (
                                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 space-y-10">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3 border-b pb-4">
                                        <span className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                                            <Globe className="w-6 h-6" />
                                        </span>
                                        Advisory Committee
                                    </h2>

                                    {Object.entries(advisoryCommitteeData).map(([key, section]) => (
                                        <div key={key} className="space-y-4">
                                            <h3 className="text-lg font-bold text-blue-800 bg-blue-50 px-4 py-2 rounded-lg border-l-4 border-blue-600">
                                                {section.title}:
                                            </h3>
                                            <div className={`grid ${key === 'internationalBoard' ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-1'} gap-4`}>
                                                {section.members.map((member, idx) => (
                                                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg border border-gray-50 hover:bg-gray-50 transition-colors">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                                                        <div className="text-gray-700 text-sm">
                                                            <span className="font-bold">{member.split(',')[0]}</span>
                                                            {member.split(',').length > 1 && (
                                                                <span className="block text-xs text-gray-500 mt-0.5">
                                                                    {member.split(',').slice(1).join(',')}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'conference-chairs' && (
                                <div className="grid md:grid-cols-2 gap-6">
                                    {renderMembersSection('honorary')}
                                    {renderMembersSection('general')}
                                    {renderMembersSection('program')}
                                    {renderMembersSection('technical')}
                                    {renderMembersSection('track')}
                                    {renderMembersSection('organizing')}
                                    {renderMembersSection('industry')}
                                    {renderMembersSection('website')}
                                    {renderMembersSection('publicity')}
                                </div>
                            )}

                            {activeTab === 'technical-program' && (
                                <div className="grid md:grid-cols-2 gap-6">
                                    {renderMembersSection('technicalMembers')}
                                </div>
                            )}

                            {activeTab === 'organizing' && (
                                <div className="grid md:grid-cols-2 gap-6">
                                    {renderMembersSection('organizingMembers')}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Committees;
