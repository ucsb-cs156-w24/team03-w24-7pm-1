

import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { hasRole, useCurrentUser } from 'main/utils/currentUser';
import { Button } from 'react-bootstrap';

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
                Create HelpRequest 
            </Button>
        )
    } 
  }
  

  return (
    <BasicLayout>
      <div className="pt-2">
        {createButton()}
        <h1>HelpRequest</h1>
      </div>
    </BasicLayout>
  )
}