import { confirmNewsletterSubscription } from "@/lib/api/services/newsletter";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{ token?: string }>;
}

export default async function NewsletterConfirmationPage({
  searchParams,
}: Props) {
  const { token } = await searchParams;

  if (!token) {
    redirect("/");
  }

  const response = await confirmNewsletterSubscription(token);

  if (!response.success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Subscription Error
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
            Subscription Confirmed!
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Thank you for subscribing to our newsletter. You will now receive
            updates about our latest news and events.
          </p>
        </div>
      </div>
    </div>
  );
}
