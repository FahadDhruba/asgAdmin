import EcomNavbar from '@/app/components/EcomNavbar';
import Footer from '@/app/components/Footer';
import React from 'react';

const AboutUs = () => {
    return (
        <>
            <EcomNavbar />

            <div className="about-us-container bg-gradient-to-br from-blue-50 to-purple-50 py-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Header Section */}
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">
                        About Us
                    </h1>
                    <p className="text-lg text-gray-700 mb-8">
                        ASG Compressed Note-এ স্বাগতম! আপনার একাডেমিক সাফল্যের যাত্রায় আমরা আপনার বিশ্বস্ত সঙ্গী। পড়াশোনার সময় নোট, বই, প্র্যাকটিস সমস্যা এবং শেষ মুহূর্তের রিভিশনের মধ্যে সমন্বয় করা কঠিন মনে হয়, তাই না? এখানেই আমরা আপনাকে সাহায্য করতে এসেছি।
                    </p>
                    <p className="text-lg text-gray-700 mb-8">
                        ASG Compressed Note-এ আমরা তৈরি করেছি একটি <span className="font-bold text-blue-600">ওয়ান-ট্যাপ সলিউশন</span>, যা আপনার পড়াশোনাকে সহজ এবং সংগঠিত করে তোলে। আমাদের লক্ষ্য হলো আপনাকে একটি জায়গায় সবকিছু দেওয়া—থিওরি, ফর্মুলা, ডায়াগ্রাম, এবং প্র্যাকটিস প্রশ্ন—যাতে আপনি কোনো ঝামেলা ছাড়াই পড়াশোনা করতে পারেন।
                    </p>

                    {/* Vision Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            আমাদের ভিশন
                        </h2>
                        <p className="text-lg text-gray-700">
                            আমরা বিশ্বাস করি যে পড়াশোনা হওয়া উচিত <span className="font-bold text-purple-600">সহজ, সংগঠিত, এবং কার্যকর</span>। আমাদের লক্ষ্য হলো আপনাকে ধারণাগুলো বুঝতে, সমস্যা সমাধান করতে, এবং একাডেমিক সাফল্য অর্জনে সাহায্য করা—যেকোনো অগোছালো উপাদানের চাপ ছাড়াই।
                        </p>
                    </div>

                    {/* What We Offer Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            আমরা কী অফার করি?
                        </h2>
                        <ul className="text-lg text-gray-700 text-left list-disc list-inside space-y-4">
                            <li>
                                <span className="font-bold text-blue-600">বেসিক নোটস</span>: সব বিষয়ের জন্য সহজ এবং সংক্ষিপ্ত নোটস, যা আপনাকে গুছিয়ে পড়তে সাহায্য করবে।
                            </li>
                            <li>
                                <span className="font-bold text-blue-600">রিভিশন ম্যাটেরিয়াল</span>: শুধুমাত্র প্রয়োজনীয় টপিক এবং সমস্যা নিয়ে তৈরি করা রিভিশন উপাদান।
                            </li>
                            <li>
                                <span className="font-bold text-blue-600">সমস্যা সমাধানের প্র্যাকটিস</span>: স্ট্রাকচার্ড নোটস এবং প্র্যাকটিস প্রশ্ন যা আপনার সমস্যা সমাধানের দক্ষতা বাড়াবে।
                            </li>
                        </ul>
                    </div>

                    {/* Why Choose Us Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            কেন ASG Compressed Note বেছে নেবেন?
                        </h2>
                        <ul className="text-lg text-gray-700 text-left list-disc list-inside space-y-4">
                            <li>
                                <span className="font-bold text-purple-600">অল-ইন-ওয়ান সলিউশন</span>: একটি জায়গায় পাবেন থিওরি, ফর্মুলা, ডায়াগ্রাম, এবং প্র্যাকটিস প্রশ্ন।
                            </li>
                            <li>
                                <span className="font-bold text-purple-600">সময় বাঁচান</span>: কম সময়ে বেশি শিখুন, কোনো গোছানোর ঝামেলা ছাড়াই।
                            </li>
                            <li>
                                <span className="font-bold text-purple-600">এক্সাম-রেডি</span>: আমাদের নোটস আপনাকে রিভিশন করতে এবং পরীক্ষায় ভালো করতে সাহায্য করবে।
                            </li>
                            <li>
                                <span className="font-bold text-purple-600">সব বিষয়ের জন্য</span>: আমরা সব বিষয় কভার করি, যাতে আপনি প্রতিটি বিষয়ে দক্ষতা অর্জন করতে পারেন।
                            </li>
                        </ul>
                    </div>

                    {/* Experience the Difference Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            ASG Compressed Note-এর বিশেষত্ব
                        </h2>
                        <p className="text-lg text-gray-700">
                            আমরা শুধু নোট প্রদানকারী নই—আমরা আপনার পড়াশোনার সঙ্গী। আপনি পরীক্ষার প্রস্তুতি নিচ্ছেন, কোনো অধ্যায় রিভিশন করছেন, বা সমস্যা সমাধান করছেন, ASG Compressed Note আপনার একাডেমিক যাত্রাকে আরও সহজ এবং ফলপ্রসূ করে তুলবে।
                        </p>
                    </div>

                    {/* Footer Section */}
                    <p className="text-2xl font-bold text-gray-900 mt-10">
                        ASG Compressed Note<br />
                        <span className="text-xl">একটি নোট, সব সমাধান।</span>
                    </p>
                </div>


            </div>

            <Footer />

        </>
    );
};

export default AboutUs;