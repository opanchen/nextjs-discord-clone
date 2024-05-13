import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";

import { InitialModal } from "@/components/modals/initial-modal";

type Profile = {
  id: string;
  userId: string;
  name: string;
  imageUrl: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

const SetupPage = async () => {
  const profile = (await initialProfile()) as Profile; // ! "as Profile" part can be temporary because of some issues

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`servers/${server.id}`);
  }

  return <InitialModal />;
};

export default SetupPage;
