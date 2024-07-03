import Link from "next/link";

export default function EmailTemplates({ navigateToPage }) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid max-w-6xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 md:grid-cols-3 md:px-6 lg:gap-12">
        <div className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
          <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View Template</span>
          </Link>
          <img
            src="/placeholder.svg"
            alt="Email Template 1"
            width={500}
            height={300}
            className="h-64 w-full object-cover transition-all duration-300 ease-in-out group-hover:scale-105"
          />
          <div className="bg-background p-4">
            <h3 className="text-xl font-bold">Welcome Email</h3>
            <p className="text-muted-foreground">
              Onboard new users with a friendly welcome message.
            </p>
            <Button
              variant="secondary"
              size="sm"
              className="mt-4 w-full justify-center"
              onClick={() => navigateToPage("template-1")}
            >
              View Template
            </Button>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
          <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View Template</span>
          </Link>
          <img
            src="/placeholder.svg"
            alt="Email Template 2"
            width={500}
            height={300}
            className="h-64 w-full object-cover transition-all duration-300 ease-in-out group-hover:scale-105"
          />
          <div className="bg-background p-4">
            <h3 className="text-xl font-bold">Feedback Request</h3>
            <p className="text-muted-foreground">
              Gather user feedback to improve your product.
            </p>
            <Button
              variant="secondary"
              size="sm"
              className="mt-4 w-full justify-center"
              onClick={() => navigateToPage("template-2")}
            >
              View Template
            </Button>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
          <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View Template</span>
          </Link>
          <img
            src="/placeholder.svg"
            alt="Email Template 3"
            width={500}
            height={300}
            className="h-64 w-full object-cover transition-all duration-300 ease-in-out group-hover:scale-105"
          />
          <div className="bg-background p-4">
            <h3 className="text-xl font-bold">Subscription Renewal</h3>
            <p className="text-muted-foreground">
              Remind users to renew their subscription.
            </p>
            <Button
              variant="secondary"
              size="sm"
              className="mt-4 w-full justify-center"
              onClick={() => navigateToPage("template-3")}
            >
              View Template
            </Button>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
          <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View Template</span>
          </Link>
          <img
            src="/placeholder.svg"
            alt="Email Template 4"
            width={500}
            height={300}
            className="h-64 w-full object-cover transition-all duration-300 ease-in-out group-hover:scale-105"
          />
          <div className="bg-background p-4">
            <h3 className="text-xl font-bold">New Feature Announcement</h3>
            <p className="text-muted-foreground">
              Inform users about the latest product updates.
            </p>
            <Button
              variant="secondary"
              size="sm"
              className="mt-4 w-full justify-center"
              onClick={() => navigateToPage("template-4")}
            >
              View Template
            </Button>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
          <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View Template</span>
          </Link>
          <img
            src="/placeholder.svg"
            alt="Email Template 5"
            width={500}
            height={300}
            className="h-64 w-full object-cover transition-all duration-300 ease-in-out group-hover:scale-105"
          />
          <div className="bg-background p-4">
            <h3 className="text-xl font-bold">Abandoned Cart Reminder</h3>
            <p className="text-muted-foreground">
              Encourage users to complete their purchases.
            </p>
            <Button
              variant="secondary"
              size="sm"
              className="mt-4 w-full justify-center"
              onClick={() => navigateToPage("template-5")}
            >
              View Template
            </Button>
          </div>
        </div>
        <div className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
          <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
            <span className="sr-only">View Template</span>
          </Link>
          <img
            src="/placeholder.svg"
            alt="Email Template 6"
            width={500}
            height={300}
            className="h-64 w-full object-cover transition-all duration-300 ease-in-out group-hover:scale-105"
          />
          <div className="bg-background p-4">
            <h3 className="text-xl font-bold">Referral Program</h3>
            <p className="text-muted-foreground">
              Encourage users to refer their friends.
            </p>
            <Button
              variant="secondary"
              size="sm"
              className="mt-4 w-full justify-center"
              onClick={() => navigateToPage("template-6")}
            >
              View Template
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
