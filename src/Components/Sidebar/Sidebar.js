import React, { useState } from 'react';
import { AiOutlineHome, AiOutlineRead, AiOutlineLinkedin, AiOutlineLink, AiOutlinePoweroff } from "react-icons/ai";
import { BsMegaphone, BsChatText, BsChevronLeft } from "react-icons/bs";
import { HiOutlineAtSymbol, HiOutlineCog } from "react-icons/hi";
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export default function Sidebar({handleClick, inboxCount}) {
    
  return (
    <section className='sidebar'>
        <div className='sidebar-body d-flex flex-column justify-content-between py-3'>
                        <Button className='toggle-btn mt-2' onClick={handleClick}>
                            <BsChevronLeft size={15} />
                        </Button>
                        <div className='sidebar-top'>
                            <img className='logo' src={'/images/lu-logo.png'} alt='' />
                            <span>Lead Usher</span>
                        </div>
                        <div className='main-menu'>

                            <NavLink to={'/'} className='d-flex align-items-center menu-item link py-2' >
                                <div className='menu-icon'>
                                    <AiOutlineHome />
                                </div>
                                <span>Home</span>
                            </NavLink>

                            <NavLink to={'/campaigns'} className='d-flex align-items-center menu-item link py-2' >
                                <div className='menu-icon'>
                                    <BsMegaphone />
                                </div>
                                <span>Campaigns</span>
                            </NavLink>

                            <NavLink to={'/pipelines'} className='d-flex align-items-center menu-item link py-2' >
                                <div className='menu-icon'>
                                    <AiOutlineRead />
                                </div>
                                <span>Pipelines</span>
                            </NavLink>

                            <NavLink to={'/inbox'} className='d-flex align-items-center menu-item link py-2' >
                                <div className='menu-icon'>
                                    <BsChatText />
                                </div>
                                <span>Inbox</span>
                                {
                                    inboxCount && inboxCount.count && inboxCount.count > 0 ?
                                    <div className='unread-count'>{inboxCount.count}</div> :
                                    ''
                                }
                            </NavLink>

                            <NavLink to={'/email-integration'} className='d-flex align-items-center menu-item link top-line py-2' >
                                <div className='menu-icon'>
                                    <HiOutlineAtSymbol />
                                </div>
                                <span>Email Integration</span>
                            </NavLink>
                            
                            <NavLink to={'/linkedin-accounts'} className='d-flex align-items-center menu-item link py-2' >
                                <div className='menu-icon'>
                                    <AiOutlineLinkedin />
                                </div>
                                <span>Linkedin Accounts</span>
                            </NavLink>

                            <NavLink to={'/webhook'} className='d-flex align-items-center menu-item link py-2' >
                                <div className='menu-icon'>
                                    <AiOutlineLink />
                                </div>
                                <span>Webhook</span>
                            </NavLink>

                            <NavLink to={'/account-settings'} className='d-flex align-items-center menu-item link py-2' >
                                <div className='menu-icon'>
                                    <HiOutlineCog />
                                </div>
                                <span>Account Settings</span>
                            </NavLink>

                        </div>

                        <div className='sidebar-bottom'>
                            <NavLink to={'/login'} className='d-flex align-items-center menu-item link py-3' >
                                <div className='menu-icon'>
                                    <AiOutlinePoweroff />
                                </div>
                                <span>Logout</span>
                            </NavLink>
                        </div>
                    </div>
    </section>
  )
}
