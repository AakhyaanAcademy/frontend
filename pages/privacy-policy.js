import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer"
import Head from 'next/head'

function Privacy() {
    return (
        <div className={`w-full h-screen bg-back pt-20 dark:bg-background`}>
            <Head>
                <title>Privacy Policy | Aakhyaan Academy</title>
                <meta
                    name="description"
                    content="This Privacy Policy document contains types of information that is collected and recorded by Aakhyaan Academy and how we use it. If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us."
                />
                <meta name="keywords" content="Privacy Policy" />
                <meta property="og:title" content="Privacy Policy | Aakhyaan Academy" key="ogtitle" />
                <meta property="og:description" content="Know your privacy with Aakhyaan Academy | aakhyaan.org" key="ogdesc" />
            </Head>
            <Header page="programmes" />
            <div className="dark:bg-background font-normal bg-back dark:text-mainText/90 p-[6%] pt-[5%] text-lg pb-10">
                <p className="text-center text-4xl dark:text-blue-400 mb-16 font-medium">Privacy Policy</p>

                <p>This Privacy Policy document contains types of information that is collected and recorded by Aakhyaan Academy and how we use it. If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us. This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Aakhyaan Academy. This policy is not applicable to any information collected offline or via channels other than this website.</p>

                <div className="text-blue-800 dark:text-mainText/90 text-xl mt-10">Consent</div>

                <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>

                <div className="text-blue-800 dark:text-mainText/90 text-xl mt-10">Information we collect</div>

                <p>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</p>
                <p>If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</p>
                <p>When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.</p>

                <div className="text-blue-800 dark:text-mainText/90 text-xl mt-10">How we use your information</div>

                <p>We use the information we collect in various ways, including to:</p>

                <ul>
                    <li>Provide, operate, and maintain our website</li>
                    <li>Improve, personalize, and expand our website</li>
                    <li>Understand and analyze how you use our website</li>
                    <li>Develop new products, services, features, and functionality</li>
                    <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
                    <li>Send you emails</li>
                    <li>Find and prevent fraud</li>
                </ul>

                <div className="text-blue-800 dark:text-mainText/90 text-xl mt-10">Log Files</div>

                <p>Aakhyaan Academy follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.</p>

                <div className="text-blue-800 dark:text-mainText/90 text-xl mt-10">Cookies and Web Beacons</div>

                <p>Like any other website, Aakhyaan Academy uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>



                <div className="text-blue-800 dark:text-mainText/90 text-xl mt-10">Advertising Partners Privacy Policies</div>

                <p>You may consult this list to find the Privacy Policy for each of the advertising partners of Aakhyaan Academy. Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Aakhyaan Academy, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit. Note that Aakhyaan Academy has no access to or control over these cookies that are used by third-party advertisers.</p>

                <div className="text-blue-800 dark:text-mainText/90 text-xl mt-10">Third Party Privacy Policies</div>

                <p>Aakhyaan Academy's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options. You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.</p>

                <div className="text-blue-800 dark:text-mainText/90 text-xl mt-10">GDPR Data Protection Rights</div>

                <p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
                <li>The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.</li>
                <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</li>
                <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
                <li>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
                <li>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</li>
                <li>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
                <li>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</li>

                <div className="text-blue-800 dark:text-mainText/90 text-xl mt-10">Children's Information</div>

                <p>Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. Aakhyaan Academy does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</p>
            </div>
            <Footer />
        </div>
    );
}

export default Privacy;