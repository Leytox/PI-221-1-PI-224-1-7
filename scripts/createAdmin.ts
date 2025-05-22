import { createUser } from "@/actions/users";
import { Role } from "@/generated/prisma";
async function main() {
  await createUser("admin", "admin", "admin", Role.ADMIN, "123456");
}

main()
  .then(() => {
    console.log("Admin created");
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    process.exit(0);
  });
