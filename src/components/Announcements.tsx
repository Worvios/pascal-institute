import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const Announcements = async () => {
  // Get authentication data
  const { userId, sessionClaims } = await auth();

  // Safely extract the role from sessionClaims
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  // Define role-based conditions for filtering announcements
  const roleConditions = {
    teacher: { lessons: { some: { teacherId: userId! } } },
    student: { students: { some: { id: userId! } } },
    parent: { students: { some: { parentId: userId! } } },
  };

  // Fetch announcements based on the user's role
  const data = await prisma.announcement.findMany({
    take: 3,
    orderBy: { date: "desc" },
    where: {
      ...(role !== "admin" && {
        OR: [
          { classId: null }, // Announcements without a specific class
          { class: roleConditions[role as keyof typeof roleConditions] || {} }, // Role-specific announcements
        ],
      }),
    },
  });

  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <span className="text-xs text-gray-400">View All</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {data.map((announcement, index) => (
          <div
            key={index}
            className={`rounded-md p-4 ${
              index === 0
                ? "bg-lamaSkyLight"
                : index === 1
                ? "bg-lamaPurpleLight"
                : "bg-lamaYellowLight"
            }`}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-medium">{announcement.title}</h2>
              <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                {new Intl.DateTimeFormat("en-GB").format(announcement.date)}
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              {announcement.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
