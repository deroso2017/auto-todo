import { GroupedUsers } from "@/types/groupedUsers";
import { AccumulatorGroup } from "@/types/accumulatorGroup";
import { User } from "@/types/user";

export function groupByDepartment(users: User[]): GroupedUsers {
  const map: Record<string, AccumulatorGroup> = {};

  for (const user of users) {
    const dept = user.company?.department ?? "Unknown";

    if (!map[dept]) {
      map[dept] = {
        male: 0,
        female: 0,
        minAge: Infinity,
        maxAge: -Infinity,
        hair: {},
        addressUser: {},
      };
    }

    const group = map[dept];

    if (user.gender === "male") group.male++;
    else group.female++;

    group.minAge = Math.min(group.minAge, user.age);
    group.maxAge = Math.max(group.maxAge, user.age);

    const color = user.hair?.color ?? "Unknown";
    group.hair[color] = (group.hair[color] || 0) + 1;

    const key = `${user.firstName}${user.lastName}`;
    group.addressUser[key] = user.address?.postalCode ?? "Unknown";
  }

  const result: GroupedUsers = {};

  for (const dept in map) {
    const g = map[dept];

    result[dept] = {
      male: g.male,
      female: g.female,
      ageRange: `${g.minAge}-${g.maxAge}`,
      hair: g.hair,
      addressUser: g.addressUser,
    };
  }

  return result;
}
