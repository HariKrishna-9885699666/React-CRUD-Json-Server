import React, { useState, useRef } from "react";
const indexValues = [0, 5]; // span tags present in these 2 position for the accordion tabs

export default function AboutApp() {
    const [showModal, setShowModal] = useState(false);
    const packagesUsed = ['axios', 'json-server', 'react-toastify', 'sweetalert2', 'concurrently'];
    const accordionData = [{ title: 'About me' }, { title: 'Package used' }];
    const accordionRef = useRef();
    const expand = (index) => {
        console.log(accordionRef.current.getElementsByTagName('span'))
        const ariaExpanded = accordionRef.current.getElementsByTagName('span')[index].getElementsByTagName('h2')[0].getElementsByTagName('button')[0];
        const ariaExpandedBoolean = JSON.parse(ariaExpanded.getAttribute('aria-expanded').toLowerCase());
        ariaExpanded.setAttribute('aria-expanded', !ariaExpandedBoolean);

        const svgUpDown = accordionRef.current.getElementsByTagName('span')[index].getElementsByTagName('h2')[0].getElementsByTagName('button')[0].getElementsByTagName('svg')[0];
        if (svgUpDown.getAttribute('class').search("rotate") > -1) {
            svgUpDown.setAttribute('class', 'w-6 h-6 shrink-0');
        } else {
            svgUpDown.setAttribute('class', 'w-6 h-6 rotate-180 shrink-0');
        }

        const divHiddenClass = accordionRef.current.getElementsByTagName('span')[index].getElementsByTagName('div')[0];
        if (divHiddenClass.getAttribute('class').search('hidden') > -1) {
            divHiddenClass.setAttribute('class', '');
        } else {
            divHiddenClass.setAttribute('class', 'hidden');
        }
        collapseAll(indexValues.filter(item => item !== index));
    }
    const collapseAll = (accordionKeys) => {
        accordionKeys.map(item => {
            const ariaExpanded = accordionRef.current.getElementsByTagName('span')[item].getElementsByTagName('h2')[0].getElementsByTagName('button')[0];
            ariaExpanded.setAttribute('aria-expanded', false);

            const svgUpDown = accordionRef.current.getElementsByTagName('span')[item].getElementsByTagName('h2')[0].getElementsByTagName('button')[0].getElementsByTagName('svg')[0];
            svgUpDown.setAttribute('class', 'w-6 h-6 shrink-0');

            const divHiddenClass = accordionRef.current.getElementsByTagName('span')[item].getElementsByTagName('div')[0];
            divHiddenClass.setAttribute('class', 'hidden');
            return item;
        });
    }
    return (
        <>
            <div className="aboutMe block" data-modal-toggle="defaultModal" onClick={() => {
                setShowModal(true);
            }}>
                <img src="images/user.gif" alt="about" width={100} height={100} />
            </div>
            <div id="defaultModal" tabIndex="-1" aria-hidden="true" className={`overflow-y-auto overflow-x-hidden fixed top-7 right-0 left-1/4 z-50 w-full md:inset-0 h-modal md:h-full ${showModal ? '' : 'hidden'}`}>
                <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                About App
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal" onClick={() => {
                                setShowModal(false);
                                collapseAll(indexValues);
                            }}>
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div id="accordion-collapse" data-accordion="collapse" ref={accordionRef}>
                                {accordionData.map((item, index) => {
                                    return (<span key={index}><h2 id={`accordion-collapse-heading-${index}`}>
                                        <button type="button" className="flex items-center justify-between w-full p-5 font-medium text-left border border-b-1 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-900 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target={`#accordion-collapse-body-${index}`} aria-expanded={false} aria-controls={`accordion-collapse-body-${index}`} onClick={() => {
                                            expand(!index ? index : index + (indexValues[1] - 1))
                                        }}>
                                            <span>{item.title}</span>
                                            <svg data-accordion-icon="" className="w-6 h-6 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                        </button>
                                    </h2>
                                        <div id={`accordion-collapse-body-${index}`} className="hidden" aria-labelledby={`accordion-collapse-heading-${index}`}>
                                            <div className="p-5 font-light border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                                                <ul className="space-y-1 list-inside text-gray-500 dark:text-gray-400">
                                                    {index === 1 ? packagesUsed.map((item) => {
                                                        return (<li className="flex items-center" key={item}>
                                                            <svg className="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                                            {item}
                                                        </li>)
                                                    }) : (<div className="flex space-x-4">
                                                        <div className="w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                                                            <div className="flex justify-end px-4 pt-4">&nbsp;</div>
                                                            <div className="flex flex-col items-center pb-10">
                                                                <img className="mb-3 w-24 h-24 rounded-full shadow-lg" src="https://harikrishna.netlify.app/assets/img/profile-img.jpg" alt="Hari Krishna Anem" />
                                                                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Hari Krishna Anem</h5>
                                                                <span className="text-sm text-gray-500 dark:text-gray-400">Senior full stack developer</span>
                                                                <span className="text-sm text-gray-500 dark:text-gray-400">9885699666</span>
                                                                <span className="text-sm text-gray-500 dark:text-gray-400">anemharikrishna@gmail.com</span>
                                                                <div className="flex mt-4 space-x-3 md:mt-6">
                                                                    <a href="https://web.whatsapp.com/send?text=Hello&phone=9885699666" className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700" target="_blank">Message</a>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                                                            <div className="flex justify-end px-4 pt-4">&nbsp;</div>
                                                            <div className="flex flex-col items-center pt-10">
                                                                <a href="https://github.com/HariKrishna-9885699666" target="_blank"><img src="images/github.gif" alt="about" width={35} height={35} className="mb-3 w-18 h-18 rounded-full shadow-lg" /></a>
                                                                <a href="https://www.linkedin.com/in/anemharikrishna" target="_blank"><img src="images/linkedin.gif" alt="about" width={35} height={35} className="mb-3 w-18 h-18 rounded-full shadow-lg" /></a>
                                                                <a href="https://harikrishna.netlify.app/" target="_blank"><img src="images/portfolio.png" alt="about" width={35} height={35} className="mb-3 w-18 h-18 rounded-full shadow-lg" /></a>
                                                                <a href="https://harikrishna.hashnode.dev/" target="_blank"><img src="images/blog.gif" alt="about" width={35} height={35} className="mb-3 w-18 h-18 rounded-full shadow-lg" /></a>
                                                            </div>
                                                        </div>
                                                    </div>)}
                                                </ul>
                                            </div>
                                        </div></span>)
                                })}
                            </div>
                        </div>
                        <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                            <button data-modal-toggle="defaultModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => {
                                setShowModal(false);
                                collapseAll(indexValues);
                            }}>OK</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}