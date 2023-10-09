import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer"
import Head from 'next/head'
import Link from "next/link";

function Terms() {
    return (
        <div className={`w-full h-screen bg-back pt-20 dark:bg-background`}>
            <Head>
                <title>Terms & Conditions | Aakhyaan Academy</title>
                <meta
                    name="description"
                    content="By accessing this website we assume you accept these terms and conditions. Do not continue to use Aakhyaan Academy if you do not agree to take all of the terms and conditions stated on this page."
                />
                <meta name="keywords" content="Terms and Conditions" />
                <meta property="og:title" content="Terms & Conditions | Aakhyaan Academy" key="ogtitle" />
                <meta property="og:description" content="By accessing this website we assume you accept these terms and conditions. Do not continue to use Aakhyaan Academy if you do not agree to take all of the terms and conditions stated on this page." key="ogdesc" />
            </Head>
            <Header page="programmes" />
            <div className="bg-back dark:bg-background dark:text-mainText/90 p-[6%] pt-[5%] text-lg font-normal pb-10">
                <p className="text-center text-4xl dark:text-blue-400 mb-16 font-medium">Terms and Conditions</p>

                <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use Aakhyaan Academy if you do not agree to take all of the terms and conditions stated on this page.</p>

                <p>The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.</p>

                <div className="text-blue-800 dark:text-mainText/90 text-xl mt-10">Cookies</div>

                <p>We employ the use of cookies. By accessing Aakhyaan Academy, you agreed to use cookies in agreement with the Aakhyaan Academy's Privacy Policy. </p>

                <p>Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.</p>

                <div className="text-blue-800 dark:text-mainText/90 text-xl mt-10">License</div>

                <p>Unless otherwise stated, Aakhyaan Academy and/or its licensors own the intellectual property rights for all material on Aakhyaan Academy. All intellectual property rights are reserved. You may access this from Aakhyaan Academy for your own personal use subjected to restrictions set in these terms and conditions.</p>

                <p>You must not:</p>
                <ul>
                    <li>Republish material from Aakhyaan Academy</li>
                    <li>Sell, rent or sub-license material from Aakhyaan Academy</li>
                    <li>Reproduce, duplicate or copy material from Aakhyaan Academy</li>
                    <li>Redistribute content from Aakhyaan Academy</li>
                    <li>Be able to use trademark of the company without written permission</li>
                </ul>
                <br></br>
                <p>Aakhyaan Academy reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.</p>

                <p>You warrant and represent that:</p>

                <ul>
                    <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>
                    <li>The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;</li>
                    <li>The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy</li>
                    <li>The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
                </ul>

                <p>You hereby grant Aakhyaan Academy a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.</p>

                <div className="text-blue-800 dark:text-mainText/90 text-xl mt-10">Your Privacy</div>

                <p>Please read <Link href="/privacy-policy">privacy policy</Link></p>

                <div className="text-blue-800 dark:text-mainText/90 text-xl mt-10">Reservation of Rights</div>

                <p>We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it’s linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.</p>

                <div className="text-blue-800 dark:text-mainText/90 text-xl mt-10">Removal of links from our website</div>

                <p>If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.</p>

                <p>We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.</p>

                <div className="text-blue-800 dark:text-mainText/90 text-xl mt-10">Disclaimer</div>

                <p>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:</p>

                <ul>
                    <li>limit or exclude our or your liability for death or personal injury;</li>
                    <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
                    <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
                    <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
                </ul>

                <p>The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.</p>

                <p>As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.</p>
            </div>
            <Footer />
        </div>
    );
}

export default Terms;