import React,{useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import { Tabs, Tab } from 'react-bootstrap';
import { AiOutlinePlus } from "react-icons/ai";
import Searchbar from '../Inputs/Searchbar';
import { getRecord, createRecord } from '../../Config/apiFunctions';
import { useQuery } from "react-query";
import CampaignBox from './CampaignBox';
import { useNavigate } from 'react-router-dom';
import Pagination from '../UI/Pagination';
import routes from '../../Config/routes/api';
import { useSelector } from "react-redux";
import { selectProfile } from "../../features/profile/profileSlice";


const { campaignRoute } = routes;


export default function CampaignsContent() {
    const user = useSelector(selectProfile);
    const [campaigns, setCampaigns] = useState([]);

    // const campaigns = [
    //     {
    //         id: '1',
    //         status: true,
    //         title: 'Camp Title 1',
    //         progress: '0',
    //         createdAt: '2 hours ago',
    //         steps: '3',
    //         new: '0',
    //         contacted: '0',
    //         connected: '0',
    //         replied: '0',
    //         lead: '0',
    //         customer: '0',
    //         notconnected: '0',
    //         accepted: {
    //             progressValue: '50',
    //             reqSent: '0',
    //             acceptedReq: '0'
    //         },
    //         replyRate: {
    //             progressValue: '50',
    //             totalContact: '0',
    //             linkedinRep: '0',
    //             emailRep: '0'
    //         },
    //         msgClickRate: {
    //             progressValue: '50',
    //             clickSent: '0',
    //             linkClicked: '0'
    //         }
    //     },
    //     {
    //         id: '2',
    //         status: true,
    //         title: 'Camp Title 2',
    //         progress: '0',
    //         createdAt: '2 hours ago',
    //         steps: '3',
    //         new: '0',
    //         contacted: '0',
    //         connected: '0',
    //         replied: '0',
    //         lead: '0',
    //         customer: '0',
    //         notconnected: '0',
    //         accepted: {
    //             progressValue: '50',
    //             reqSent: '0',
    //             acceptedReq: '0'
    //         },
    //         replyRate: {
    //             progressValue: '50',
    //             totalContact: '0',
    //             linkedinRep: '0',
    //             emailRep: '0'
    //         },
    //         msgClickRate: {
    //             progressValue: '50',
    //             clickSent: '0',
    //             linkClicked: '0'
    //         }
    //     },
    //     {
    //         id: '3',
    //         status: false,
    //         title: 'Camp Title 3',
    //         progress: '0',
    //         createdAt: '2 hours ago',
    //         steps: '3',
    //         new: '0',
    //         contacted: '0',
    //         connected: '0',
    //         replied: '0',
    //         lead: '0',
    //         customer: '0',
    //         notconnected: '0',
    //         accepted: {
    //             progressValue: '50',
    //             reqSent: '0',
    //             acceptedReq: '0'
    //         },
    //         replyRate: {
    //             progressValue: '50',
    //             totalContact: '0',
    //             linkedinRep: '0',
    //             emailRep: '0'
    //         },
    //         msgClickRate: {
    //             progressValue: '50',
    //             clickSent: '0',
    //             linkClicked: '0'
    //         }
    //     }
    //     ,
    //     {
    //         id: '4',
    //         status: false,
    //         title: 'Camp Title 4',
    //         progress: '0',
    //         createdAt: '2 hours ago',
    //         steps: '3',
    //         new: '0',
    //         contacted: '0',
    //         connected: '0',
    //         replied: '0',
    //         lead: '0',
    //         customer: '0',
    //         notconnected: '0',
    //         accepted: {
    //             progressValue: '50',
    //             reqSent: '0',
    //             acceptedReq: '0'
    //         },
    //         replyRate: {
    //             progressValue: '50',
    //             totalContact: '0',
    //             linkedinRep: '0',
    //             emailRep: '0'
    //         },
    //         msgClickRate: {
    //             progressValue: '50',
    //             clickSent: '0',
    //             linkClicked: '0'
    //         }
    //     },
    //     {
    //         id: '5',
    //         status: false,
    //         title: 'Camp Title 5',
    //         progress: '0',
    //         createdAt: '2 hours ago',
    //         steps: '3',
    //         new: '0',
    //         contacted: '0',
    //         connected: '0',
    //         replied: '0',
    //         lead: '0',
    //         customer: '0',
    //         notconnected: '0',
    //         accepted: {
    //             progressValue: '50',
    //             reqSent: '0',
    //             acceptedReq: '0'
    //         },
    //         replyRate: {
    //             progressValue: '50',
    //             totalContact: '0',
    //             linkedinRep: '0',
    //             emailRep: '0'
    //         },
    //         msgClickRate: {
    //             progressValue: '50',
    //             clickSent: '0',
    //             linkClicked: '0'
    //         }
    //     }
    // ];

    const {
        isFetching: campaignsFetching,
        refetch: campaignsRefetch,
        data: campaignsList,
    } = useQuery(
        ["campaigns", user],
        () =>
            getRecord(`${campaignRoute}`, user),
        { enabled: !!user.token }
    );


    const navigate = useNavigate();
    const [myCampsCurrentPage, setMyCampsCurrentPage] = useState(1);
    const [myCampsItemsPerPage] = useState(10);
    const myCampsLastItemId = myCampsCurrentPage * myCampsItemsPerPage;
    const myCampsFirstItemId = myCampsLastItemId - myCampsItemsPerPage;
    const currentMyCamps = campaigns.slice(myCampsFirstItemId, myCampsLastItemId);

    const [allCampsCurrentPage, setAllCampsCurrentPage] = useState(1);
    const [allCampsItemsPerPage] = useState(10);
    const allCampsLastItemId = allCampsCurrentPage * allCampsItemsPerPage;
    const allCampsFirstItemId = allCampsLastItemId - allCampsItemsPerPage;
    const currentAllCamps = campaigns.slice(allCampsFirstItemId, allCampsLastItemId);

    const onChangeMyCampsPage = (pageNumber) => { setMyCampsCurrentPage(pageNumber)};

    const onChangeAllCampsPage = (pageNumber) => { setAllCampsCurrentPage(pageNumber)};

    useEffect(() => {
        if (!campaignsList) return

        setCampaigns(campaignsList)

    }, [campaignsList])

  return (
    <div className='campaigns-content'>
        <div className='row g-0'>
            <div className='col-md-12'>
                <div className='content-top d-flex justify-content-between'>
                    <Searchbar />
                    <Button variant='primary' onClick={() => navigate('/campaigns/create')}>
                        Add New <AiOutlinePlus size={18} />
                    </Button>
                </div>
                <div className='content-section main-bg p-4 mt-3 custom-scrollbar'>
                    <Tabs
                        defaultActiveKey="my-camps"
                        id="campaigns-tabs"
                        className="custom-tabs pb-3"
                        >
                        <Tab eventKey="my-camps" title="My Campaigns">
                            {campaigns.map(function(item){
                                return <CampaignBox key={item.id} data={item} campaignsRefetch={campaignsRefetch} />
                            })}
                        </Tab>
                        <Tab eventKey="all-camps" title="All Campaigns">
                            {
                                campaigns.length === 0 ?
                                <div className='no-data d-flex align-items-center justify-content-center'>
                                    <p>No Campaigns</p>
                                </div> :
                                 campaigns.map(function(item){
                                    return <CampaignBox key={item.id} data={item} campaignsRefetch={campaignsRefetch} />
                                })
                            }
                        </Tab>
                    </Tabs>
                    <div className='d-flex justify-content-end'>
                        <Pagination 
                            total={campaigns.length}
                            itemsPerPage={myCampsItemsPerPage} 
                            current={myCampsCurrentPage} 
                            onChangePage={onChangeMyCampsPage} 
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
