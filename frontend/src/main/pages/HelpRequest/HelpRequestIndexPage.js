import React from 'react'
import { useBackend } from 'main/utils/useBackend';

//import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
//import HelpRequestTable from 'main/components/HelpRequest/HelpRequestTable';
//import { Button } from 'react-bootstrap';
//import { useCurrentUser , hasRole} from 'main/utils/currentUser';
/*
export default function HelpRequestIndexPage() {

  const currentUser = useCurrentUser();

  const createButton = () => {
    if (hasRole(currentUser, "ROLE_ADMIN")) {
        return (
            <Button
                variant="primary"
                href="/helprequest/create"
                style={{ float: "right" }}
            >
                Create Help Requests
            </Button>
        )
    } 
  }
  
  const { data: helpRequests, error: _error, status: _status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      ["/api/helprequest/all"],
      { method: "GET", url: "/api/helprequest/all" },
      []
    );

  return (
    <BasicLayout>
      <div className="pt-2">
        {createButton()}
        <h1>Help Requests</h1>
        <HelpRequestTable helpRequests={helpRequests} currentUser={currentUser} />
      </div>
    </BasicLayout>
  )
}*/