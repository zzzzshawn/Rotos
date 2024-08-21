import AnswersTab from "@/components/shared/AnswersTab";
import ProfileLink from "@/components/shared/ProfileLink";
import QuestionTab from "@/components/shared/QuestionTab";
import Stats from "@/components/shared/Stats";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserInfo } from "@/lib/actions/user.action";
import { getJoinedDate } from "@/lib/utils";
import { URLProps } from "@/types";
import { auth, SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Profile page of Dev Overflow",
};

const ProfileDetails = async ({ params, searchParams }: URLProps) => {
  const { userId: clerkId } = auth();
  const { user, totalQuestions, totalAnswers, reputation, badgeCounts } =
    await getUserInfo({
      userId: params.id,
    });
  return (
    <div className="w-full">
      <div className="text-dark100_light900 mt-1 flex w-full flex-col gap-0.5 px-12 pb-2 pt-4">
        <h1 className="text-xl ">{user.name}</h1>
        <p className="text-variant">Stats - {reputation}</p>
      </div>
      <div className="relative h-[200px]  w-full bg-dark-4/10 dark:bg-dark-3">
        <div className="absolute bottom-[-30%] left-5">
          {clerkId === params.id ? (
            <SignedIn>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    // sets height and width for user profile button
                    avatarBox: "size-32 max-sm:size-28",
                  },
                  variables: {
                    colorPrimary: "#ff7000",
                  },
                }}
              />
            </SignedIn>
          ) : (
            <Image
              src={user?.picture}
              alt="profile"
              width={140}
              height={140}
              className="rounded-full object-cover"
            />
          )}
        </div>
        <SignedIn>
          {clerkId === user.clerkId && (
            <Link
              href="/profile/edit"
              className="absolute bottom-[-28%] right-6 "
            >
              <Button className="paragraph-medium light-border-2 text-dark300_light900 min-h-[46px]  rounded-full border px-6 py-3">
                Edit profile
              </Button>
            </Link>
          )}
        </SignedIn>
      </div>
      <div className="flex flex-col-reverse items-start justify-between px-6 pt-16 sm:flex-row sm:px-10">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900">{user.name}</h2>
            <p className="paragraph-regular text-dark200_light800">
              @{user.username}
            </p>
            <div className="mt-5 flex w-full flex-col items-start justify-start gap-3">
              <ProfileLink
                imgUrl="/assets/icons/calendar.svg"
                title={getJoinedDate(user.joinedAt)}
              />
              <div className="flex w-full flex-wrap gap-5">
                {user.portfolioWebsite && (
                  <ProfileLink
                    imgUrl="/assets/icons/link.svg"
                    href={user.portfolioWebsite}
                    title="Portfolio"
                  />
                )}
                {user.location && (
                  <ProfileLink
                    imgUrl="/assets/icons/location.svg"
                    title={user.location}
                  />
                )}
              </div>
            </div>
            {user.bio && (
              <p className="paragraph-regular text-dark400_light800 mt-8">
                {user.bio}
              </p>
            )}
          </div>
        </div>
      </div>
      {/* User Stats */}
      <Stats
        reputation={reputation}
        totalQuestions={totalQuestions}
        totalAnswers={totalAnswers}
        badges={badgeCounts}
      />
      <div className="mt-10 flex gap-10 px-5 sm:px-10">
        <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList className="background-light850_dark100 light-border-2 min-h-[42px] border py-2">
            <TabsTrigger className="tab" value="top-posts">
              Top Posts
            </TabsTrigger>
            <TabsTrigger className="tab" value="answers">
              Answers
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="top-posts"
            className="mt-5 flex w-full flex-col gap-6"
          >
            <QuestionTab
              searchParams={searchParams}
              userId={user._id}
              clerkId={clerkId}
            />
          </TabsContent>
          <TabsContent
            value="answers"
            className="mt-5 flex w-full flex-col gap-6"
          >
            <AnswersTab
              searchParams={searchParams}
              userId={user._id}
              clerkId={clerkId}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
export default ProfileDetails;
