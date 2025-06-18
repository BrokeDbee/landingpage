import { unsubscribeFromNewsletter } from "@/lib/api/services/newsletter";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{ email?: string }>;
}

export default async function NewsletterUnsubscribePage({
  searchParams,
}: Props) {
  const { email } = await searchParams;

  if (!email) {
    redirect("/");
  }

  const response = await unsubscribeFromNewsletter(email);

  if (!response.success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Unsubscription Error
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {response.error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Unsubscription Successful
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            You have successfully unsubscribed from our newsletter.
          </p>
        </div>
      </div>
    </div>
  );
}
