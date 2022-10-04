import React from 'react';
import CampaignsContent from '../Components/Campaigns/CampaignsContent';
import LoginLayout from '../Layouts/LoginLayout';

export default function Campaigns() {
  return (
    <LoginLayout title='Campaigns'>
        <CampaignsContent />
    </LoginLayout>
  )
}
