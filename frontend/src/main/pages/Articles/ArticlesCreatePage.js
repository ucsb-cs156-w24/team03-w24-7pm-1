import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import ArticlesForm from "main/components/Articles/ArticlesForm";
import { Navigate } from 'react-router-dom'
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function ArticlesCreatePage({storybook=false}) {

  const objectToAxiosParams = (articles) => ({
    url: "/api/articles/post",
    method: "POST",
    params: {
      title: articles.title,
      url: articles.url,
      explanation: articles.explanation,
      email: articles.email,
      dateAdded: articles.dateAdded
    }
  });

  const onSuccess = (articles) => {
    toast(`New article Created - id: ${articles.id} name: ${articles.title}`);
  }

  const mutation = useBackendMutation(
    objectToAxiosParams,
     { onSuccess }, 
     // Stryker disable next-line all : hard to set up test for caching
     ["/api/articles/all"]
     );

  const { isSuccess } = mutation

  const onSubmit = async (data) => {
    mutation.mutate(data);
  }

  if (isSuccess && !storybook) {
    return <Navigate to="/articles" />
  }

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Create New Article</h1>

        <ArticlesForm submitAction={onSubmit} />

      </div>
    </BasicLayout>
  )
}